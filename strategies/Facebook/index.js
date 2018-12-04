const {
  Q_NAME,
  rsmq
} = require('../../utils/RSMQClient')
const every = require('every-moment')

module.exports = class Facebook {
  static get name () {
    return 'Facebook'
  }

  constructor ({ user, pass }) {
    this.user = user
    this.pass = pass
    this.data = []
    this.URL = 'https://m.facebook.com'
    this.interval = null
  }

  async listenMessages () {
    console.log('Listen messages on queue..')
    this.interval = every(30, 'seconds', this.run.bind(this))
  }

  async login (browser) {
    const page = await browser.newPage()
    await page.goto(this.URL)
    await page.type('#m_login_email', this.user)
    await page.type('#m_login_password', this.pass)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    return this
  }

  async post (browser, data) {
    this.browser = browser
    this.data = data

    data.forEach(item => 
      rsmq.sendMessage({ qname: Q_NAME, message: item.id })  
    )
    this.listenMessages()
  }

  async run () {
    const { message, id: queueId } = await rsmq.receiveMessage({ qname: Q_NAME })
    const item = this.data.find(i => i.id === message)
    
    if (!item) {
      this.interval.stop()
      return
    }

    const page = await this.browser.newPage()
    const POST_TYPES = {
      FEED: async () => {
        await page.goto(`${this.URL}/${item.id}`)
        await page.click('div._4g34._6ber._5i2i._52we')
        await page.type('textarea', item.text)
        await page.click('button[value="Publicar"]:not(.touchable)')
      },
      GROUP: async () => {
        await page.goto(`${this.URL}/groups/${item.id}`)
        await page.click('button.touchable')
        await page.type('textarea', item.text)
        await page.click('button[value="Publicar"]:not(.touchable)')
      }
    }

    await POST_TYPES[item.type]()
    console.log(`${item.id} - message posted!`)
    await rsmq.deleteMessage({ qname: Q_NAME, id: queueId })
    console.log(`${item.id} - message delete from queue`)
  }

}