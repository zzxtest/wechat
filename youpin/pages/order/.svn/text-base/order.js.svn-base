// pages/order/order.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    viewTab: 0,
    key: [
      { no: 0, data: '' },
      { no: 1, data: '' },
      { no: 3, data: '' },
      { no: 5, data: '' }
    ],
    listData:[],
    page:1,
    limit:8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
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
            var loginUrl = config.LOCALHOST + config.API.xcx_onlogin
            var data = {
              code: loginData.code
            }
            request.get(loginUrl, data).then((loginResp) => {
              var data = loginResp.data
              wx.setStorageSync('open_id', data.open_id)

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
    this.setData({
      page: 1
    })
    this.orderList()
    wx.hideLoading()
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
    this.orderList()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.orderUpRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
   
  },

  /**
   * swiper头点击切换
   */
  switchNav: function (e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index,
      page:1
    })
    this.orderList()
  },
  // 点击事件
  clcikShow: function(){
    wx.showToast({
      title: '更多操作，请下载淘宠优品APP',
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
  // 去支付
  payBtn: function(e){
    var orderid = e.currentTarget.dataset.orderid
    var that = this
    var url = config.LOCALHOST + config.API.orderpay_wxpay
    var data = {
      order_id: orderid
    }
    request.get(url, data).then((payRes) => {
      if (payRes.code == 1) {
        var data = payRes.data
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'success': function (res) {
            wx.switchTab({
              url: '/pages/order/order',
            })
          },
          'fail': function (res) {
            
          }
        })
      }
    })
  },
  // 订单列表数据
  orderList: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var orderUrl = config.LOCALHOST + config.API.order
    var page = that.data.page
    var data = {
      type: that.data.currentTab,
      page: page,
      limit: that.data.limit
    }
    request.get(orderUrl,data).then((res) => {
      if (res.code == 1){
        that.setData({
          listData: res.data,
          page: page
        })
      }
      wx.hideLoading()
    })

  },
  orderUpRefresh: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var orderUrl = config.LOCALHOST + config.API.order
    var page = that.data.page
    var listData = that.data.listData
    var data = {
      type: that.data.currentTab,
      page: page+1,
      limit: that.data.limit
    }
    request.get(orderUrl, data).then((res) => {
      var data = listData.concat(res.data);
      page++
      that.setData({
        listData: data,
        page: page
      })
      wx.hideLoading()
    })
  }
})