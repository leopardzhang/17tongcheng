//获取应用实例
const common = require('../../common/common');
const banner = require('../../require/banner');
const nav = require('../../require/nav');
const app = getApp();

const bannerSrc = `${app.globalData.request}banner.php`;  //banner
const navSrc = `${app.globalData.request}index.php`;      //nav
// pages/index/index.js
Page({
  data:{
    logoSrc: '',
    avatarUrl: '',//头像
    nickName: '',//微信昵称
    openid: '',//openid
    timer: '',//expires_in
    swiper:{
      "autoplay": true,
      "indicatorDots": true
    },
    bannerUrlList: [],
    navList: [],
    classList: []
  },
  onLoad:function(options){
    var _this = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    let logoUrl = wx.getStorageSync('logo');
    _this.setData({
      logoSrc: logoUrl
    });
    banner.fetchBanner.call(_this, bannerSrc, 1);
    nav.fetchNav.call(_this, navSrc);
    wx.request({
      url: `${app.globalData.request}index.php`,
      data: {types: 'type'},
      method: 'GET',
      success: function(res){
        //console.log(res.data);
        _this.setData({
          classList: res.data
        });
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
  onPullDownRefresh: function(){
    
  },
	viewSearch: common.viewSearch
})