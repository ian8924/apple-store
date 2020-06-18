export const chapterNavBar = [
  {
    prodName: 'Apple Watch',
    subName2: 'Series 5',
    isNew: true,
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Watch/watch_nav_series_2__bk595ih4bliu_large.svg')})`
    }
  },
  {
    prodName: 'Apple Watch',
    subName2: 'Nike',
    isNew: true,
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Watch/watch_nav_nike__mkjgkrrlq2ye_large.svg')})`
    }
  },
  {
    prodName: 'Apple Watch',
    subName2: 'Series 3',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Watch/watch_nav_edition__botzv6l1ftua_large.svg')})`
    }
  },
  {
    prodName: '錶帶',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Watch/watch_nav_bands__f5qi8icu6suq_large.svg')})`
    },
    route: '/shop/buy-watch/bands'
  },
  {
    prodName: '配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Watch/watch_nav_accessories__fix8lwwxvtu2_large.svg')})`
    },
    route: '/accessories?category=Watch'
  }
]

export const sectionHerosM = [
  {
    name: 'Apple Watch',
    subName2: 'Series 5',
    image: require('../../assets/images/Watch/compare-s5__ey0htse9zzma_medium.jpg')
  },
  {
    name: 'Apple Watch',
    subName2: 'Nike',
    image: require('../../assets/images/Watch/alu-silver-nike-sport-plat-black-s4-2up_gps_varend.jpg')
  },
  {
    name: 'Apple Watch',
    subName2: 'Series 3',
    image: require('../../assets/images/Watch/alu-space-sport-black-2up_gps_varend_GEO_TW.jpg')
  },
  {
    name: '錶帶',
    route: 'shop/buy-watch/bands',
    image: require('../../assets/images/Watch/MV602.jpeg')
  },
  {
    name: '配件',
    route: 'accessories?category=Watch',
    image: require('../../assets/images/Watch/MU9F2_GEO_TW.jpeg')
  }
]
