// pages/send/send.js
let wux = require('../../components/wux')
let constant = require('../../js/constant')
let api = require('../../js/api');
let app = getApp()
let $bottomBar = wux.$wuxBottomBar

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unsure: [],
    ensure: [],
    isEnsure: '',
    isUnsure: 'active'
  },
  getSend: function () {
    let page = this
    let order = page.data.order_by
    api.get(constant.API.HOT_GALLERYS, {
      data: {
        order_by: order
      }
    }, function (ret) {
      page.setData({ gallerys: ret.galleries });
      page.setData({ cates: ret.cates });
    })
  },
  changeSendType: function (e) {
    let dataset = e.currentTarget.dataset
    if (dataset.type === 'ensure') {
      this.setData({ isEnsure: 'active' });
      this.setData({ isUnsure: '' });
    }
    else {
      this.setData({ isEnsure: '' });
      this.setData({ isUnsure: 'active' });
    }
  },
  makeCall: function () {
    wx.makePhoneCall({
      phoneNumber: '15001031316',
    })
  },
  makeNewOrder: function (e) {
    let page = this
    let dataset = e.currentTarget.dataset
    let url = dataset.page
    wx.redirectTo({
      url
    })
  },
  orderDetail: function (e) {
    wx.redirectTo({
      url: '/pages/order-detail/order-detail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 未确认
    api.get(constant.API.SEND_UNSURE, null
      , function (ret) {
        // api.get(ret.url, null, function () {

        // }, function (resp) {
        //   console.log(resp)
        // })
        console.log(ret)
    })
    // 已确认
    api.get(constant.API.SEND_ENSURE, null
      , function (ret) {
        // api.get(ret.url, null, function () {

        // }, function (resp) {
        //   console.log(resp)
        // })
        console.log('ensure')
        console.log(ret)
      })
    $bottomBar.show(
      {
        bottomBarTexts: constant.COMPONENTS.BOTTOM_BAR
      }
    );
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})