export const chapterNavBar = [
  {
    prodName: 'Apple TV 4K',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/TV/TV.svg')})`
    }
  },
  {
    prodName: 'Apple TV HD',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/TV/TV.svg')})`
    }
  },
  {
    prodName: '配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/TV/TVaccessories.svg')})`
    },
    route: '/accessories?category=Apple%20TV'
  }
]

export const sectionHerosM = [
  {
    name: 'Apple TV 4K',
    image: require('../../assets/images/TV/apple-tv-hero-select-201510.jpeg')
  },
  {
    name: 'Apple TV HD',
    image: require('../../assets/images/TV/MLFQ2.jpg')
  },
  {
    name: '配件',
    route: 'accessories?category=Apple%20TV',
    image: require('../../assets/images/TV/HJKP2.jpg')
  }
]
