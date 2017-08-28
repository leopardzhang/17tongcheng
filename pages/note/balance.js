// pages/note/balance.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    yue: ''
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: "交易记录"
    });
    let openid = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    var _this = this;
    wx.request({
      url: `${app.globalData.request}yu.php`,
      data: {openid, nickname},
      method: 'GET',
      success: function(res){
        console.log(res);
        _this.setData({
          yue: res.data
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
  goToPay: function(){
    wx.navigateTo({
      url: 'pay'
    })
  }
})