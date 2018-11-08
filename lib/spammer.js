const { createQueue } = require('../utils/RSMQClient')
const AbstractInterface = require('./AbstractInterface')

module.exports = class Spammer extends AbstractInterface {
  constructor () {
    super()
    this.browser = null
    createQueue()
  }

  async apply (Strategy, strategyOptions) {
    this.strategy = Strategy.name
    this[this.strategy] = new Strategy({
      user: this.user,
      pass: this.pass,
      ...strategyOptions
    })
    return this
  }

  async run (data) {
    await this._initBrowserAndLogin()
    this._post(this.browser, data)
    return this
  }
}