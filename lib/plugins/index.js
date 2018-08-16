const Slack = require('./slack')

module.exports = class Plugin {
  constructor () {
    this.Slack = new Slack()
  }
}