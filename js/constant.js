let _ = require('lodash');
let constant = {};
constant.host = 'https://fd.lichenfan.com/api/';
constant.API = {
  WE_USERS: 'wechat/users/',
  USERS: 'users/',
  HOT_GALLERYS: 'hot_gallerys/',
  LIKE_IT: 'like_it/',
  GALLERY: '/gallery/',
  PAY_CREATE_ORDER: 'pay/create_order/',
  UPLOAD_FILE: 'upload_file/',
  SEND_UNSURE: 'orders/?status__gt=80',
  SEND_ENSURE: 'orders/?status__gt=0&status__lte=80'
}
constant.COMPONENTS = {
  BOTTOM_BAR: [
    {
      name: '首页',
      class: 'home',
      imgURL: '/imgs/icon_home_normal.png',
      url: '/pages/home/home'
    },
    {
      name: '发单',
      class: 'send',
      imgURL: '/imgs/icon_send_normal.png',
      url: '/pages/send/send'
    },
    {
      name: '接单',
      class: 'apply',
      imgURL: '/imgs/icon_apply_normal.png',
      url: '/pages/apply/apply'
    },
    {
      name: '我的',
      class: 'my',
      imgURL: '/imgs/icon_my_normal.png',
      url: '/pages/my/my'
    }
  ]
}
module.exports = constant;

