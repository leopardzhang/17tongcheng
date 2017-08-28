// pages/contact/contact.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    message: '',
    tel: ''
  },
  onLoad:function(options){
    var _this = this;
    wx.request({
      url: `${app.globalData.request}about.php`,
      data: {},
      method: 'GET',
      success: function(res){
        _this.setData({
          message: res.data.content,
          tel: res.data.yjtel
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  makePhoneCall: function(){
    var _this = this;
    wx.makePhoneCall({
      phoneNumber: `${_this.data.tel}`
    })
  }
})