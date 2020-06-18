// https://docs.cypress.io/api/introduction/api.html
const mode = 'development'
const modeURL = mode === 'development' ? 'https://appletest.bestgifts.tw/tw' : 'https://www.bestgifts.tw/tw'

describe('下單流程測試', () => {
  it('登入測試', () => {
    // 到首頁
    cy.visit(`${modeURL}`)
    // 到登入頁
    cy.visit(`${modeURL}/signin`)
    // 填入帳號密碼
    cy.get('#phone').type('0961117647')
    cy.get('#Password').type('12345678')
    // 填入驗證碼
    cy.get('input[name=captcha]').type('1111')
    // 登入按鈕
    cy.get('div.col-6.text-right > div > button').click()
  })
})
