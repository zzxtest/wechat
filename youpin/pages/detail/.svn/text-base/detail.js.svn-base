// pages/detail/detail.js
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
    images: {},
    num: 1,
    Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      opt: options
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
    this.detailLoad()
    wx.hideLoading()
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
  // icon 小图标
  iconLoad: function(e){
    var $width = e.detail.width,  //获取图片真实宽度
        $height = e.detail.height,
        ratio = $width / $height;    //图片的真实宽高比例
    var viewHeight = 36,           //设置图片显示宽度，左右留有16rpx边距
        viewWidth = 36 * ratio;    //计算的高度值
    var image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      image: image
    })
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
  detailLoad: function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = config.LOCALHOST + config.API.goods_detail
    var data = {
      goods_id: that.data.opt.goods_id,
      goods_spec_id: that.data.opt.goods_spec_id,
      act_id: that.data.opt.act_id
    }
    request.get(url, data).then((res) => {
      that.setData({
        prodDetail: res.data
      })
      wx.hideLoading()
    })
  },
  // 加
  add: function(e){
    var goodsnum = e.currentTarget.dataset.goodsnum
    var num = this.data.num;
    if (num < goodsnum){
      num++
      this.setData({
        num: num
      })
    }
  },
  //减
  reduce: function (e) {
    var num = this.data.num;
    if (num>1){
      num--
      this.setData({
        num: num
      })
    }
  },
  // 改变数量
  numChange: function (e) {
    var goodsnum = e.currentTarget.dataset.goodsnum
    var value = e.detail.value
    var c_num = value - goodsnum
    if (c_num>0) {
      this.setData({
        num: goodsnum
      })
      wx.showToast({
        title: '超出限购数量',
        duration: 2000,
        mask: true,
      })
    } else if (value == 0 || value==''){
      this.setData({
        num: 1
      })
    }
  },
  // 立即购买
  subOrder: function(){
    var that = this
    var user = wx.getStorageSync('user')
    var goods_id = that.data.opt.goods_id,
      goods_spec_id = that.data.opt.goods_spec_id,
      act_id = that.data.opt.act_id,
      goods_number = that.data.num
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
        } else if (!user.user_id){
          that.setData({
            Hidden: false
          })
                 
        }else{
          var url = config.LOCALHOST + config.API.order_fast_create
          var data = {
            goods_id: goods_id,
            goods_spec_id: goods_spec_id,
            goods_number: goods_number,
            act_id: act_id
          }
          request.get(url, data).then((res) => {
            if(res.code==1){
              wx.navigateTo({
                url: '/pages/subOrder/subOrder?goods_id=' + goods_id + '&goods_spec_id=' + goods_spec_id + '&act_id=' + act_id + '&goods_number=' + goods_number,
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