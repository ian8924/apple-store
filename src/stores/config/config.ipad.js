export const chapterNavBar = [
  {
    prodName: 'iPad Pro',
    isNew: true,
    subName: '',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPad/ipadpro_light__dxq7nxjgsd2e_large.svg')})`
    }
  },
  {
    prodName: 'iPad Air',
    subName: '',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPad/ipadair_light__gan6yfrffc66_large.svg')})`
    }
  },
  {
    prodName: 'iPad',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPad/ipad_light__expohijp19si_large.svg')})`
    }
  },
  {
    prodName: 'iPad mini',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPad/ipadmini_light__bxpulkud30s2_large.svg')})`
    }
  },
  {
    prodName: 'iPad 配件',
    prodImgStyle: {
      backgroundImage: `url(${require('../../assets/images/iPad/ipad_acc_light__ebtftz3r2rwy_large.svg')})`
    },
    route: '/accessories?category=iPad'
  }
]

export const sectionHerosiPad = {
  category: 'iPad',
  relatedProductList: [
    {
      model: 'iPad Pro',
      modelNameSvg: '',
      isNew: true,
      campaignSubTitle: '你的下一部電腦，<br />非電腦。',
      bgStyle: 'bg-ipad-pro',
      col: {
        L: 'col-md-12',
        R: 'col-md-0'
      }
    },
    {
      model: 'iPad Air',
      modelNameSvg: '',
      isNew: false,
      backgroundURL: require('../../assets/images/iPad/hero__gmn7i7gbziqa_large.jpg'),
      campaignSubTitle: '超強大，超值得。',
      col: {
        L: 'col-md-8',
        R: 'col-md-4'
      }
    },
    {
      model: 'iPad',
      modelNameSvg: '',
      isNew: false,
      backgroundURL: require('../../assets/images/iPad/ipad__bj8z4pfznqnm_large.jpg'),
      campaignSubTitle: '迎接新一代 iPad。',
      col: {
        L: 'col-md-5',
        R: 'col-md-5'
      }
    },
    {
      model: 'iPad mini',
      modelNameSvg: '',
      isNew: false,
      backgroundURL: require('../../assets/images/iPad/ipad_mini__ebopny1hluwm_large.jpg'),
      campaignSubTitle: '身材小，本事大。',
      col: {
        L: 'col-md-6',
        R: 'col-md-3'
      },
      layout: ['pb-0']
    }
  ]
}

export const sectionHerosM = [
  {
    name: 'iPad Pro',
    image: require('../../assets/images/iPad/ipad_pro_s.jpg')
  },
  {
    name: 'iPad Air',
    image: require('../../assets/images/iPad/ipad_air_s.jpg')
  },
  {
    name: 'iPad',
    image: require('../../assets/images/iPad/compare_ipad__ebh84elg2mi6_small.jpg')
  },
  {
    name: 'iPad mini',
    image: require('../../assets/images/iPad/ipad_mini_s.jpg')
  },
  {
    name: '配件',
    route: 'accessories?category=iPad',
    image: require('../../assets/images/iPad/ipad_acc_s.jpg')
  }
]
