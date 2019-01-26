const puppeteer = require('puppeteer')

const launchOptions = {
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, 
  args: ['--no-sandbox', '--disable-setuid-sandbox'] 
}

module.exports = class AbstractInterface {

  async _initBrowserAndLogin () {
    this.browser = await puppeteer.launch(launchOptions)
    await this._login(this.browser)
  }

  async _login () {
    try {
      if (!this[this.strategy].login) throw new Error('Not yet implemented')
      await this[this.strategy].login(...arguments) 
    } catch (error) {
      console.log('* Error', error)
    }
  }
  
  async _post () {
    try {
      if (!this[this.strategy].post) throw new Error('Not yet implemented')
      await this[this.strategy].post(...arguments)
    } catch (error) {
      console.log('* Error', error)
    }
  }
}