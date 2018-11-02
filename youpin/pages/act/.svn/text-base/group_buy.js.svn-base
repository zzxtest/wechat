// pages/act/group_buy.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
var Login = require('../../common/js/Login.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 8,
    group_list: [],
    Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.group_buy_list()
    var timer = setInterval(this.nowTime, 1000)
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
    setTimeout(function(){
      wx.hideLoading()
    },2000)
    Login.Login()
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
    this.group_buy_list()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.UpRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 倒计时
  nowTime: function () {//时间函数  
    var that = this
    var group_list = that.data.group_list
    for (var i = 0; i < group_list.length; i++) {
      var intDiff = group_list[i].end_time - group_list[i].now;  //获取数据中的时间戳  
      var day = 0, hour = 0, minute = 0, second = 0;
      if (intDiff >= 0) {//转换时间  
        // day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60));
        minute = Math.floor(intDiff / 60) - (hour * 60);
        second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        group_list[i].now++;
      } else {
        that.group_buy_list()
        clearInterval(timer);
      }
      group_list[i].hour = hour
      group_list[i].minute = minute
      group_list[i].second = second
    }
    that.setData({
      group_list: group_list
    })
  },
  // 拼团列表
  group_buy_list: function () {
    var that = this
    var limit = that.data.limit
    var url = config.LOCALHOST + config.API.list_goods_activity
    var data = {
      page: 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      that.setData({
        group_list: res.data
      })
    })
  },
  // 上拉加载
  UpRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var page = that.data.page
    var limit = that.data.limit
    var group_list = that.data.group_list
    var url = config.LOCALHOST + config.API.list_goods_activity
    var data = {
      page: page + 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      var data = group_list.concat(res.data);
      page++
      that.setData({
        group_list: data,
        page: page
      })
      wx.hideLoading()
    })
  },
  groupDetail: function (e) {
    let act_id = e.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/detail/group_detail?act_id=' + act_id,
    })
  },
  subOrder: function (e) {
    let that = this
    let user = wx.getStorageSync('user')
    let btnType = e.currentTarget.dataset.btntype
    let act_id = e.currentTarget.dataset.actid
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
                    // wx.switchTab({
                    //   url: '/pages/index/index',
                    // })
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
          var url = config.LOCALHOST + config.API.groupbuy_create_order
          var data = {
            act_id: act_id
          }
          request.get(url, data).then((res) => {
            if (res.code == 1) {
              wx.navigateTo({
                url: '/pages/subOrder/subOrder?btnType=' + btnType + '&act_id=' + act_id,
              })
            }
          })
        }
      }
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
})