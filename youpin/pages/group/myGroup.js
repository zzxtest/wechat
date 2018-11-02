// pages/group/myGroup.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
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
      { no: 2, data: '' },
      { no: 3, data: '' }
    ],
    listData: [],
    page: 1,
    limit: 8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.setData({
      page: 1
    })
    this.Usergroupbuy()
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
    this.Usergroupbuy()
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
  onShareAppMessage: function (res) {
    console.log(res)
    var gid = res.target.dataset.gid
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '拼团详情',
        path: '/pages/group/myGroup_detail?gid=' + gid,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
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
  /**
   * swiper头点击切换
   */
  switchNav: function (e) {
    var index = e.currentTarget.dataset.current;
    this.setData({
      currentTab: index,
      page: 1
    })
    this.Usergroupbuy()
  },
  // 团列表
  Usergroupbuy: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = config.LOCALHOST + config.API.Usergroupbuy
    var page = that.data.page
    var data = {
      type: that.data.currentTab,
      page: page,
      limit: that.data.limit
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        that.setData({
          listData: res.data,
          page: page
        })
      }
      wx.hideLoading()
    })
  },
  // 进入团详情
  myGroup_detail: function(e){
    var gid = e.currentTarget.dataset.gid 
    wx.navigateTo({
      url: '/pages/group/myGroup_detail?gid=' + gid,
    })
  },
  // 上拉加载
  UpRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = config.LOCALHOST + config.API.Usergroupbuy
    var page = that.data.page
    var listData = that.data.listData
    var data = {
      type: that.data.currentTab,
      page: page + 1,
      limit: that.data.limit
    }
    request.get(url, data).then((res) => {
      var data = listData.concat(res.data);
      page++
      that.setData({
        listData: data,
        page: page
      })
      wx.hideLoading()
    })
  },
  refund_button: function(e){
    let order_id = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/group/myGroup_refund?order_id=' + order_id,
    })
  },
})