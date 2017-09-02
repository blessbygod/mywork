//app.js
let api = require('./js/api')
let constant = require('./js/constant')
 
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
    api.patch(constant.API.USERS, { 
      data: {
        iv: resp.iv,
        encrypted_data: resp.encryptedData
      }
    }, function (resp) {
      console.log(resp)
      var data = resp.data;
      if (data.success) {
        wx.navigateTo({
          url: "../../pages/index/index"
        })
      } 
    })  
  },
  // 微信登录
  login: function () {
    var app = this
    wx.login({
      success: function (resp) { 
        console.log('login' + JSON.stringify(resp))
        app.getFDUsers(resp.code);
      }
    })
  },
  // 获取自由设计师用户信息
  getFDUsers (code) {
    wx.request({
      url: `https://fd.lichenfan.com/api/wechat/users/?code=${code}`,
      success: function (resp) {
        let sessionid = resp.header.sessionid; 
        sessionid && (wx.setStorageSync('sessionid', sessionid));
        // 如果成功，直接跳转到首页 
        var data = resp.data;
        if (data.success) { 
          wx.navigateTo({
            url: "../../pages/index/index"
          })
          return;
        } 
        var error = data.errors[0];
        if (error) {
          wx.showToast({
            title: error.message,
          });
          if (error.code === 40010) {
            setTimeout(function () {
              wx.navigateTo({
                url: "../../pages/regist/regist"
              })
            }, 1500)
          }
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