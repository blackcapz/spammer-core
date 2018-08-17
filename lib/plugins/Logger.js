module.exports = class Logger {
  constructor (context) {
    this.context = context
  }
  handler (message) {
    this.context.log(message)
  }
}