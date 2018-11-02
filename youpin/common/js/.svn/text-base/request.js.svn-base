var config = require('./config.js')
var fun = require('./functions.js')
var queryString = require("../../utils/query-string/index.js")
var app = getApp()
module.exports = {
  getHeader: function (method) {
    var header = config.header.headers
    header.noncestr = fun.randStr(16)
    header.uuid = fun.getuuid()
    var md5Str = 'appver=' + header.appver + '&noncestr=' + header.noncestr + '&platform=' + header.platform + '&uuid=' + header.uuid + '&secretkey=' + config.secretkey
    header.sign = fun.md5(md5Str)
    if (header.platform != '2') {
      header.platform = '2'
    }
    var wechat_auth_cookie = wx.getStorageSync('wechat_auth_cookie');
    header.cookie = ''
    if (wechat_auth_cookie != undefined && wechat_auth_cookie != '') {
      header.cookie = wechat_auth_cookie
    }
    return header
  },
  get: function (url, params, Header) {
    var header = this.getHeader()
    if (!fun.isEmptyObject(Header) && Header != undefined) {
      for (var i in Header) {
        header[i] = Header[i]
      }
    } else {
      header = this.getHeader()
    }
    if (params) {
      url += '?' + queryString.stringify(params)
    }
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: {},
        header: header,
        method: 'GET',
        success: function (res) {
          //res.statusCode=401
          if (res.header["Set-Cookie"]){
            wx.setStorageSync('wechat_auth_cookie', res.header["Set-Cookie"])
          }
          if (res.statusCode == 401 || res.data.code == -220) {
            that.reLogin()
            return
          }
          if (res.data.code == 0){
            wx.showModal({
              title: '温馨提示',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  
                } else if (res.cancel) {
                  
                }
              }
            })
          }
          if (res.statusCode == 503) {
            wx.showToast({
              title: '服务器忙！',
              icon: 'loading',
              duration: 1500
            })
            return
          }
          if (res.data.ret) {
            return
          }
          resolve(res.data)
        },
        fail: function (err) {
          // console.error(url, err, params)
          reject(err)
        }
      })
    })
  },
  post: function (url, body, Header, reLoginJumUrl) {
    var header = this.getHeader()
    if (!fun.isEmptyObject(Header) && Header != undefined) {
      for (var i in Header) {
        header[i] = Header[i]
      }
    } else {
      header = this.getHeader()
    }
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: JSON.stringify(body),
        header: header,
        method: 'POST',
        success: function (res) {
          if (res.header["Set-Cookie"]) {
            wx.setStorageSync('wechat_auth_cookie', res.header["Set-Cookie"])
          }
          
          if (res.statusCode == 401) {//token授权过期，需要重新登录，获取token
            that.reLogin(reLoginJumUrl)
            return
          }
          if (res.statusCode == 503) {//服务器忙，请重试
            wx.showToast({
              title: res.statusCode + '=>' + '服务器忙！',
              icon: 'loading',
              duration: 3000
            })
          }
          if (res.data.ret) {
            console.error(url, res, body)
          }
          resolve(res.data)
        },
        fail: function (err) {
          console.error(url, err, body)
          reject(err)
        }
      })
    })
  },
  reLogin: function (jumpUrl) {//重新询问用户授权    
    var that = this
    wx.login({
      success: function (loginData) {
        wx.getUserInfo({
          success: function (user) {
            var loginUrl = config.LOCALHOST + config.API.xcx_onlogin
            var data = {
              code: loginData.code
            }
            that.get(loginUrl, data).then((loginResp) => {
              var wechat_auth_cookie = wx.getStorageSync('wechat_auth_cookie');
              if (wechat_auth_cookie) {
                var url = jumpUrl ? jumpUrl : '/pages/index/index'
                wx.reLaunch({
                  url: url,
                })
                return;
              }
            })
          },
          complete: function (e) {
            if (e.errMsg == 'getUserInfo:fail auth deny') {
              wx.removeStorageSync('userinfo')
            }
            // console.log('getuserinfo', e)
          },
          fail: function (e) {
            if (e.errMsg == 'getUserInfo:fail') {
              wx.removeStorageSync('userinfo')
            }
            // console.log('getuserinfo', e)
          }
        })
      },
      fail: function (e) {
        console.error('wx.login', e)
      }
    })
  },
  //单个文件上传
  uploadFile: function (host, filePath, params, Header) {
    var that = this
    var header = this.getHeader()
    if (!fun.isEmptyObject(Header) && Header != undefined) {
      // console.log(Header, 'no empty')
      for (var i in Header) {
        header[i] = Header[i]
      }
    } else {
      header = this.getHeader()
    }
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: host,
        header: header,
        filePath: filePath,//上传文件资源的路径
        name: 'file',//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        formData: params,//额外的form data
        success: function (res) {
          if (res.statusCode == 401) {
            that.reLogin()
            return
          }
          if (res.data.ret) {
            console.error(url, res, params)
          }
          resolve(res)
        },
        fail: function (err) {
          console.error(host, err, params)
          reject(err)
        },
        complete: function (e) {
          // console.log('com', e)
        }
      })
    })
  },

}