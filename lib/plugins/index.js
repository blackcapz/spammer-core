const logger = require('./logger')
const slack = require('./slack')

module.exports = class Plugin {
  constructor (context) {
    this.Slack = slack.bind(this, context)
    this.Logger = logger.bind(this, context)
  }
}