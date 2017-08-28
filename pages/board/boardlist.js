// pages/board/boardlist.js
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
    boardList: [],
    page: 1,          //页码
    still: true,      //是否还有更多信息
    loading: false,   //是否正在加载
    have: false       //是否有数据
  },
  onLoad: function (options) {
    let openid = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    wx.request({
      url: `${app.globalData.request}news.php`,
      data: { openid, nickname },
      method: 'GET',
    })
    var _this = this;
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
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var _this = this;
    wx.request({
      url: `${app.globalData.request}news.php`,
      data: {types: 'list', page: _this.data.page},
      method: 'GET',
      success: function(res){
        _this.setData({
          boardList: res.data,
          have: true
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
  onHide:function(){
    this.setData({
      page: 1
    })
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onReachBottom:function(e){
    var _this = this;
    _this.setData({
      page: _this.data.page+1
    });
    if(_this.data.still){
      _this.setData({
        loading: true
      });
      wx.request({
        url: `${app.globalData.request}news.php`,
        data: {types: 'list', page: _this.data.page},
        method: 'GET',
        success: function(res){
          if(res.data.pagezt != 0){
            let tream = _this.data.boardList.concat(res.data);
            _this.setData({
              boardList: tream,
              loading: false
            })
          } else{
            _this.setData({
              still: false,
              loading: false
            })
          }
        }
      })
    }
  },
	viewSearch: common.viewSearch,
  navToPost: function(){
    wx.navigateTo({
      url: 'post'
    })
  }
})