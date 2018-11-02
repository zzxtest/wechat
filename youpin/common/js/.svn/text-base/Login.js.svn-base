var config = require('./config.js')
var request = require('./request.js')
module.exports = {
  Login: function (){
    wx.login({
      success: loginData => {
        wx.getUserInfo({
          success: user => {
            wx.setStorageSync('userinfo', user.userInfo)
            var loginUrl = config.LOCALHOST + config.API.xcx_onlogin
            var data = {
              code: loginData.code
            }
            request.get(loginUrl, data).then((loginResp) => {
              var data = loginResp.data
              if (!data.user.user_id) {
                wx.switchTab({
                  url: 'pages/index/index',
                })
              }
              wx.setStorageSync('open_id', data.open_id)
              wx.setStorageSync('user', data.user)
            })
          },
          complete: e => {
            if (e.errMsg == 'getUserInfo:fail auth deny') {
              wx.removeStorageSync('userinfo')
            }
          },
          fail: e => {
            wx.showModal({
              title: '温馨提示',
              content: '用户信息未授权，请点击授权进行设置',
              confirmText: '授权',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                    }
                  })
                } else if (res.cancel) {
                }
              }
            })

          }
        })
      },
      fail: e => {
        console.error('wx.login', e)
      }
    })
  }
}

