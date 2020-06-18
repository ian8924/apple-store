export function checkLength (inputStr, chLimit, enLimit) {
  const regTW = /[\u4E00-\u9FA5]/g
  const regEn = /[a-zA-Z]/g
  // const regSpecial = /[`!@#$%^&()-=_+{}|\[\]:;'?,.\/]/g

  const chLength = inputStr.match(regTW) ? inputStr.match(regTW).length : 0
  const enLength = inputStr.match(regEn) ? inputStr.match(regEn).length : 0
  // const specialLenght = inputStr.match(regSpecial)
  //   ? inputStr.match(regSpecial).length
  //   : 0;
  if (chLength > chLimit || enLength > enLimit) {
    return false
  }
  return true
  // return `en: ${enLength}, ch: ${chLength}, specialLenght: ${specialLenght}`;
}
export function mixedENTW (inputStr) {
  // const regTW = /^[\u4E00-\u9FA5!@#$%^&()\-=_+{}|\[\]:;'?,./]+$/;
  // const regEn = /^[0-9a-zA-Z!@#$%^&()\-=_+{}|\[\]:;'?,./]+$/;
  // const punctuationzhTW = /\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u3009/
  const regTW = /[\u4E00-\u9FA5\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u3009]+/
  const regEn = /[a-zA-Z]+/
  const haszhTW = regTW.test(inputStr)
  const hasEn = regEn.test(inputStr)
  if (haszhTW && hasEn) {
    return false
  }
  return true
}
export function hasSpecialChar (inputStr) {
  const regSpecialChar = /[~\\*"<>]+/
  const hasSpecialChar = regSpecialChar.test(inputStr)
  const regTW = /^[\u4E00-\u9FA5\u3002\uFF1F\uFF01\uFF0C\u3001\uFF1B\uFF1A\u300C\u300D\u300E\u300F\u2018\u2019\u201C\u201D\uFF08\uFF09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uFF0E\u300A\u300B\u3008\u30090-9!@#$%^&()\-=_+{}|[\]:;'?,./\s]+$/
  const regEn = /^[0-9a-zA-Z!@#$%^&()\-=_+{}|[\]:;'?,./\s]+$/
  const onlyTW = regTW.test(inputStr)

  const onlyEn = regEn.test(inputStr)
  console.log('TCL: hasSpecialChar -> onlyTW, onlyEn', onlyTW, onlyEn)
  if (hasSpecialChar) {
    return false
  }
  if (!onlyTW && !onlyEn) {
    return false
  }
  return true
}
export function hasEmoji (inputStr) {
  const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
  ]
  if (inputStr.match(ranges.join('|'))) {
    return false
  }
  return true
}
