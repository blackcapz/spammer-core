const puppeteer = require('puppeteer')
const Spammer = require('./lib/spammer')
const FacebookStrategy = require('./strategies/Facebook')

async function main (context) {
  const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  const spammer = new Spammer({
    strategy: 'Facebook',
    groups: [
      '1353655578103416',
      '231049354264315'
    ],
    text: 'Hello World with strategy man'
  })
  spammer.apply(FacebookStrategy)
  spammer.run(await puppeteer.launch(launchOptions))
}
