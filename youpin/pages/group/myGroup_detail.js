// pages/group/myGroup_detail.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hour: '00',
    Minute: '00',
    Second: '00',
    Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid:options.gid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
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
              if (data.user.user_id) {
                that.setData({
                  Hidden: true
                })
              } else {
                that.setData({
                  Hidden: false
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
    this.myGroup_detail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: '拼团详情',
        path: '/pages/group/myGroup_detail?gid='+this.data.gid,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    } else {
      return {
        title: '淘宠优选',
        path: '/pages/index/index',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
  // 拼团详情
  myGroup_detail: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = config.LOCALHOST + config.API.get_my_groupbuy_view
    var data = {
      gid: that.data.gid,
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        that.setData({
          myGroupDetail: res.data
        })
        this.countdown(res.data.end_time, res.data.now)
      }
      wx.hideLoading()
    })
  },
  // 倒计时
  countdown: function (endtime, now) {
    var totalSecond = endtime - now

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      // 小时位  
      var hr = Math.floor(second / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        Hour: hrStr,
        Minute: minStr,
        Second: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          Hour: '00',
          Minute: '00',
          Second: '00',
        });
      }
    }.bind(this), 1000);
  },
  // 获取手机号码
  getPhoneNumber: function (e) {
    var that = this
    var userinfo = wx.getStorageSync('userinfo')
    var signinUrl = config.LOCALHOST + config.API.xcx_signin
    var open_id = wx.getStorageSync('open_id')
    var data = {
      openid: open_id,
      iv: e.detail.iv,
      encrypted_data: e.detail.encryptedData,
      nickname: userinfo.nickName,
      headimgurl: userinfo.avatarUrl
    }
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

    } else {
      request.get(signinUrl, data).then((loginResp) => {
        wx.setStorageSync('user', loginResp.data.user)
        that.setData({
          Hidden: true
        })
      })

    }

  },
  // 隐藏获取手机号码
  loginHide: function () {
    this.setData({
      Hidden: true
    })
  },
  // 加入团购
  join_groupbuy: function (e) {
    let that = this
    let user = wx.getStorageSync('user')
    let btnType = e.currentTarget.dataset.btntype
    let act_id = e.currentTarget.dataset.actid
    let gid = e.currentTarget.dataset.gid
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.userInfo"]) {
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
        } else if (!user.user_id) {
          that.setData({
            Hidden: false
          })

        } else {
          var url = config.LOCALHOST + config.API.join_groupbuy_create_order
          var data = {
            act_id: act_id,
            gid: gid
          }
          request.get(url, data).then((res) => {
            if (res.code == 1) {
              wx.navigateTo({
                url: '/pages/subOrder/subOrder?btnType=' + btnType + '&act_id=' + act_id + '&gid=' + gid,
              })
            }
          })
        }
      }
    })
  },
})