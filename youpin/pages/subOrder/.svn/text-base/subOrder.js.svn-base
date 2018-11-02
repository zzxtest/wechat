// pages/subOrder/subOrder.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    images: {},
    addressid: null,
    empty: true,
    payHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      goods_id: options.goods_id,
      goods_spec_id: options.goods_spec_id,
      act_id: options.act_id,
      goods_number: options.goods_number,
      addressid: options.addressid,
      btnType: options.btnType,
      gid: options.gid
    })
    wx.setStorageSync('carID', options)
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
    wx.hideLoading()
    let btnType = this.data.btnType
    let act_id = this.data.act_id
    var payHidden = this.data.payHidden
    if (payHidden){
      if (btnType == 0) {
        this.direct_groupbuy()
      } else if (btnType == 1) {
        this.groupbuyCreate()
      } else if (btnType == 2) {
        this.join_groupbuy()
      } else {
        this.fastCreate()
      }
    }
    
    
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


  // icon 小图标
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewHeight = 32,           //设置图片显示宽度
      viewWidth = 32 * ratio;    //计算的高度值
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
  // 显示保存，输入身份证
  showIDcard: function(){
    this.setData({
      hidden: false
    })

  },
  // 输入身份证
  IDcardInput: function(e){
    var id_card = e.detail.value
    this.setData({
      id_card: id_card
    })
  },
  // 保存身份证
  saveIDcard: function(){
    var that = this
    var url = config.LOCALHOST + config.API.bind_idcard
    var data = {
      address_id: that.data.addressid,
      id_card: that.data.id_card
    }
    request.get(url, data).then((res) => {
      if (res.code==1){
        that.setData({
          hidden: true
        })
      }
    })
    
  },
  // 检测订单
  fastCreate: function(sID){
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var addressid = wx.getStorageSync('address_id') || that.data.addressid
    var carId = wx.getStorageSync('carID')
    var url = config.LOCALHOST + config.API.order_fast_create
    var data = {
      goods_id: that.data.goods_id,
      goods_spec_id: that.data.goods_spec_id,
      goods_number: that.data.goods_number,
      act_id: that.data.act_id,
      address_id: addressid,
      shipping_id:sID
    }
    request.get(url, data).then((res) => {
      var orderData = res.data,
        goods_amount = orderData.goods_amount,
        shipping_fee = orderData.shipping_fee,
        shipping_name = orderData.shipping.shipping_name,
        orderprice = (Number(goods_amount) + Number(shipping_fee)).toFixed(2)
      that.setData({
        orderData: orderData,
        goods_amount: goods_amount,
        shipping_fee: shipping_fee,
        shipping_name: shipping_name,
        addressid: orderData.address.address_id,
        shipping_id: orderData.shipping.shipping_id,
        orderprice: orderprice,
        id_card: orderData.address.id_card,
        storage_id: orderData.storage_id
      })
      that.getShippings()
      if (res.code == -220){
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
      wx.hideLoading()
    })
  },
  // 检测团购
  groupbuyCreate: function (sID){
    var that = this
    var addressid = wx.getStorageSync('address_id') || that.data.addressid
    var url = config.LOCALHOST + config.API.groupbuy_create_order
    var data = {
      act_id: that.data.act_id,
      address_id: addressid,
      shipping_id: sID
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        var orderData = res.data,
          goods_amount = orderData.goods_amount,
          shipping_fee = orderData.shipping_fee,
          shipping_name = orderData.shipping.shipping_name,
          orderprice = (Number(goods_amount) + Number(shipping_fee)).toFixed(2)
        that.setData({
          orderData: orderData,
          goods_amount: goods_amount,
          shipping_fee: shipping_fee,
          shipping_name: shipping_name,
          orderprice: orderprice,
          addressid: orderData.address.address_id,
          shipping_id: orderData.shipping.shipping_id,
          storage_id: orderData.storage_id,
          id_card: orderData.address.id_card,
          gid: orderData.gid,
          groupbuy_type: orderData.groupbuy_type
        })
        that.getShippings()
      }
    })
  },
  // 检测单独购买
  direct_groupbuy: function (sID) {
    var that = this
    var addressid = wx.getStorageSync('address_id') || that.data.addressid
    var url = config.LOCALHOST + config.API.direct_groupbuy_create_order
    var data = {
      act_id: that.data.act_id,
      address_id: addressid,
      shipping_id: sID
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        var orderData = res.data,
          goods_amount = orderData.goods_amount,
          shipping_fee = orderData.shipping_fee,
          shipping_name = orderData.shipping.shipping_name,
          orderprice = (Number(goods_amount) + Number(shipping_fee)).toFixed(2)
        that.setData({
          orderData: orderData,
          goods_amount: goods_amount,
          shipping_fee: shipping_fee,
          shipping_name: shipping_name,
          orderprice: orderprice,
          addressid: orderData.address.address_id,
          storage_id: orderData.storage_id,
          shipping_id: orderData.shipping.shipping_id,
          id_card: orderData.address.id_card,
          gid: orderData.gid,
          groupbuy_type: orderData.groupbuy_type
        })
        that.getShippings()
      }
    })
  },
  // 检测加入团购
  join_groupbuy: function (sID) {
    var that = this
    var addressid = wx.getStorageSync('address_id') || that.data.addressid
    var url = config.LOCALHOST + config.API.join_groupbuy_create_order
    var data = {
      act_id: that.data.act_id,
      gid: that.data.gid,
      address_id: addressid,
      shipping_id: sID
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        var orderData = res.data,
          goods_amount = orderData.goods_amount,
          shipping_fee = orderData.shipping_fee,
          shipping_name = orderData.shipping.shipping_name,
          orderprice = (Number(goods_amount) + Number(shipping_fee)).toFixed(2)
        that.setData({
          orderData: orderData,
          goods_amount: goods_amount,
          shipping_fee: shipping_fee,
          shipping_name: shipping_name,
          orderprice: orderprice,
          storage_id: orderData.storage_id,
          addressid: orderData.address.address_id,
          shipping_id: orderData.shipping.shipping_id,
          id_card: orderData.address.id_card,
          gid: orderData.gid,
          groupbuy_type: orderData.groupbuy_type
        })
        that.getShippings()
      }
    })
  },
  // 加载配送方式
  getShippings: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var url = config.LOCALHOST + config.API.shipping_get_shippings
    var data = {
      storage_id: that.data.storage_id
    }
    request.get(url, data).then((res) => {
      that.setData({
        shipping: res.data
      })
      wx.hideLoading()
    })
  },
  // 选择地址
  addressChange: function(e){
    var empty = e.currentTarget.dataset.empty
    if (empty == true){
      wx.navigateTo({
        url: '/pages/address/address?empty=' + empty,
      })
    }else{
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
    
  },
  // 选择物流
  shoppingChange: function (e) {
    var index = e.detail.value
    var shipping = this.data.shipping
    var shipping_name = shipping[index].shipping_name
    var shipping_id = shipping[index].shipping_id
    var btnType = this.data.btnType
    this.setData({
      shipping_name: shipping_name,
      shipping_id: shipping_id
    })
    if (btnType == 0){
      this.direct_groupbuy(shipping_id)
    }else if (btnType == 1){
      this.groupbuyCreate(shipping_id)
    } else if (btnType == 2) {
      this.join_groupbuy(shipping_id)
    }else{
      this.fastCreate(shipping_id)
    }  
  },
  // 微信支付按钮
  pay_btn: function(){
    var groupbuy_type = this.data.groupbuy_type
    if (groupbuy_type){
      this.submit_groupbuy()
    }else{
      this.fast_sumbit()
    }
  },
  // 提交订单
  fast_sumbit: function(e){
    var that = this
    var url = config.LOCALHOST + config.API.order_fast_submit
    var data = {
      goods_id: that.data.goods_id,
      goods_spec_id: that.data.goods_spec_id,
      act_id: that.data.act_id,
      goods_number: that.data.goods_number,
      shipping_id: that.data.shipping_id,
      address_id: that.data.addressid
    }
    request.get(url, data).then((res) => {
      if(res.code == 1){
        var order_id = res.data.order_id
        var orderprice = that.data.orderprice
        if (orderprice == "0.00"){
          wx.showToast({
            title: '提交成功',
            success: function () {
              wx.switchTab({
                url: '/pages/order/order',
              })
              // wx.removeStorageSync('carID')
            }
          })
        }else{
          that.wxpay(order_id)
        }
        wx.removeStorageSync('carID')
        wx.removeStorageSync('address_id')
        
      }
    })
  },
  // 团购提交
  submit_groupbuy: function(){
    var that = this
    var url = config.LOCALHOST + config.API.submit_groupbuy_activity
    var data = {
      groupbuy_type: that.data.groupbuy_type,
      act_id: that.data.act_id,
      gid: that.data.gid,
      shipping_id: that.data.shipping_id,
      address_id: that.data.addressid
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        var order_id = res.data.order_id
        that.wxpay(order_id)
        wx.removeStorageSync('carID')
        wx.removeStorageSync('address_id')

      }
    })
  },
  // 支付
  wxpay: function(ID){
    var that = this
    var groupbuy_type = that.data.groupbuy_type
    var url = config.LOCALHOST + config.API.orderpay_wxpay
    if (groupbuy_type){
      var data = {
        order_id: ID,
        groupbuy_type: groupbuy_type,
        gid: that.data.gid
      }
    }else{
      var data = {
        order_id: ID
      }
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
            that.setData({
              payHidden: false
            })
            if (groupbuy_type == 2 || groupbuy_type == 3) {
              wx.redirectTo({
                url: '/pages/group/myGroup',
              })
            }else {
              wx.switchTab({
                url: '/pages/order/order',
              })
            }
            
          },
          'fail': function (res) {
            if (!groupbuy_type || groupbuy_type == 1) {
              that.setData({
                payHidden: false
              })
              wx.switchTab({
                url: '/pages/order/order',
              })
            }
            
          }
        })
      }
    })
  }
})