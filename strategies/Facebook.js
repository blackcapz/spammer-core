const {
  wait,
  allSettled
} = require('../utils/helpers')
const Plugin = require('../lib/plugins')

module.exports = class Facebook {
  static get name () {
    return 'Facebook'
  }

  constructor ({ user, pass, ids }) {
    this.user = user
    this.pass = pass
    this.ids = ids
    this.delayTime = 0
    this.URL = 'https://m.facebook.com'
    Object.assign(this, new Plugin())
  }

  setIds (ids) {
    this.ids = (ids && Array.isArray(ids)) ? ids : [ids]
  }

  getSpecificUrl (type, id) {
    const TYPES = {
      group: `${this.URL}/groups/${id}`,
      pageOrFeed: `${this.URL}/${id}`
    }

   return TYPES[type]
      ? TYPES[type]
      : new Error('Type not provided')
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

  post (browser, type, text, ids) {
    this.setIds(ids)

    if (!this.ids.length) return new Error('You need to pass an Array with feed Ids')
    const MAX_QUEUE_SLICE = 4
    let queue = []
    this.ids.map((id, index) => {
      const handler = () => new Promise(async (resolve, reject) => {
        try {
          const page = await browser.newPage()
          await page.goto(this.getSpecificUrl(type, id))
          await page.click('button.touchable')
          await page.type('textarea', text)
          await page.click('button[value="Publicar"]:not(.touchable)')
          this.Slack(
            `Message posted "${await page.title()}" (${id}) - ${new Date()} by ${this.user}`
          )
          this.Logger(
            `Message posted "${await page.title()}" (${id}) - ${new Date()} by ${this.user}`
          )
          resolve()
        } catch (postError) {
          reject(postError)
        }
      })
      queue.push(handler)

      if (queue.length === MAX_QUEUE_SLICE) {
        this.run(queue)
        this.delayTime += 60000
        queue = []
      }
      
      if (index === (this.ids.length - 1)) {
        this.run(queue)
        this.delayTime = 0
        queue = []
      }
    })
  }

  run (queue) {
    wait(this.delayTime, () => allSettled(queue))
  }
}