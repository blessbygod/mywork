// redirect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var view = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(userInfo => {
      // 查询是否注册了该用户

      //更新数据
      view.setData({
        userInfo: userInfo
      })
    })
  } 
})