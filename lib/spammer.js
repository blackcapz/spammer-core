const AbstractInterface = require('./AbstractInterface')

module.exports = class Spammer extends AbstractInterface {
  constructor () {
    super()
    this.user = process.env.SPAMMER_USER
    this.pass = process.env.SPAMMER_PASS
    this.strategy = null
    this.text = null
    this.browser = null
  }

  apply (Strategy, strategyOptions) {
    this[Strategy.name] = new Strategy({
      user: this.user,
      pass: this.pass,
      ...strategyOptions
    })
    return this
  }

  run (ids) { 
    this._post(this.browser, this.text, ids)
    return this
  }
}