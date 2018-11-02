// pages/index/index.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    page: 1,
    limit: 8,
    actSpecial: [],
    Hidden: true,
    scanCodeHidden: true,
    cdownArray: [],
    group_buying: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.actSpecialGoods()
    this.banner()
    this.Goodsactivity()
    var timer = setInterval(this.nowTime, 1000);
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
    this.setData({
      page: 1
    })
    this.actSpecialGoods()
    this.Goodsactivity()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.SpecialUpRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 跳转链接
  goAct: function (e) {
    var acttype = e.currentTarget.dataset.acttype
    if (acttype == "nomeney_buy") {
      wx.navigateTo({
        url: '/pages/act/zeroBuy',
      })
    } else if (acttype == "direct_mail") {
      wx.navigateTo({
        url: '/pages/act/HKmail',
      })
    } else if (acttype == "group_buy") {
      wx.navigateTo({
        url: '/pages/act/group_buy',
      })
    }  else if (acttype == "direct_APP") {
      this.setData({
        scanCodeHidden: false
      })
    }
  },
  groupDetail: function(e){
    let act_id = e.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/detail/group_detail?act_id=' + act_id,
    })
  },
  scanCodeHidden: function () {
    this.setData({
      scanCodeHidden: true
    })
  },
  detail: function (e) {
    var actid = e.currentTarget.dataset.actid,
      goodsid = e.currentTarget.dataset.goodsid,
      goodsspecid = e.currentTarget.dataset.goodsspecid
    wx.navigateTo({
      url: '/pages/detail/detail?goods_id=' + goodsid + '&goods_spec_id=' + goodsspecid + '&act_id=' + actid,
    })
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
  // banner
  banner: function () {
    var that = this
    var url = config.LOCALHOST + config.API.home_banner
    var data = {}
    request.get(url, data).then((res) => {
      that.setData({
        banner: res.data
      })
    })
  },
  // 倒计时
  nowTime: function () {//时间函数  
    var that = this
    var group_buying = that.data.group_buying
    if (group_buying){
      for (var i = 0; i < group_buying.length; i++) {
        var intDiff = group_buying[i].end_time - group_buying[i].now;  //获取数据中的时间戳  
        var day = 0, hour = 0, minute = 0, second = 0;
        if (intDiff >= 0) {//转换时间  
          // day = Math.floor(intDiff / (60 * 60 * 24));
          hour = Math.floor(intDiff / (60 * 60));
          minute = Math.floor(intDiff / 60) - (hour * 60);
          second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          group_buying[i].now++;

        } else {
          that.Goodsactivity()
          clearInterval(timer)

        }
        group_buying[i].hour = hour
        group_buying[i].minute = minute
        group_buying[i].second = second
      }
    }
    that.setData({
      group_buying: group_buying
    })
  },
  // 拼团商品
  Goodsactivity: function () {
    var that = this
    var url = config.LOCALHOST + config.API.Goodsactivity
    var data = {}
    request.get(url, data).then((res) => {
      var data = res.data;
      that.setData({
        group_buying: res.data
      })
    })
  },
  // 特价产品列表
  actSpecialGoods: function () {
    var that = this
    var limit = that.data.limit
    var url = config.LOCALHOST + config.API.activity_special_goods
    var data = {
      page: 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      that.setData({
        actSpecial: res.data
      })
    })
  },
  // 上拉加载
  SpecialUpRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var page = that.data.page
    var limit = that.data.limit
    var actSpecial = that.data.actSpecial
    var url = config.LOCALHOST + config.API.activity_special_goods
    var data = {
      page: page + 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      var data = actSpecial.concat(res.data);
      page++
      that.setData({
        actSpecial: data,
        page: page
      })
      wx.hideLoading()
    })
  }
})