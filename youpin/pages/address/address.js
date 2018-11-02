var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')


// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址列表渲染
    this_address_list:[],
    // 显示添加地址
    link_add:false,
    adHidden: true,
    provinceH: false,
    cityH: true,
    districtH: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      link_add: options.empty
    })
    this.address()
    this.region(1)
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

// 默认地址选择
  default_icon:function(e){
    var that = this;
    var data_d = e.currentTarget.dataset.def;
    var list = that.data.this_address_list
    var is_default = list[data_d].is_default
    var address_id = e.currentTarget.dataset.addressid
    for (let i = 0; i < list.length; i++){
      list[i].is_default = 0
    }
    list[data_d].is_default = !is_default
    that.setData({
      this_address_list: list
    })
    var url = config.LOCALHOST + config.API.address_setdefault
    var data = {
      address_id: address_id
    }
    request.get(url, data).then((res) => {
      if(res.code==1){
        // var carId = wx.getStorageSync('carID')
        // wx.redirectTo({
        //   url: '/pages/subOrder/subOrder?goods_id=' + carId.goods_id + '&goods_spec_id=' + carId.goods_spec_id + '&act_id=' + carId.act_id + '&goods_number=' + carId.goods_number + '&addressid=' + list[data_d].address_id,
        // })
        wx.setStorageSync("address_id", address_id)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 删除收货地址
  address_delete: function (e) {
    console.log(e)
    var that = this;
    var data_d = e.currentTarget.dataset.def;
    var list = that.data.this_address_list
    var url = config.LOCALHOST + config.API.address_delete
    var data = {
      address_id: e.currentTarget.dataset.addressid
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        that.address()
        that.setData({
          this_address_list: list
        });
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 编辑按钮
  address_update: function (e) {
    console.log(e)
    var that = this;
    var data_d = e.currentTarget.dataset.def;
    var list = that.data.this_address_list
    that.setData({
      consignee: list[data_d].consignee,
      mobile: list[data_d].mobile,
      address: list[data_d].address,
      addressID: list[data_d].address_id,
      link_add: true,
      province: list[data_d].province,
      city: list[data_d].city,
      district: list[data_d].district,
      province_id: list[data_d].province_id,
      city_id: list[data_d].city_id,
      district_id: list[data_d].district_id,
    })
  },
  
  // 显示添加地址模块
  add_address_link: function () {
    this.setData({
      consignee: null,
      mobile: null,
      address: null,
      addressID: null,
      link_add: true,
      province: '',
      city: '',
      district: '',
    })
  },
  // 隐藏添加地址模块
  hide_address_link: function () {
    this.setData({
      link_add: false
    })
  },

// 地址列表
  address: function(){
    var that = this
    var addressUrl = config.LOCALHOST + config.API.address
    var data = {
      type: that.data.currentTab
    }
    request.get(addressUrl, data).then((res) => {
      if (res.code == 1){ 
        that.setData({
          this_address_list: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  //获取省份
  region: function(id){
    var that = this
    var url = config.LOCALHOST + config.API.region
    var data = {
      region_id: id
    }
    request.get(url, data).then((res) => {
      if (res.code==1){
        that.setData({
          addrData: res.data
        })
      }else{
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  // 选择地址
  addressChange: function(e){
    this.setData({
      adHidden: false,
      province: '',
      city: '',
      district: '',
    })
    
  },
  // 隐藏收货地址
  addressChangeH: function(){
    this.setData({
      adHidden: true
    })
  },
  // 省
  province: function(e){
    var addrData = this.data.addrData
    var index = e.currentTarget.dataset.index
    var province = addrData[index].region_name
    var region_id = addrData[index].region_id
    this.setData({
      province: province,
      provinceH: true,
      cityH: false,
      districtH: true,
      province_id: region_id
    })
    this.region(region_id)
  },
  // 市
  city: function (e) {
    var addrData = this.data.addrData
    var index = e.currentTarget.dataset.index
    var city = addrData[index].region_name
    var region_id = addrData[index].region_id
    this.setData({
      city: city,
      provinceH: true,
      cityH: true,
      districtH: false,
      city_id: region_id
    })
    this.region(region_id)
  },
  // 区
  district: function (e) {
    var addrData = this.data.addrData
    var index = e.currentTarget.dataset.index
    var district = addrData[index].region_name
    var region_id = addrData[index].region_id
    this.setData({
      district: district,
      provinceH: false,
      cityH: true,
      districtH: true,
      adHidden: true,
      district_id: region_id
    })
    this.region(1)
  },
  // 收货人
  consignee: function(e){
    this.setData({
      consignee: e.detail.value
    })
  },
  // 联系方式
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 详细地址
  str_address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 添加、编辑收货地址
  addressAdd: function(e){
    wx.showLoading({
      title: '保存中...',
    })
    var that = this
    var address_id = e.currentTarget.dataset.addressid
    var province = e.currentTarget.dataset.provinceid
    var city = e.currentTarget.dataset.cityid
    var district = e.currentTarget.dataset.districtid
    var consignee = that.data.consignee
    var mobile = that.data.mobile
    var address = that.data.address
    var url
    var data = {
      address_id: address_id,
      province: province,
      city: city,
      district: district,
      consignee: consignee,
      mobile: mobile,
      address: address,
    }
    if (address_id){
      url = config.LOCALHOST + config.API.address_update
    }else{
      url = config.LOCALHOST + config.API.address_add
    }
    request.get(url, data).then((res) => {
      if (res.code == 1){
        that.setData({
          consignee: null,
          mobile: null,
          address: null,
          addressID: null,
          link_add: true,
          province: '',
          city: '',
          district: '',
          link_add: false
        })
        that.address()
      }
      wx.hideLoading()
    })
  },

});


