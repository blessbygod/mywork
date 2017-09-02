let constant = require('constant');
let api = {};

api.ajax = function (url, options, scb, fcb) {
  let sessionid = resp.header.sessionid;
  if (sessionid) {
    wx.setStorageSync('sessionid', sessionid)
  }
  else {
    sessionid = wx.getStorageSync('sessionid');
  } 
  url = constant.host + url;
  let headers = options.headers || {};
  headers.sessionid = sessionid; 
  let method = options.method || 'GET'; 
  let data = options.data || {};
  wx.request({
    url: url,
    data: data,
    header: headers,
    method: method,
    success: cb,
    fail: fcb 
  })
}

api.get = function () {
  let opts = arguments[1];
  opts.method = 'GET';
  api.ajax.apply(this, arguments);
}
api.post = function () {
  let opts = arguments[1];
  opts.method = 'POST';
  api.ajax.apply(this, arguments);
}
api.patch = function () {
  let opts = arguments[1];
  opts.method = 'PATCH';
  api.ajax.apply(this, arguments);
}
api.delete = function () {
  let opts = arguments[1];
  opts.method = 'DELETE';
  api.ajax.apply(this, arguments);
}
module.exports = api;