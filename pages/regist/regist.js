// regist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getPhoneNumber (e) {  
    app.bindUserPhoneNumber(e.detail)
  }
})