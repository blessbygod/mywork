// pages/upload-gallery/upload-gallery.js
let constant = require('../../js/constant.js')
let api = require('../../js/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showname: false,
    showsummary: false,
    showconcept: false,
    name: '',
    summary: '',
    concept: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // submit
  patchGallery: function () {
    let page = this
    api.post(constant.API.GALLERY, {
      data: {
        name: 'test相册001',
        desc: '我的设计概述是balala',
        images: page.data.imgUrls,
        concept: '我的设计理念是balala',
        download_price: 300,
        concept_price: 200,
        gallery_price: 100,
        scate: '工装'
      }
    }, function (resp) {
      console.log(resp)
    }, function (err) {
      console.log(err)
    })
  },
  // 上传图片
  uploadImage: function () {
    let page = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        let filePath = tempFilePaths[0]
        let sessionid = wx.getStorageSync('sessionid');
        wx.uploadFile({
          url: constant.host + constant.API.UPLOAD_FILE,
          filePath: filePath,
          name: 'content',
          header: {
            sessionid: sessionid
          },
          formData: {
            type: 'work'
          },
          success: function(res){
            let data = JSON.parse(res.data)
            //do something
            let image = data.data 
            let imgUrls = page.data.imgUrls
            imgUrls.push({
              image: image,
              name: ''
            })
            page.setData({
              imgUrls: imgUrls
            })
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          }
        })
      }
    })
  }
})