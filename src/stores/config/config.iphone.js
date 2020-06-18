// 圖片引入 https://github.com/vuejs-templates/webpack/issues/450
export const chapterNavBar = [
  {
    prodName: 'iPhone 11 Pro',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iPhone_XS.svg')})`
    }
  },
  {
    prodName: 'iPhone 11',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iPhone_XR.svg')})`
    }
  },
  {
    prodName: 'iPhone SE',
    isNew: true,
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iphone_se.svg')})`
    }
  },
  {
    prodName: 'iPhone X',
    subName: 'R',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iPhone_XR.svg')})`
    }
  },
  /* {
    prodName: 'iPhone 8',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iPhone_8.svg')})`
    }
  }, */
  {
    prodName: 'AirPods',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/airpods__c6lrgkbcjdg2_large.svg')})`
    },
    route: '/accessories?category=iPhone&filter=Headphones%2BSpeakers'
  },
  {
    prodName: '配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/iphone_acc_dark__b5fvf10sbhci_large.svg')})`
    },
    route: '/accessories?category=iPhone'
  }
]
export const sectionHerosiPhone = {
  category: 'iPhone',
  relatedProductList: [
    {
      model: 'SE',
      modelNameSvg: require('../../assets/images/iPhone/iphone_se_logo.jpg'),
      backgroundURL: require('../../assets/images/iPhone/iphone_se.jpg'),
      campaignSubTitle: '精彩不少，付出不多。',
      styleSection: 'right'
    },
    {
      model: '11 Pro',
      modelNameSvg: '',
      backgroundURL: require('../../assets/images/iPhone/iPhone11proHero.png'),
      campaignSubTitle: '相機、顯示器、效能，Pro 如其名。'
    },
    {
      model: '11',
      modelNameSvg: require('../../assets/images/iPhone/iPhone11_logo.svg'),
      backgroundURL: require('../../assets/images/iPhone/hero_endframe__fezfwgxk81qq_small_2x.jpg'),
      campaignSubTitle: '樣樣行，剛剛好。',
      styleSection: 'right'
    },
    {
      model: 'XR',
      modelNameSvg: require('../../assets/images/iPhone/hero_logo_large_xr.svg'),
      backgroundURL: require('../../assets/images/iPhone/iPhoneXrHero.png'),
      campaignSubTitle: '哪一面，都耀眼。'
    }
    /*  {
      model: '8',
      modelNameSvg: require('../../assets/images/iPhone/iPhone8_logo.png'),
      backgroundURL: require('../../assets/images/iPhone/iPhone8Hero.jpg'),
      campaignSubTitle: ''
    } */
  ]
}

export const sectionHerosM = [
  {
    name: 'iPhone SE',
    image: require('../../assets/images/iPhone/iphone-se-family-select-2020.jpg')
  },
  {
    name: 'iPhone 11 Pro',
    image: require('../../assets/images/Home/iphone-11-pro-max-midnight-green-select-2019.png')
  },
  {
    name: 'iPhone 11',
    image: require('../../assets/images/Home/iphone11-green-select-2019.png')
  },
  {
    name: 'iPhone XR',
    image: require('../../assets/images/iPhone/iphone-xr-red-select-201809.jpeg')
  },
  /*  {
    name: 'iPhone 8',
    image: require('../../assets/images/iPhone/iphone8-gold-select-2018.jpeg')
  }, */
  {
    name: '配件',
    route: 'accessories?category=iPhone',
    image: require('../../assets/images/Home/MU7W2_GEO_HK.png')
  }
]
