// pages/group/myGroup_refund.js
var config = require('../../common/js/config.js')
var request = require('../../common/js/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    refund_reason: ['请选择退款原因?'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
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
    this.Usergroupbuy_refund()
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
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 退款原因
  Usergroupbuy_refund: function(){
    var that = this
    var order_id = that.data.order_id
    var url = config.LOCALHOST + config.API.Usergroupbuy_refund
    var data = {
      order_id: order_id
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        that.setData({
          refund_reason: res.data.refund_reason
        })
      }
    })
  },
  // 提交退款
  submit_refund: function(){
    var that = this
    var refund_reason = that.data.refund_reason
    var index = that.data.index
    var order_id = that.data.order_id
    var url = config.LOCALHOST + config.API.refunds_money
    var data = {
      order_id: order_id,
      refund_reason: refund_reason[index]
    }
    request.get(url, data).then((res) => {
      if (res.code == 1) {
        wx.showModal({
          title: '温馨提示',
          content: '申请成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/group/myGroup',
              })
            }
          }
        })
        
      }
    })
  }
})