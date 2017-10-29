//index.js
//获取应用实例
let constant = require('../../js/constant.js');
let api = require('../../js/api');
let app = getApp()
Page({
  data: { 
    userInfo: {},
    imgUrls: [
      '../../imgs/banner_1.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000, 
    filters: {
      most: [ '最多浏览', '最多点赞', '最多下载'],
      most_order: ['view_count', 'like_count', 'download_count']
    },
    mostIndex: 0,
    typeIndex: 0,
    layout: 'normal',
    bottomBarTexts: [
      {
        name: '首页',
        class: 'home'
      },
      {
        name: '发单',
        class: 'send'
      },
      {
        name: '接单',
        class: 'apply'
      },
      {
        name: '我的',
        class: 'my'
      } 
    ],
    gallerys: [],
    cates: [],
    modalMessage: '',
    hidden: true,
    order_by: 'view_count'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  createGallery: function (e) {
    let data = this.data
    let dataset = e.currentTarget.dataset
    let url = dataset.page
    let gid = dataset.gid
    let ipage = dataset.ipage

    wx.redirectTo({
      url: `../${url}/${url}?gid=${gid}&ipage=${ipage}`,
    })
  },
  bindPickerChange: function (e) {
    let data = this.data
    let idx = parseInt(e.detail.value, 10)
    this.setData({
      mostIndex: idx,
      order_by: data.filters.most_order[idx]
    })
    this.getGallerys()
  },
  toggleLayout: function (e) {
    let data = this.data
    let dataset = e.currentTarget.dataset
    let layout = dataset.layout
    this.setData({ 
      layout: layout
    })
    this.getGallerys()
  },
  onLoad: function () { 
   this.getGallerys();
  },
  likeIt: function (e) {
    let page = this
    let dataset = e.currentTarget.dataset
    let gallerys = dataset.gallerys
    let idx = dataset.idx 
    let gallery = gallerys[idx]
    gallery.like_count++
   api.post(constant.API.LIKE_IT + gallery.id + '/', null, function () {
     page.setData({
       gallerys: gallerys
     })
   }, function (msg) { 
      page.setData({
        hidden: false,
        modalMessage: msg
      }) 
   })
  }, 
  redirectPage: function (e) {
    let page = this 
    let dataset = e.currentTarget.dataset
    let url = dataset.page 
    wx.redirectTo({
     url: `../${url}/${url}`
    })
  },
  confirm: function () { 
    this.setData({
      hidden: true 
    }) 
  },
  checkDownloadLink(e) {
    let dataset = e.currentTarget.dataset
    let gid = dataset.id 

    api.get('pay/pay_download_check/', {
      data: {
        goods_id: gid,
        goods_type: 'gallery'
      }
    }, function (ret) {
      api.get(ret.url, null, function () {

      }, function (resp) {
        console.log(resp)
      })
    })
    return
    api.post(constant.API.PAY_CREATE_ORDER,{
      data: {
        goods_id: gid,
        goods_type: 'gallery'
      }
    }, function (ret) {
      let data = {}
      data.timeStamp = String(ret.timeStamp)
      data.paySign = ret.sign
      data.signType = ret.signType
      data.nonceStr = ret.nonceStr
      data.package = ret.package
      // 支付成功并不返回
      // data.success = function (resp) {
      //   console.log(resp)
      // }
      // data.fail = function (err) {
      //   console.log(err)
      // }
      data.complete = function (res) {
        console.log(res)
      }
      wx.requestPayment(data)
    })
  },
  getGallerys: function () {
    let page = this 
    let order = page.data.order_by
    api.get(constant.API.HOT_GALLERYS, {
      data: {
        order_by: order
      }
    }, function (ret) { 
      page.setData({gallerys: ret.galleries});
      page.setData({cates: ret.cates });
    })
  }
})
