module.exports = class AbstractInterface {
  async _login (browser) {
    try {
      if (!this[this.strategy].login) throw new Error('Not yet implemented')
      await this[this.strategy].login(browser) 
    } catch (error) {
      this.Logger(this.context, error)
    }
  }
  
  async _post (browser) {
    try {
      if (!this[this.strategy].post) throw new Error('Not yet implemented')
      await this[this.strategy].post(browser)
    } catch (error) {
      this.Logger(this.context, error)
    }
  }
}