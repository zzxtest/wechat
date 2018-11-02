// pages/act/zeroBuy.js
var util = require('../../utils/util.js')
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Day: '00',
    Hour: '00',
    Minute: '00',
    Second: '00',
    page: 1,
    limit: 8,
    goodsData: [], 
    popHidden: true,
    now: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.act_nomoney()
    
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
    wx.hideLoading()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight + "px"
        })
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
    this.act_nomoney()
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
  // 倒计时
  countdown: function () {
    var time = this.data.timeout
    // var totalSecond = Date.parse(new Date(2018, 4 - 1, 6, 12, 24, 0)) / 1000 - Date.parse(new Date()) / 1000;
    var startSecond = time.start_time - time.now
    var endSecond = time.end_time - time.now
    var totalSecond = startSecond
    
    this.setData({
      startSecond: startSecond
    })
    if (startSecond <= 0){
      totalSecond = endSecond
    }
    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        Day: dayStr,
        Hour: hrStr,
        Minute: minStr,
        Second: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          Day: '00',
          Hour: '00',
          Minute: '00',
          Second: '00',
        });  
      }
      startSecond--
      if (startSecond==0){
        this.act_nomoney()
        clearInterval(interval);
        this.setData({
          Day: '00',
          Hour: '00',
          Minute: '00',
          Second: '00',
        });
        
      }
      endSecond-- 
      if (endSecond < 0) {
        clearInterval(interval);
        this.setData({
          Day: '00',
          Hour: '00',
          Minute: '00',
          Second: '00',
          popHidden: false,
        });
      }
      
    }.bind(this), 1000);
  },
  // 零元购
  act_nomoney: function(){
    var that = this
    var limit = that.data.limit
    var url = config.LOCALHOST + config.API.act_nomoney_buy
    var data = {
      page: 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      if(res.code == 1){
        var timeout = res.data.timeout
        if (!timeout){
          that.setData({
            popHidden: false,

          })
        }else{
          that.setData({
            actData: res.data,
            goodsData: res.data.goods,
            timeout: timeout
          })
          that.countdown()
        }
        
      }
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
    var goodsData = that.data.goodsData
    var url = config.LOCALHOST + config.API.act_nomoney_buy
    var data = {
      page: page + 1,
      limit: limit
    }
    request.get(url, data).then((res) => {
      var data = goodsData.concat(res.data.goods);
      page++
      that.setData({
        goodsData: data,
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
  // 隐藏弹出
  popHidden: function(){
    this.setData({
      popHidden: true,
    });
  }
})