const AbstractInterface = require('./AbstractInterface')

module.exports = class Spammer extends AbstractInterface {
  constructor ({ groups, text, strategy, user, pass }) {
    super()
    this.user = user || process.env.SPAMMER_USER
    this.pass = pass || process.env.SPAMMER_PASS
    this.strategy = strategy
    this.groups = groups
    this.text = text
  }

  apply (Strategy) {
    this[Strategy.name] = new Strategy({
      user: this.user,
      pass: this.pass
    })
    return this
  }

  async run (browser) {
    if (!this.groups.length) return new Error('You need to pass an Array with group Ids')
    await this._login(browser)

    console.log(`Logged in as ${this.user}`)

    const promises = this.groups.map(async group =>
      await this[this.strategy].post(browser, group, this.text)
    )

    await Promise.all(promises)
    await browser.close()
    return this
  }
}