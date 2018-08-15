module.exports = class AbstractInterface {
  async _login (browser) {
    if (!this[this.strategy].login) throw new Error('Not yet implemented')
    await this[this.strategy].login(browser)
    }
  
  async _post (browser) {
    if (!this[this.strategy].post) throw new Error('Not yet implemented')
    await this[this.strategy].post(browser)
  }
}