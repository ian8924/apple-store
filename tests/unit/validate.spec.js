import { checkLength, mixedENTW, hasSpecialChar, hasEmoji } from '../../src/until/validate/function'

describe('checkLength', () => {
  const chLimit = 12
  const enLimit = 20
  it('english is too more', () => {
    const inputStr = 'wdqwdwqwdqdqwqdqwdqwdwqdqwdqw'
    expect(checkLength(inputStr, chLimit, enLimit)).toBe(false)
  })
  it('chinese is too more', () => {
    const inputStr = '測試測試測試測試測試測試測試'
    expect(checkLength(inputStr, chLimit, enLimit)).toBe(false)
  })
  it('english is normal', () => {
    const inputStr = 'wdqwdwqwdqdq'
    expect(checkLength(inputStr, chLimit, enLimit)).toBe(true)
  })
  it('chinese is normal', () => {
    const inputStr = '試測試測試測試'
    expect(checkLength(inputStr, chLimit, enLimit)).toBe(true)
  })
})

describe('mixedENTW', () => {
  it('中英混', () => {
    const inputStr = '試測試測試測試eded'
    expect(mixedENTW(inputStr)).toBe(false)
  })
  it('單英', () => {
    const inputStr = 'eded'
    expect(mixedENTW(inputStr)).toBe(true)
  })
  it('單中', () => {
    const inputStr = '試測試測試測試'
    expect(mixedENTW(inputStr)).toBe(true)
  })
})

describe('hasSpecialChar', () => {
  it('有特殊字元', () => {
    const inputStr = 'de[][][@!~de'
    expect(hasSpecialChar(inputStr)).toBe(false)
  })
  it('正常', () => {
    const inputStr = 'de'
    expect(hasSpecialChar(inputStr)).toBe(true)
  })
})

describe('hasEmoji', () => {
  it('有表情符號', () => {
    const inputStr = '💰💰'
    expect(hasEmoji(inputStr)).toBe(false)
  })
  it('正常', () => {
    const inputStr = 'de'
    expect(hasEmoji(inputStr)).toBe(true)
  })
})
