import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { checkLength, mixedENTW, hasSpecialChar, hasEmoji } from './function'
// No message specified.
extend('email', { ...email, message: '信箱格式有誤' })
// Override the default message.
extend('required', {
  ...required,
  message: '必填'
})
extend('min', (value, num) => {
  if (value.length >= num[0]) { return true }
  return `字數不能少於${num[0]}`
})

extend('max', (value, num) => {
  if (value.length <= num[0]) { return true }
  return `字數不能大於${num[0]}`
})

extend('mobile', {
  validate: (value) => {
    return /09[0-9]{8}/.test(value)
  },
  message: '電話號碼格式錯誤'
})

extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: '密碼不一致'
})

extend('credit', {
  validate: (value) => {
    return /(\d{4}) (\d{4}) (\d{4}) (\d{4})/.test(value)
  },
  message: '卡號錯誤'
})

extend('mixedENTW', {
  validate: (value) => {
    return mixedENTW(value)
  },
  message: '中英文不能混雜。'
})

extend('hasEmoji', {
  validate: (value) => {
    return hasEmoji(value)
  },
  message: '不能使用表情符號。'
})

extend('hasSpecialChar', {
  validate: (value) => {
    return hasSpecialChar(value)
  },
  message: '無法鐫刻特殊字元。'
})

extend('checkLength', (value, charLimit) => {
  const chLimit = charLimit[0]
  const enLimit = charLimit[1]
  if (checkLength(value, chLimit, enLimit)) {
    return true
  }
  return `您的訊息過長，請將字數控制在中文${chLimit}字元，英文${enLimit}字元內`
})
