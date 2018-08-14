module.exports = class Spammer {
  constructor ({ groups, text, strategy }) {
    this.user = process.env.SPAMMER_USER
    this.pass = process.env.SPAMMER_PASS
    this.strategy = strategy
    this.groups = groups
    this.text = text
  }

  apply (Strategy) {
    this[Strategy.name] = new Strategy({
      user: this.user,
      pass: this.pass
    })
  }

  async _login (browser) {
    if (!this[this.strategy].login) throw new Error('Not implemented yet')
    await this[this.strategy].login(browser)
  }

  async _post (browser) {
    if (!this[this.strategy].post) throw new Error('Not implemented yet')
    await this[this.strategy].post(browser)
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
  }
}