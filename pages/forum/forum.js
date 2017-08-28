// pages/forum/forum.js
const common = require('../../common/common');
const banner = require('../../require/banner');
const logo = require('../../require/logo');
const app = getApp();
Page({
  data:{
    swiper:{
      "autoplay": true,
      "indicatorDots": true
    }
  },
  onLoad:function(options){
    var _this = this;
    const logoSrc = `${app.globalData.request}logo.php`;
    const bannerSrc = `${app.globalData.request}banner.php`;  //banner
    banner.fetchBanner.call(_this, bannerSrc, 2);
    logo.fetchLogo.call(_this, logoSrc);
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