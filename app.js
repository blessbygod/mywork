//app.js 
let constant = require('./js/constant')
let api = require('./js/api')
 
App({
  onLaunch: function () {
    let app = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)  
    app.login();
  },
  // 绑定用户手机号
  bindUserPhoneNumber (resp) {
    let app = this
    api.patch(constant.API.USERS, { 
      data: {
        iv: resp.iv,
        encrypted_data: resp.encryptedData
      }
    }, function (resp) {
      wx.navigateTo({
        url: "../../pages/home/home"
      }) 
    })  
  },
  // 微信登录
  login: function () {
    var app = this
    wx.login({
      success: function (resp) {   
        app.getFDUsers(resp.code);
      }
    })
  },
  // 获取自由设计师用户信息
  getFDUsers (code) {
   api.get(constant.API.WE_USERS, {
    data: {
      code: code
    }
   },  
   function (data, resp) {
      let sessionid = resp.header.sessionid; 
      sessionid && (wx.setStorageSync('sessionid', sessionid));
      // 如果成功，直接跳转到首页   
      let userData = data  
      userData && (wx.setStorageSync('userdata', userData))
      // APP会在初始化调用，临时调整为my
      return
      wx.navigateTo({
        url: "../../pages/home/home"
      }) 
   }, function (msg, error, resp) { 
    let sessionid = resp.header.sessionid;
    sessionid && (wx.setStorageSync('sessionid', sessionid));
    if (msg) {
      wx.showToast({
        title: msg,
      });
      if (error.code === 40010) {
        setTimeout(function () {
          wx.navigateTo({
            url: "../../pages/regist/regist"
          })
        }, 1500)
      }
    }
  })
  },
  getUserInfo:function(cb){
    var app = this
    if(this.$data.userInfo){
      typeof cb == "function" && cb(this.$data.userInfo)
      return;
    } 
  },
  $data:{
    userInfo:null
  }
})