const Logger = require('./Logger')
const Slack = require('./Slack')

module.exports = class Plugin {
  constructor () {
    this.Slack = new Slack()
    this.Logger = new Logger()
  }
}