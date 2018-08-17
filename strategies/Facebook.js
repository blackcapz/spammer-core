const {
  wait,
  allSettled
} = require('../utils/helpers')

module.exports = class Facebook {
  static get name () {
    return 'Facebook'
  }

  constructor ({ user, pass, ids }) {
    this.user = user
    this.pass = pass
    this.ids = ids
    this.postDelayTime = 1000
    this.queues = []
    this.URL = 'https://m.facebook.com'
  }

  async login (browser) {
    const page = await browser.newPage()
    await page.goto(this.URL)
    await page.type('#m_login_email', this.user)
    await page.type('#m_login_password', this.pass)
    await page.keyboard.press('Enter')

    return page.waitForNavigation()
  }

  async post (browser, ids, text) {
    const MAX_QUEUE_SLICE = 4
    let queue = []
    ids.forEach(id => {
      if (queue.length === MAX_QUEUE_SLICE) {
        this.queues.push(queue)
        queue = []
        return
      }
      const handler = () => {
        const page = await browser.newPage()
        await page.goto(`${this.URL}/groups/${id}`)
        await page.click('button.touchable')
        await page.type('textarea', text)
        await page.click('button[value="Publicar"]:not(.touchable)')
        this.Logger(this.context, `Message posted in id "${await page.title()}" (${id})`)
      }
      queue.push(handler)
    })
    this.run()
    browser.close()
  }

  run () {
    this.queues.forEach(queue => wait(1000, allSettled(queue)))
  }
}