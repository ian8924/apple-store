export const chapterNavBar = [
  {
    prodName: 'MacBook Pro',
    isNew: true,
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Mac/macbookpro__enfip2k1cxkm_large.svg')})`
    }
  },
  // {
  //   prodName: 'MacBook Air',
  //   isNew: true,
  //   prodImgStyle: {
  //     backgroundImage: `url(${require('../../assets/images/Mac/macbookair__ej39du0gz4uq_large.svg')})`
  //   }
  // },
  {
    prodName: 'iMac',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Mac/imac__dkswmjfqeziq_large.svg')})`
    }
  },
  {
    prodName: 'iMac Pro',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Mac/imac_pro__eer4bfwlutme_large.svg')})`
    }
  },
  {
    prodName: 'Mac mini',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Mac/macmini__c6u0it831y0y_large.svg')})`
    }
  },
  {
    prodName: '配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Mac/mac_acc__fy6vtx5eqoyi_large.svg')})`
    },
    route: '/accessories?category=Mac'
  }
]

export const sectionHerosM = [
  {
    name: 'MacBook Pro',
    image: require('../../assets/images/Mac/mbp15touch-silver-m.jpg')
  },
  // {
  //   name: 'MacBook Air',
  //   image: require('../../assets/images/Mac/macbook-air-gold-select-201810.jpg')
  // },
  {
    name: 'iMac',
    image: require('../../assets/images/Mac/imac-27-retina-selection-hero-201903.jpg')
  },
  {
    name: 'iMac Pro',
    image: require('../../assets/images/Mac/imacpro-27-retina-config-hero.jpeg')
  },
  {
    name: 'Mac mini',
    image: require('../../assets/images/Mac/mac-mini-hero-201810.jpg')
  },
  {
    name: '配件',
    route: 'accessories?category=Mac',
    image: require('../../assets/images/Mac/MRME2_AV1.jpeg')
  }
]
