import AES from 'crypto-js/aes'
// import Pkcs7 from 'crypto-js/pad-pkcs7'
// import encBase64 from 'crypto-js/enc-base64'
import encUTF8 from 'crypto-js/enc-utf8'

const AES_KEY = encUTF8.parse('qfotFtqhpuiSoJZywYQTvfzsNEtkIlPP')
const AES_IV = encUTF8.parse('kllzycSYZtGtHwEX')

export function encodeBase64 (word) {
  // const encryPwd = AES.encrypt(word, AES_KEY, { iv: AES_IV, padding: Pkcs7 }).ciphertext.toString(encBase64)
  const encodePwd = btoa(word)
  return encodePwd
}

export function decryptBase64 (word) {
  const decrypted = AES.decrypt(word, AES_KEY, { iv: AES_IV })
  return decrypted
}
