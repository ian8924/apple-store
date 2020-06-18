# Json 檔格式說明

- 第一層是 LoB，iPhone、iPad、...
- 第二層是 Brand 對應 IM_CardBonus.Product 欄位 ProductName
- 第三層是 產品清單 Array，裡面每一個 element 對應 IM_CardBonus.Product_Specs

## Accessories 產品說明

### 規則

- 第一層是 Accessories 的所有產品
- 其他 LoB 層級內的 Brand 包含 Accessories 也是配件
- Music.Beats 是配件

## 欄位說明

**每個欄位不是每個產品項都有**

- name 是產品的原始 Excel Part Description 欄位
- EANCode 是產品的原始 Excel Part Description EAN 欄位
- price 是產品的原始 Excel DAC Ex VAT (TWD) 欄位
- specName 是產品的原始 Part Number 欄位
- model 是產品的原始 Brand 欄位
- title 是產品中文翻譯，用爬蟲抓出來的
- IMGLink 是產品圖，用爬蟲抓出來的
- imgSwatch 是產品顏色選項圖，用爬蟲抓出來的
- modelspecs 是 Mac 產品電腦規格，**型別為陣列**，用爬蟲抓出來的
- inputType 是產品描述 Part Description 包含 Keyboard 字眼解析出來的輸入法類型
- color 是產品描述 Part Description 解析出來的顏色
- productSize 是產品描述 Part Description 解析出來的產品大小，單位為 inch
- capacity 是產品描述 Part Description 解析出來的產品容量
- connectivity 是產品描述 Part Description 解析出來的連線方式
- caseSize 是產品描述 Part Description 解析出來的錶殼尺寸
- watchType 是產品描述 Part Description 解析出來的手錶錶殼顏色搭配類型
- bandType 是產品描述 Part Description 解析出來的錶帶類型
- bandSize 是產品描述 Part Description 解析出來的錶帶尺寸
- caseSize 是產品描述 Part Description 解析出來的錶殼尺寸
- displayGlass 是產品描述 Part Description 解析出來的螢幕材質（Pro Display XDR）
- engraving 是產品是否能使用雷射雋刻服務
- installment 產品可分期數
- ~~bandSizeInfo 是錶帶的手腕適合範圍，用爬蟲抓出來的棄用，整合至 title~~

## JSON 欄位對應資料庫

`?`代表目前資料庫尚無欄位

- name -> IM_CardBonus.Product_Spec?
- EANCode -> IM_CardBonus.Product_Specs.EANCode
- price -> IM_CardBonus.CustomerType_Product_Cost.Cost
- specName -> IM_CardBonus.Product_Specs.SpecName
- model -> IM_CardBonus.Product.ProductName
- title -> IM_CardBonus.roduct_Spec?
- IMGLink -> IM_CardBonus.Product_Specs.IMGLink
- imgSwatch -> IM_CardBonus.Product_Specs?
- modelspecs -> IM_CardBonus.Product_Specs?
- inputType -> IM_CardBonus.Product_Specs?
- color -> IM_CardBonus.Product_Specs.Color
- productSize -> IM_CardBonus.Product_Specs.productSize
- capacity -> IM_CardBonus.Product_Specs.capacity
- connectivity -> IM_CardBonus.Product_Specs.connectType
- caseSize -> IM_CardBonus.Product_Specs?
- watchType -> IM_CardBonus.Product_Specs?
- bandType -> IM_CardBonus.Product_Specs?
- bandSize -> IM_CardBonus.Product_Specs?
- caseSize -> IM_CardBonus.Product_Specs?
- engraving -> IM_CardBonus.Product_Specs?
- installment -> IM_CardBonus.Product_Specs?
- displayGlass -> IM_CardBonus.Product_Specs?
- ~~bandSizeInfo -> IM_CardBonus.Product_Specs?棄用，整合至 title~~

## Json 資料檔手動調整的內容

- 爬蟲結果會出現產品頁面不存在的問題，需手動調整，並確認是產品資料檔 excel 是否正確

  1. Remote Loop 查不到頁面，手動查詢
  2. 40/44mm Midnight Blue Sport Band 查不到頁面，移除產品

