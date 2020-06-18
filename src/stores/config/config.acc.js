export const FILTER_KEYWORDS = {
  'Cases & Protection': ['Case', 'Sleeve', 'Cover', 'Folio', 'Smart Keyboard'],
  'Displays & Mounts': ['Mount'],
  'Mice & Keyboards': ['Mouse', 'Magic Keyboard', 'Trackpad'],
  Stroage: ['SuperDrive'],
  'Headphones & Speakers': ['Speaker', 'Earphones', 'Headphones', 'AirPods', 'EarPods'],
  'Health & Fitness': ['AirPods with'],
  Photography: ['Reader'],
  'Power & Cables': ['Cable', 'Adapter', 'Charging', 'Charger', 'Smart Battery', 'Lightning Dock'],
  'Wireless & Chargers': ['Wireless', 'Magnetic'],
  Creativity: ['Apple Pencil'],
  Keyboards: ['Smart Keyboard'],
  Stands: ['Dock'],
  'Remotes & Controllers': ['Remote'],
  airpods: ['AirPods with']
}

/*
mac
  配件
iPhone
  Airpods
  配件
iPad
  配件
  Apple Pencil
  Smart Keyboard
  Airpods
Watch
  配件
TV
  配件
  Airpods
  Remote Loop
Music
  配件
*/

/*
tag 清單

保護配件與防護 Cases & Protection
  keyword: Case/Sleeve/Cover/Smart Folio/Smart Keyboard
顯示器與支架 Displays & Mounts
  keyword: Mount
滑鼠與鍵盤 Mice & Keyboards
  keyword: Mouse/Magic Keyboard/Trackpad
儲存裝置 Stroage
  keyword: SuperDrive
耳機與揚聲器 Headphones & Speakers
  keyword: Speaker/Earphones/Headphones
健康與健身 Health & Fitness

攝影 Photography
  keyword: Reader
電源與連接線 Power & Cables
  keyword: charging/charger/Adapter
無線充電器 Wireless & Chargers
  keyword: wireless/magnetic
創意 Creativity
  keyword: Apple Pencil
鍵盤 Keyboards
  keyword: Smart Keyboard
立架 Stands:
  keyword: Dock

*/

export const CATEGORY = {
  Mac: ['Cases & Protection', 'Displays & Mounts', 'Mice & Keyboards', 'Power & Cables', 'Stroage'],
  iPhone: ['Cases & Protection', 'Headphones & Speakers', 'Health & Fitness', 'Photography', 'Power & Cables', 'Wireless & Chargers'],
  iPad: ['Cases & Protection', 'Creativity', 'Headphones & Speakers', 'Health & Fitness', 'Keyboards', 'Photography', 'Power & Cables'],
  Watch: ['Headphones & Speakers', 'Health & Fitness', 'Power & Cables', 'Stands', 'Wireless & Chargers'],
  'Apple TV': ['Remotes & Controllers'],
  // 'Apple TV': ['Headphones & Speakers', 'Remotes & Controllers'],
  Music: ['Power & Cables', 'Headphones & Speakers']
}

export const TITLE = ['Mac', 'iPhone', 'iPad', 'Watch', 'Apple TV', 'Music']

export const MAP_TITLE = {
  Mac: 'Mac',
  iPhone: 'iPhone',
  iPad: 'iPad',
  Watch: 'Apple Watch',
  'Apple TV': 'TV',
  Music: 'Music'
}
