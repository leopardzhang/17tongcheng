// pages/board/board.js
const common = require('../../common/common');
const banner = require('../../require/banner');
const app = getApp();

const bannerSrc = `${app.globalData.request}banner.php`;  //banner

Page({
  data:{
    swiper:{          //banner选项
      "autoplay": true,
      "indicatorDots": true
    },
    board: {},
    repeatList: [],
    inputValue: '',   //文本框的内容
    cid: '',
    bottom: '',
    repeatFor: '',
    focusVal: false
  },
  onLoad:function(options){
    let openId = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    var _this = this;
    //设置logo
    let logoUrl = wx.getStorageSync('logo');
    _this.setData({
      logoSrc: logoUrl,
      options: options
    });
    //设置分类
    _this.setData({
      cid: options.id
    });
    //设置banner
    banner.fetchBanner.call(_this, bannerSrc, 2);
    wx.request({
      url: `${app.globalData.request}newsshow.php`,
      data: {types:'show',id: options.id, openid: openId, nickname: nickname},
      method: 'GET',
      success: function(res){
        _this.setData({
          board: res.data.show,
          repeatList: res.data.list
        })
      },
      fail: function(res) {
        common.showModal();
      },
      complete: function(res) {
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
	viewSearch: common.viewSearch,
  getVal: function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  send: function(){
    var _this = this;
    let openId = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    if(_this.data.inputValue.length > 0){
      wx.request({
        url: `${app.globalData.request}pinglun.php`,
        data: {types: 'ping', body: _this.data.inputValue, aid: _this.data.cid, openid: openId, nickname: nickname},
        method: 'GET',
        header: {
          "Content-Type": "application/json,application/json"
        },
        success: function(res){
          wx.request({
            url: `${app.globalData.request}newsshow.php`,
            data: {types:'show',id: _this.data.options.id, openid: openId, nickname: nickname},
            method: 'GET',
            success: function(res){
              _this.setData({
                board: res.data.show,
                repeatList: res.data.list
              })
            },
            fail: function(res) {
              common.showModal('留言失败', '请检查网络状态');
            },
            complete: function(res) {
              // complete
            }
          })
        },
        fail: function(res) {
          common.showModal('留言失败', '请检查网络状态');
        },
        complete: function(res) {
          _this.setData({
            inputValue: '',
            bottom: 'bottom',
            repeatFor: '',
            focusVal: false
          })
        }
      })
    }else{
      common.showModal('回复失败!1', '内容不能为空');
    }
  },
  repeat: function (e){
    var _this = this;
    _this.setData({
      repeatFor: e.currentTarget.dataset.cid,
      focusVal: true
    })
  },
  repeatSend: function(e){
    var _this = this;
    let openId = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    if(_this.data.inputValue.length > 0){
      wx.request({
        url: `${app.globalData.request}pinglun.php?types=huifu`,
        data: {pid_hf: _this.data.repeatFor, body: _this.data.inputValue, aid: _this.data.cid, openid: openId, nickname: nickname},
        method: 'GET',
        success: function(res){
          wx.request({
            url: `${app.globalData.request}newsshow.php`,
            data: {types:'show',id: _this.data.options.id, openid: openId, nickname: nickname},
            method: 'GET',
            success: function(res){
              _this.setData({
                board: res.data.show,
                repeatList: res.data.list
              });
              wx.showToast({
                title: '回复成功',
                icon: 'success',
                duration: 1000
              })
            },
            fail: function(res) {
              common.showModal('留言失败', '请检查网络状态');
            },
            complete: function(res) {
              // complete
            }
          });
        },
        fail: function(res) {
          common.showModal('留言失败', '请检查网络状态');
        },
        complete: function(res) {
          _this.setData({
            inputValue: '',
            bottom: 'bottom',
            repeatFor: '',
            focusVal: false
          })
        }
      })
    } else{
      common.showModal('回复失败!2', '内容不能为空');
    }
  }
})