- 產品 excel 檔 part descrition 會有缺漏，導致分類產品產生問，曾手動調整過的內容如下

  1. `"Beats Pill+ Speaker - Black"` 調整為 `"Beats Pill+ Portable Speaker - Black"`
  2. `"Beats Pill+ Speaker - White"` 調整為 `"Beats Pill+ Portable Speaker - White"`
  3. 米蘭式錶環、錶鏈帶因為 part descrition 沒有標記顏色，導致顏色無法正確解析，手動加入 `"color": "Silver"`
  4. MacBook Pro 產品 title、modelspecs 會有英文半形逗號 `,`，要取代為中文全形 `，`
  5. iPhone Lightning Dock part descrition 沒有標記顏色，手動調整 name 為 `iPhone Lightning Dock White`
  6. `MQUF2ZP/A` 修正 part descrition 為 `Beats Studio3 Wireless Headphones - The Beats Skyline Collection - Shadow Grey`
  7. `MX7X2ZP/A` 修正顏色為 `Defiant Black-Red`
  8. `MLFQ2FE/A` 修正圖片 `https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MLFQ2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1559961289504`
  9. `MTPH2FE/A`、`MTPX2FE/A` 此兩項商品未販售，直接刪除

### 產品頁資料篩選邏輯

- Mac 類

1. 參數為 nav bar 名稱
2. 程式碼

```js
// raw_mac 是產品表格 LoB = Mac 欄位的清單，找出跟 model 欄位相同的產品
for (const key in raw_mac) {
  if (hero.model === key.toLowerCase().replace(/\s/g, '-')) {
    data = raw_mac[key];
  }
}
```

- Watch 類

1. 參數為 nav bar 名稱
2. 程式碼

- bands 為 Brand = 'Bands' 的所有產品
- apple-watch-series-3 為 Brand = 'Watch Series 3' 的所有產品加上 Brand = 'Watch Nike' 裡面 name 包含 Series3 的產品
- apple-watch-series-5 為 Brand = 'Watch Series 5' 的所有產品
- apple-watch-nike 為 Brand = 'Watch Nike' 產品 name 包含 Series5 的產品

```js
// raw_watch 是產品表格 LoB = Watch 欄位的清單
switch (hero.model) {
  case 'bands':
    for (const band of raw_watch.Bands) {
      if (!listItemBands[band.bandType]) {
        listItemBands[band.bandType] = [];
      }
      listItemBands[band.bandType].push(band);
    }
    break;
  case 'apple-watch-series-3':
    for (const watch of raw_watch['Watch Series 3']) {
      if (!listItemBands[watch.watchType]) {
        listItemBands[watch.watchType] = [];
      }
      listItemBands[watch.watchType].push(watch);
    }

    for (const watch of raw_watch['Watch Nike']) {
      if (!listItemBands[watch.watchType] && watch.name.includes('Series 3')) {
        listItemBands[watch.watchType] = [];
      }
      if (watch.name.includes('Series 3')) {
        listItemBands[watch.watchType].push(watch);
      }
    }
    break;
  case 'apple-watch-series-5':
    for (const watch of raw_watch['Watch Series 5']) {
      if (!listItemBands[watch.watchType]) {
        listItemBands[watch.watchType] = [];
      }
      listItemBands[watch.watchType].push(watch);
    }

    break;
  case 'apple-watch-nike':
    for (const watch of raw_watch['Watch Nike']) {
      if (!listItemBands[watch.watchType]) {
        listItemBands[watch.watchType] = [];
      }
      if (watch.name.includes('Series 5')) {
        listItemBands[watch.watchType].push(watch);
      }
    }
    break;
}
```

- TV 類

1. 參數為 nav bar 名稱
2. 程式碼

```js
// raw_tv 是產品表格 Brand = 'Apple TV' 欄位的清單，找出跟 model 欄位相同的產品
for (const item of raw_tv) {
  if (
    item.name
      .toLowerCase()
      .replace(/\s/g, '-')
      .includes(hero.model)
  ) {
    data.push(item);
  }
}
```

