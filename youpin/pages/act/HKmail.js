// pages/act/HKmail.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 8,
    HKgoods: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.actHK()
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
    this.actHK()
    wx.stopPullDownRefresh();
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
  // 香港直邮列表
  actHK: function () {
    var that = this
    var limit = that.data.limit
    var url = config.LOCALHOST + config.API.act_direct_mail
    var data = {
      page: 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      that.setData({
        actHK: res.data,
        HKgoods: res.data.goods
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
    var HKgoods = that.data.HKgoods
    var url = config.LOCALHOST + config.API.act_direct_mail
    var data = {
      page: page + 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      var data = HKgoods.concat(res.data.goods);
      page++
      that.setData({
        HKgoods: data,
        page: page
      })
      wx.hideLoading()
    })
  },
  // 进入详情
  detail: function (e) {
    var actid = e.currentTarget.dataset.actid,
      goodsid = e.currentTarget.dataset.goodsid,
      goodsspecid = e.currentTarget.dataset.goodsspecid
    wx.navigateTo({
      url: '/pages/detail/detail?goods_id=' + goodsid + '&goods_spec_id=' + goodsspecid + '&act_id=' + actid,
    })
  },
})