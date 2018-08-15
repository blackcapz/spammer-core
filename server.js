const http = require('http')
const { send, json } = require('micro')
const {
  router,
  get,
  post
} = require('microrouter')
const puppeteer = require('puppeteer')
const Spammer = require('./lib/spammer')
const FacebookStrategy = require('./strategies/Facebook')

const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }

const spam = async (req, res) => {
  const {
    strategy = 'Facebook',
    groups = [],
    text,
    user,
    pass
  } = await json(req)
  const spammer = new Spammer({
    strategy,
    groups,
    text,
    user,
    pass
  })
  spammer.apply(FacebookStrategy)
  
  await spammer.run(await puppeteer.launch(launchOptions))
  send(res, 200, { status: 200, body: 'All messages have been posted' })
}

const root = (req, res) => send(res, 200, { status: 'ok' })
const notfound = (req, res) => send(res, 404, 'Not found route')

const Routes = router(
  post('/spam', spam),
  get('/', root),
  get('/*', notfound)
)

http.
  createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')

    Routes(req, res)
  })
  .listen(5000)
console.log('* Server running..')