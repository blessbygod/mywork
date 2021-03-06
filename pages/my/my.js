//index.js
//获取应用实例
let constant = require('../../js/constant.js');
let api = require('../../js/api');
let wux = require('../../components/wux')
let app = getApp()
let $dialog = wux.$wuxDialog
let $bottomBar = wux.$wuxBottomBar

Page({
  data: {
    userInfo: {},
    filters: {
      most: [ '最多浏览', '最多点赞', '最多下载'],
      most_order: ['view_count', 'like_count', 'download_count']
    },
    mostIndex: 0,
    typeIndex: 0,
    layout: 'normal',
    gallerys: [],
    cates: [],
    modalMessage: '',
    hidden: true,
    order_by: 'created_on'
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
  onLoad: function () {
   this.getGallerys();
   $bottomBar.show(
     {
       bottomBarTexts: constant.COMPONENTS.BOTTOM_BAR
     }
   );
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
  getGallerys: function () {
    let page = this
    let userData = wx.getStorageSync('userdata')
    let id = userData.id
    let order = page.data.order_by
    api.get(constant.API.USERS + id + constant.API.GALLERY, {
      data: {
        order_by: order
      }
    }, function (ret) {
      page.setData({gallerys: ret.galleries});
      page.setData({cates: ret.cates });
    })
  }
})
