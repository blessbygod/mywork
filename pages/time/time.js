//index.js
//获取应用实例
var constant = require('../../js/constant.js');
var app = getApp()

Page({
  data: { 
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
    timer: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getPhoneNumber(e) {
    app.bindUserPhoneNumber(e.detail)
  },
  onLoad: function () {
    var view = this   
    this.timerAlert()
  },
  timerAlert: function () {
    let vm = this
    this.timer = setInterval(function () {
      let leftTime = vm.calcLeftTime() 
      vm.setData(leftTime)
    }, 1000) 
  },
  calcLeftTime: function () {
    let endTime = +new Date(2017, 9, 1)
    let now = Date.now()
    let leftTime = (endTime - now)
    let ss = 1000;
    let mi = ss * 60;
    let hh = mi * 60;
    let dd = hh * 24;  

    let day = Math.floor(leftTime / dd);
    let hour = Math.floor((leftTime - day * dd) / hh);
    let minute = Math.floor((leftTime - day * dd - hour * hh) / mi);  
    let second = Math.floor((leftTime - day * dd - hour * hh - minute * mi) / ss);  

    return {
      days: day.toString().split(''), 
      hours: hour.toString().split(''),
      minutes: minute.toString().split(''),
      seconds: second.toString().split('')
    }
  }
})