- 配件 類

1. 參數

   - category: 主產品線的名稱，ex: 'Mac', 'iPhone', ...etc,
   - filter: 配件分類的名稱 'Cases & Protection', 'Stands', ...etc,

2. 程式碼

```js
let raw_mac = {};
let raw_iphone = {};
let raw_ipad = {};
let raw_watch = {};
let raw_tv = {};
let raw_music = {};

const listItemAcc = {};
const category = '';
const choicesAccType = {};
const accType = '';
const mapImg = {};
const mapPrice = {};
const mapPartNumber = {};
const mapSummary = {};
const choicesAcc = { color: [], inputType: [], swatch: {} };
const accModel = { color: '', inputType: '' };

// 找出 LoB = 'Accessories' 的配件，並分類到六大產品線內的 raw data
for (const key in data.Accessories) {
  for (const item of data.Accessories[key]) {
    let type = item.name.replace('\xa0', ' ');
    type = item.name
      .replace(item.color, '')
      .replace(item.inputType || '', '')
      .replace(' - ', '');
    if (item.name.includes('iPhone') || item.model.includes('iPhone')) {
      if (!raw_iphone[type]) raw_iphone[type] = [];
      raw_iphone[type].push(item);
    }

    if (item.name.includes('Mac') || item.model.includes('Mac')) {
      if (!raw_mac[type]) raw_mac[type] = [];

      raw_mac[type].push(item);
    }

    if (item.name.includes('iPad') || item.model.includes('iPad')) {
      if (!raw_ipad[type]) raw_ipad[type] = [];

      raw_ipad[type].push(item);
    }

    if (item.name.includes('Watch')) {
      if (!raw_watch[type]) raw_watch[type] = [];

      raw_watch[type].push(item);
    }

    if (item.name.includes('TV')) {
      if (!raw_tv[type]) raw_tv[type] = [];

      raw_tv[type].push(item);
    }

    if (item.name.includes('Music')) {
      if (!raw_music[type]) raw_music[type] = [];

      raw_music[type].push(item);
    }
  }
}
// 找出 各主產品線內 Brands 包含配件字串 'Accessories' 的產品，並分類到六大產品線內的 raw data

for (const LoB in data) {
  if (LoB === 'Accessories') continue;
  for (const Brand in data[LoB]) {
    // 字串如果不包含 'Accessories' 跟 'Beats' 就繼續下一個迴圈
    if (!Brand.includes('Accessories') && Brand !== 'Beats') continue;
    for (const item of data[LoB][Brand]) {
      let type = item.name.replace('\xa0', ' ');

      type = item.name
        .replace(item.color, '')
        .replace(item.inputType || '', '')
        .replace(' - ', '');

      if (LoB === 'iPhone') {
        if (!raw_iphone[type]) raw_iphone[type] = [];
        raw_iphone[type].push(item);
      }
      if (LoB === 'iPad') {
        if (!raw_ipad[type]) raw_ipad[type] = [];

        raw_ipad[type].push(item);
      }
      if (LoB === 'Mac') {
        if (!raw_mac[type]) raw_mac[type] = [];

        raw_mac[type].push(item);
      }
      if (LoB === 'Watch') {
        if (!raw_watch[type]) raw_watch[type] = [];

        raw_watch[type].push(item);
      }
      if (LoB === 'Apple TV') {
        if (!raw_tv[type]) raw_tv[type] = [];

        raw_tv[type].push(item);
      }
      if (LoB === 'Music') {
        if (!raw_music[type]) raw_music[type] = [];

        raw_music[type].push(item);
      }
    }
  }
}
```

3. 配件子分類如下

- Cases & Protection
- Smart Keyboard
- Displays & Mounts
- Mice & Keyboards
- Stroage
- Headphones & Speakers
- Photography
- Power & Cables
- Mice & Keyboards
- Smart Battery
- Wireless & Chargers
- Creativity
- Keyboards
- Stands
- airpods

```js
const FILTER_KEYWORDS = {
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
};
```
