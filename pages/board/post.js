// pages/board/post.js
const common = require('../../common/common');
const app = getApp();

Page({
  data:{
    titleValue: '',
    textValue: '',
    openid: '',
    nickname: ''
  },
  onLoad:function(options){
    let openId = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    this.setData({
      openid: openId,
      nickname: nickname
    })
  },
  setTitle: function(e){
    this.setData({
      titleValue: e.detail.value
    })
  },
  setText: function(e){
    this.setData({
      textValue: e.detail.value
    })
  },
  send: function(){
    var _this = this;
    if(_this.data.titleValue.length >= 5 && _this.data.textValue.length >= 10){
      wx.request({
        url: `${app.globalData.request}pinglun.php?types=pingsever`,
        data: {title: this.data.titleValue, content: this.data.textValue, openid: _this.data.openid, nickname: _this.data.nickname},
        method: 'GET',
        header: {"Content-Type": "application/json,application/json"},
        success: function(res){
          wx.showToast({
            title: '发布成功，等待管理员审核',
            icon: 'success',
            duration: 3000
          })
        },
        fail: function(res) {
          common.showModal();
        },
        complete: function(res) {
          _this.setData({
            titleValue: '',
            textValue: ''
          });
          setTimeout(()=>{
              wx.switchTab({
                  url: '/pages/board/boardlist'
              });
          }, 3000);
        }
      })
    } else{
      common.showModal('发布失败!', '标题不能少于5个字，内容不能少于20个字');
    }
  }
});