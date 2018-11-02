// pages/detail/group_detail.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
var Login = require('../../common/js/Login.js')
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
    Hour: '00',
    Minute: '00',
    Second: '00',
    images: {},
    Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setData({
      act_id: options.act_id
    })
    this.group_info()
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
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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
  onShareAppMessage: function (res) {
   
  },
  //产品详情
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  groupMore: function(e){
    let act_id = e.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/group/groupMore?act_id=' + act_id,
    })
  },
  myGroup: function(){
    wx.navigateTo({
      url: '/pages/group/myGroup',
    })
  },
  // 加载详情
  group_info: function(){
    var that = this
    var url = config.LOCALHOST + config.API.group_activity_goods_info
    var data = {
      act_id: that.data.act_id
    }
    request.get(url, data).then((res) => {
      var data = res.data;
      that.setData({
        groupInfo: res.data
      })
      that.countdown(data.end_time,data.now)
    })
  },
  // 倒计时
  countdown: function (endtime,now) {
    var totalSecond = endtime - now

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      // 小时位  
      var hr = Math.floor(second/ 3600);
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
  // 一键拼团
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
  // 单独购买
  direct_groupbuy: function (e) {
    let that = this
    let user = wx.getStorageSync('user')
    let btnType = e.currentTarget.dataset.btntype
    let act_id = e.currentTarget.dataset.actid
    var is_only = that.data.groupInfo.is_only
    if (is_only == 1){
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
            var url = config.LOCALHOST + config.API.direct_groupbuy_create_order
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
    }
  },
  // 加入团购
  join_groupbuy: function(e){
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
  // 进入团详情
  myGroup_detail: function (e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/group/myGroup_detail?gid=' + gid,
    })
  },
})