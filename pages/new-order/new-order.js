// pages/new-order/new-order.js
let wux = require('../../components/wux')
let constant = require('../../js/constant')
let api = require('../../js/api');
let app = getApp()
let $calendar = wux.$wuxCalendar

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unsure: [],
    ensure: [],
    isEnsure: '',
    isUnsure: 'active',
    firstLabel: {
      label: ['请选择一级分类','测试1', '测试2', '测试3'],
      value: ['0','test1', 'test2', 'test2']
    },
    secondLabel: {
      label: ['请选择二级分类', '测试1', '测试2', '测试3'],
      value: ['0', 'test1', 'test2', 'test2']
    },
    designStyles: {
      label: ['请选择设计风格', '精装', '简装', '欧式', '中式'],
      value: ['0', 'test1', 'test2', 'test2', 'test3']
    },
    communicate: {
      label: ['请选择沟通方式', '面对面沟通', '打电话'],
      value: ['0', 'test1', 'test2']
    },
    finishTime: '请填写交稿日期',
    labelIndex: 0
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
  bindPickerChange: function (e) {
    let data = this.data
    let idx = parseInt(e.detail.value, 10)
    this.setData({
      labelIndex: idx,
    })
  },
  changeTime: function () {
    if (this.finishTime) {
      return this.finishTime.show();
    }
    let page = this;
    this.finishTime = $calendar.init('finishTime', {
      onChange: function (p, v, d) {
        page.setData({
          finishTime : d.join(',')
        })
      }
    });
  },
  uploadImg: function () {
    wx.chooseImage({
      count: 1, // 默认9
      size: 200,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.get(constant.API.SEND_UNSURE, null
      , function (ret) {
        // api.get(ret.url, null, function () {

        // }, function (resp) {
        //   console.log(resp)
        // })
        console.log(ret)
      });
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