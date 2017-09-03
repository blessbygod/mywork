let constant = require('constant');
let api = {};

api.ajax = function (url, options, scb, fcb) {  
  let  sessionid = wx.getStorageSync('sessionid'); 
  url = constant.host + url; 
  let headers = options.headers || {};
  sessionid && (headers.sessionid = sessionid); 
  let method = options.method || 'GET'; 
  let data = options.data || {};
  wx.request({
    url: url,
    data: data,
    header: headers,
    method: method,
    success: function (resp) {
      let data = resp.data
      let success = data.success
      if (success) {
        typeof scb === 'function' && (scb(data.data))
        return
      }
      typeof fcb === 'function' && (fcb(data.message))
    },
    fail: fcb 
  })
}

api.get = function () {
  let args = Array.prototype.splice.call(arguments, 0) 
  let opts = args[1];
  opts || (opts = {})
  opts.method = 'GET';
  args[1] = opts 
  api.ajax.apply(this, args);
}
api.post = function () {
  let args = Array.prototype.splice.call(arguments, 0)
  let opts = args[1];
  opts || (opts = {})
  opts.method = 'POST';
  args[1] = opts
  api.ajax.apply(this, args);
}
api.patch = function () {
  let args = Array.prototype.splice.call(arguments, 0)
  let opts = args[1];
  opts || (opts = {})
  opts.method = 'PATCH';
  args[1] = opts
  api.ajax.apply(this, args);
}
api.delete = function () {
  let args = Array.prototype.splice.call(arguments, 0)
  let opts = args[1];
  opts || (opts = {})
  opts.method = 'DELETE';
  args[1] = opts
  api.ajax.apply(this, args);
}
module.exports = api;