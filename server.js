const http = require('http')
const { readdir } = require('fs')
const { promisify } = require('util')
const { send, json } = require('micro')
const {
  router,
  get,
  post
} = require('microrouter')

const readdirPromise = promisify(readdir)
const Spammer = require('./lib/Spammer')
const spammer = new Spammer()

const spam = async (req, res) => {
  const { strategy = 'Facebook', user, pass, data } = await json(req)
  const strategies = await readdirPromise('./strategies/')

  if (!strategies.includes(strategy)) {
    return send(res, 400, { status: 400, body: `${strategy} strategy not found :(` })
  }

  console.log('* Request received to', user)

  await spammer.apply(require(`./strategies/${strategy}/index`), { user, pass })
  spammer.run(data)
  send(res, 200, { status: 200, body: 'All messages have been received and are being processed :)' })
}

const root = (req, res) => send(res, 200, { status: 200, body: 'ok' })
const notfound = (req, res) => send(res, 404, 'Not found route')

const Routes = router(
  post('/spam', spam),
  get('/', root),
  get('/*', notfound)
)

http
  .createServer((req, res) => {
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
  .listen(process.env.PORT || 3000)
console.log('* Server running..')
