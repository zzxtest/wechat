// pages/group/groupMore.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
var Login = require('../../common/js/Login.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      act_id: options.act_id
    })
    this.group_info_list()
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  group_info_list: function(){
    var that = this
    var url = config.LOCALHOST + config.API.group_dynamic_info_list
    var data = {
      act_id: that.data.act_id
    }
    request.get(url, data).then((res) => {
      var data = res.data;
      that.setData({
        groupList: res.data
      })
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
  // 进入团详情
  myGroup_detail: function (e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/group/myGroup_detail?gid=' + gid,
    })
  },
})