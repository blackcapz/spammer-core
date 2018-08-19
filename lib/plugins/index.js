const logger = require('./logger')
const slack = require('./slack')

module.exports = class Plugin {
  constructor () {
    this.Slack = slack.bind(this)
    this.Logger = logger.bind(this)
  }
}