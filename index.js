const puppeteer = require('puppeteer')
const Spammer = require('./lib/spammer')
const FacebookStrategy = require('./strategies/Facebook')

async function main (context) {
  const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  const spammer = new Spammer({
    user: '',
    pass: '',
    strategy: 'Facebook',
    text: 'Delay time working with diferent text ' + new Date().getTime()
  })
  spammer
    .apply(FacebookStrategy, {
      context,
      ids: [
        '1353655578103416',
        '231049354264315',
        '231049354264315',
        '231049354264315',
        '1353655578103416',
        '231049354264315',
        '1353655578103416'
      ]
    })
    .run(await puppeteer.launch(launchOptions))
}

main(console)
