const puppeteer = require('puppeteer')
const Spammer = require('./lib/spammer')
const FacebookStrategy = require('./strategies/Facebook')

function main (context) {
  const { body: {
    user = '',
    pass = '',
    strategy = 'Facebook',
    text = '',
    ids = []
  } } = context
  const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  const spammer = new Spammer({ user, pass, strategy, text })
  spammer
    .apply(FacebookStrategy, { context, ids })
    .run(await puppeteer.launch(launchOptions))
}

/**
 * To test locally
 * console is the context
 */
// main(console)
