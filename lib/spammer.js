const AbstractInterface = require('./AbstractInterface')

module.exports = class Spammer extends AbstractInterface {
  constructor ({ text, strategy, user, pass }) {
    super()
    this.user = user || process.env.SPAMMER_USER
    this.pass = pass || process.env.SPAMMER_PASS
    this.strategy = strategy
    this.text = text
  }

  apply (Strategy, strategyOptions) {
    this[Strategy.name] = new Strategy({
      user: this.user,
      pass: this.pass,
      ...strategyOptions
    })
    return this
  }

  async run (browser) {
    await this._login(browser)
    this[this.strategy].post(browser, this.text)
    return this
  }
}