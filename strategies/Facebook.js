const {
  wait,
  allSettled
} = require('../utils/helpers')
const Plugin = require('../lib/plugins')

module.exports = class Facebook {
  static get name () {
    return 'Facebook'
  }

  constructor ({ user, pass, ids, context }) {
    this.user = user
    this.pass = pass
    this.ids = ids
    this.postDelayTime = 1000
    this.queues = []
    this.URL = 'https://m.facebook.com'
    this.context = context
    Object.assign(this, new Plugin())
  }

  async login (browser) {
    const page = await browser.newPage()
    await page.goto(this.URL)
    await page.type('#m_login_email', this.user)
    await page.type('#m_login_password', this.pass)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    this.Logger(`Logged in as ${this.user}`)
    return this
  }

  post (browser, text) {
    if (!this.ids.length) return new Error('You need to pass an Array with feed Ids')
    const MAX_QUEUE_SLICE = 4
    let queue = []
    this.ids.map((id, index) => {
      const handler = new Promise(async (resolve, reject) => {
        try {
          const page = await browser.newPage()
          await page.goto(`${this.URL}/groups/${id}`)
          await page.click('button.touchable')
          await page.type('textarea', text)
          await page.click('button[value="Publicar"]:not(.touchable)')
          this.Logger(this.context, `Message posted in id "${await page.title()}" (${id})`) 
          resolve()
        } catch (postError) {
          reject(postError)
        }
      })
      queue.push(handler)

      if (queue.length === MAX_QUEUE_SLICE || index === (this.ids.length - 1)) {
        this.queues.push(queue)
        queue = []
      }
    })
    this.run()
    browser.close()
  }

  run () {
    this.queues.forEach(queue => wait(this.postDelayTime, allSettled(queue)))
  }
}