// pages/note/youhui.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    youhuiList: []
  },
  onLoad:function(options){
    var _this = this;
    let openid = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    wx.request({
      url: `${app.globalData.request}youhui.php`,
      data: {openid, nickname},
      method: 'GET',
      success: function(res){
        console.log(res.data);
        _this.setData({
          youhuiList: res.data
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
  }
})