const puppeteer = require('puppeteer')
const makePageEvaluations = require('./evaluations')

const launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
const facebookURL = 'https://m.facebook.com'

async function main(context) {
  const { groups, message } = context.body
  const { user, pass } = process.env
  const browser = await puppeteer.launch(launchOptions)
  const loginPage = await browser.newPage()
  const { loginAtWith } = makePageEvaluations(loginPage)

  await loginAtWith(facebookURL, { user, pass })
  context.log(`Logged in as ${user}`)

  const promises = groups.map(async (group) => {
    const groupPage = await browser.newPage()
    const { postInGroupAt } = makePageEvaluations(groupPage)
    const postedGroup = await postInGroupAt(facebookURL, group, message)

    context.log(`Message posted in group "${postedGroup}" (${group})`)
  })

  await Promise.all(promises)
  await browser.close()

  context.res = { status: 200, body: 'All messages have been posted' }
}

module.exports = main