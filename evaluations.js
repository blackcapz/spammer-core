module.exports = page => ({
  async loginAtWith(url, { FB_USER, FB_PASS }) {
    await page.goto(url)
    await page.type('#m_login_email', FB_USER)
    await page.type('#m_login_password', FB_PASS)
    await page.keyboard.press('Enter')

    return page.waitForNavigation()
  },

  async postInGroupAt(url, group, message) {
    await page.goto(`${url}/groups/${group}`)
    await page.click('button.touchable')
    await page.type('textarea', message)
    await page.click('button[value="Publicar"]:not(.touchable)')

    return page.title()
  }
})

