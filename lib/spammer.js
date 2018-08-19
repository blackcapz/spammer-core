const Plugin = require('./plugins')
const AbstractInterface = require('./AbstractInterface')

module.exports = class Spammer extends AbstractInterface {
  constructor ({ text, strategy, user, pass }) {
    super()
    this.user = user || process.env.SPAMMER_USER
    this.pass = pass || process.env.SPAMMER_PASS
    this.strategy = strategy
    this.text = text
    this.context = console
    Object.assign(this, new Plugin())
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

    this.context.log(`Logged in as ${this.user}`)
    this[this.strategy].post(browser, this.ids, this.text)

    return this
  }
}