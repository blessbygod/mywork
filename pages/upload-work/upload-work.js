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
    showdesc: false,
    showconcept: false,
    name: '11',
    desc: '22',
    concept: '33',
    download_price: 10,
    concept_price: 20,
    gallery_price: 30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gid = options.gid
    let ipage = options.ipage
    this.setData({
      ipage: ipage,
      gid: gid
    })
    if (gid !== 'undefined' && ipage !== 'undefined') {
      let url = constant.API.HOT_GALLERYS
      if (ipage === 'my') {
        url = constant.API.GALLERY
      }
      let gURL = `${url}${gid}/`
      console.log(gURL)
      // 加载imgURLs
      var page = this
      api.get(gURL, function (resp) {
        page.data.name = resp.name
        page.data.desc = resp.desc
        page.data.imgUrls = resp.images
        page.data.concept = resp.concept
        page.data.download_price = resp.download_price
        page.data.concept_price = resp.concept_price
        page.data.gallery_price = resp.gallery_price
      })
    }
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
  patchGallery: function (e) {
    let page = this
    let data = this.data
    let dataset = e.currentTarget.dataset
    let ipage = dataset.ipage
    api.post(constant.API.GALLERY, {
      data: {
        name: page.data.name,
        desc: page.data.desc,
        images: page.data.imgUrls,
        concept: page.data.concept,
        download_price: parseInt(page.data.download_price),
        concept_price: parseInt(page.data.concept_price),
        gallery_price: parseInt(page.data.gallery_price),
        scate: '主案设计'
      }
    }, function (resp) {
      let ipage = page.data.ipage
      if (ipage === 'undefined') {
        ipage = 'my'
      }
      wx.redirectTo({
        url: `../../pages/${ipage}/${ipage}`,
      })
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