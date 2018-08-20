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
    ids = [],
    text = '',
    user = '',
    pass = ''
  } = await json(req)
  console.log('* Request received to', user)
  const spammer = new Spammer({
    strategy,
    text,
    user,
    pass
  })
  spammer
    .apply(FacebookStrategy, { ...console, ids })
    .run(await puppeteer.launch(launchOptions))
  send(res, 200, { status: 200, body: 'All messages have been received and are being processed :)' })
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }
    Routes(req, res)
  })
  .listen(5000)
console.log('* Server running..')