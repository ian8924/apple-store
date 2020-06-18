export const chapterNavBar = [
  {
    isNew: true,
    prodName: 'AirPods Pro',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/airpods_pro.svg')})`
    },
    route: '/accessories?category=iPhone&filter=Health%2BFitness'
  },
  {
    prodName: 'AirPods',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPhone/airpods__c6lrgkbcjdg2_large.svg')})`
    },
    route: '/accessories?category=iPhone&filter=Health%2BFitness'
  },
  {
    prodName: 'iPod touch',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Music/ipod_touch_light_large.svg')})`
    }
  },
  {
    prodName: 'Music 配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/Music/accessories_large.svg')})`
    },
    route: '/accessories?category=Music'
  }
]

export const sectionHerosMusic = {
  category: 'Music',
  relatedProductList: [
    {
      model: 'AirPods Pro',
      isFirst: true,
      modelNameSvg: '',
      backgroundURL: require('../../assets/images/Music/airpods_pro.png'),
      campaignSubTitle: '沒有噪音，<br />只有好聲音。',
      route: 'accessories?category=iPhone&filter=Health%2BFitness'
    },
    {
      model: 'AirPods',
      modelNameSvg: '',
      backgroundURL: require('../../assets/images/Music/airpods_large.png'),
      campaignSubTitle: '更加巧妙，<br />無比驚歎。',
      route: 'accessories?category=iPhone&filter=Health%2BFitness'
    },
    {
      model: 'iPod touch',
      modelNameSvg: '',
      isNew: true,
      backgroundURL: require('../../assets/images/Music/ipod_large.jpg'),
      campaignSubTitle: '你喜愛的音樂，<br />帶著走。'
    },
    {
      model: '配件',
      modelNameSvg: '',
      backgroundURL: require('../../assets/images/Music/accessories_large.png'),
      campaignSubTitle: '全新風貌，<br />聽音樂。',
      route: 'accessories?category=Music'
    }
  ]
}

export const sectionHerosM = [
  {
    name: 'AirPods Pro',
    route: 'accessories?category=iPhone&filter=Health%2BFitness',
    image: require('../../assets/images/Music/MWP22_AV1.jpg')
  },
  {
    name: 'AirPods',
    route: 'accessories?category=iPhone&filter=Health%2BFitness',
    image: require('../../assets/images/Music/MRXJ2_AV1.jpg')
  },
  {
    name: 'iPod touch',
    image: require('../../assets/images/Music/ipod-touch-select-silver-2019_GEO_TW.jpg')
  },
  {
    name: '配件',
    route: 'accessories?category=Music',
    image: require('../../assets/images/Music/MHA22.jpg')
  }
]
