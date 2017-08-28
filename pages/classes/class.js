// pages/classes/class.js
const common = require('../../common/common');
const banner = require('../../require/banner');
const getDate = require('../../common/util');
const app = getApp();
const bannerSrc = `${app.globalData.request}banner.php`;  //banner
Page({
  data:{
    logoSrc: '',
    bannerUrlList: [],//banner列表
    swiper:{          //banner选项
      "autoplay": true,
      "indicatorDots": true
    },
    information: {},
    timer: '',
    imgList: ''
  },
  onLoad:function(options){
    var _this = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    //设置logo
    let logoUrl = wx.getStorageSync('logo');
    _this.setData({
      logoSrc: logoUrl
    });
    //设置分类
    _this.setData({
      cid: options.id
    });
    //设置banner
    banner.fetchBanner.call(_this, bannerSrc, 2);
    wx.request({
      url: `${app.globalData.request}pro.php`,
      data: {types: 'show', id: options.id},
      method: 'GET',
      success: function(res){
        console.log(res.data);
        var timer = getDate.formatTime(res.data.timer*1000);
        console.log(res.data)
        _this.setData({
          information: res.data,
          timer: timer
        });
        console.log(res.data);
      },
      fail: function(res) {
        common.showModal('获取信息失败');
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
  previewImage: function (e) {
    var imgList = [];
    for(var i in this.data.information.piclist){
      imgList.push(this.data.information.piclist[i].picurl);
    }
    console.log(imgList)
    this.setData({
      imgList
    })
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: imgList
    })
  },
  makePhoneCall: function(e){
    let num = e.target.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: num,
      success: function(res) {
        // success
      }
    })
  },
	viewSearch: common.viewSearch
})