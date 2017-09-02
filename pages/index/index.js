//index.js
//获取应用实例
var constant = require('../../js/constant.js');
var app = getApp()
Page({
  data: { 
    userInfo: {},
    filters: {
      most: ['最多上传', '最多浏览', '最多点赞', '最多下载']
    },
    mostIndex: 0,
    typeIndex: 0,
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
    ] 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () { 
   
  }
})
