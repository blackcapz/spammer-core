module.exports = class Facebook {
  static get name () {
    return 'Facebook'
  }

  constructor ({ user, pass }) {
    this.user = user
    this.pass = pass
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

  async post (browser, group, text) {
    const page = await browser.newPage()
    await page.goto(`${this.URL}/groups/${group}`)
    await page.click('button.touchable')
    await page.type('textarea', text)
    await page.click('button[value="Publicar"]:not(.touchable)')
    console.log(`Message posted in group "${await page.title()}" (${group})`)
  }
}