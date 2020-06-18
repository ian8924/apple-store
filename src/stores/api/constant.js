export const API_URL = process.env.VUE_APP_API_URL
export const API_RECAPTCHA = process.env.VUE_APP_RECAPTCHA
export const API_CAPTCHA = process.env.VUE_APP_CAPTCHA

export const PRODUCT_DETAIL = '/canlead/product/detail'
export const ENGRAVING = 'https://www.apple.com/tw/shop/preview/engrave'
export const USER_RECAPTCHA = '/v1/recaptcha/recaptcha'
export const USER_CAPTCHA = '/v1/captcha/'
export const USER_CAPTCHA_IMG = '/v1/captcha/show/' // + ".png"
export const USER_CAPTCHA_CONFIRM = '/v1/captcha/validate'
export const MOBILE_VERIFY = '/canlead/user/validate'
export const USER_SIGNUP = '/canlead/user/sign_up'
export const USER_SIGNIN = '/canlead/user/sign_in'
export const USER_INFO = '/canlead/user/info'
export const USER_RESET_PWD = '/canlead/user/change_password'
export const USER_FORGET_PWD = '/canlead/user/froget_password'
export const USER_FORGET_PWD_SMS = '/canlead/user/froget_password'
export const USER_EDIT_INFO = '/canlead/user/update_userInfo'
export const USER_CHECK_SIGN_IN = '/canlead/user/check_token'
export const USER_SIGN_OUT = '/canlead/user/clear_token'
export const USER_UUID = '/canlead/user/get_uuid_by_cookie'
export const BIND_MAGIC_CARD = '/v1/card/bind_card'
export const MAGIC_CARD_LIST = '/v1/card/get_card_info'
export const QUERY_BONUS = '/v1/card/get_card_bounus'
export const REMOVE_CARD = '/v1/card/remove_card'

export const CREATE_ORDER = '/canlead/order/create_order'
export const CHECKOUT_ORDER = '/canlead/order/checkout_order'
export const HISTORY_ORDER = '/canlead/order/history_order'

export const VISA_VCES_IFRAME = '/v1/card/overseas_iframe_token'
export const VISA_VCES_STATUS = '/v1/card/overseas_validation_status'
