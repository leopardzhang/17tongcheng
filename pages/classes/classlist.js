// pages/classes/class.js
const common = require('../../common/common');
const banner = require('../../require/banner');
const news = require('../../require/news');
const app = getApp();

const bannerSrc = `${app.globalData.request}banner.php`;  //banner
const newsSrc = `${app.globalData.request}pro.php`;       //新闻列表
Page({
  data:{
    areaHidden: true, //地区是否隐藏
    itemsHidden: true,//项目是否隐藏
    bannerUrlList: [],//banner列表
    page: 1,          //页码
    cid: 0,           //分类id
    quyu: 1,          //区域的id
    xmin: 0,          //筛选项目
    swiper:{          //banner选项
      "autoplay": true,
      "indicatorDots": true
    },
    newsList: [],     //新闻列表
    areaList:[],      //区域列表
    itemList:[],      //项目列表
    still: true,      //是否还有更多信息
    loading: false,   //是否正在加载
    have: false       //是否有数据
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: options.pageName
    });
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
    banner.fetchBanner.call(_this, bannerSrc, options.id);
    //获取&设置新闻列表
    news.fetchNews.call(_this, newsSrc, 'list', _this.data.page, _this.data.cid, _this.data.quyu, _this.data.xmid, options.key);
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
        url: newsSrc,
        data: {types: 'list', page: _this.data.page, cid:_this.data.cid, quyu:_this.data.quyu, xmid:_this.data.xmid},
        method: 'GET',
        success: function(res){
          if(res.data.pagezt != 0){
            let tream = _this.data.newsList.concat(res.data);
            _this.setData({
              newsList: tream,
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
  switchArea: function(e){
    var _this = this;
    wx.request({//获取地区
      url: `${app.globalData.request}quyu.php`,
      data: {},
      method: 'GET',
      success: function(res){
        _this.setData({
          areaList: res.data
        })
      }
    });
    this.setData({
      areaHidden: !this.data.areaHidden,
      itemsHidden: true
    });
  },
  switchItems: function(e){
    var _this = this;
    wx.request({//获取项目
      url: `${app.globalData.request}xiangmu.php`,
      data: {cid: _this.data.cid},
      method: 'GET',
      success: function(res){
        _this.setData({
          itemList: res.data
        })
      }
    });
    this.setData({
      itemsHidden: !this.data.itemsHidden,
      areaHidden: true
    });
  },
  setArea: function(e){
    var _this = this;
    //根据区域刷新新闻列表
    news.fetchNews.call(_this, newsSrc, 'list', 1, _this.data.cid, e.target.dataset.id, _this.data.xmid);
    _this.setData({
      areaHidden: true,
      itemsHidden: true,
      still: true,
      quyu: e.target.dataset.id,
      page: 1
    })
  },
  setItem: function(e){
    var _this = this;
    //根据项目刷新新闻列表
    news.fetchNews.call(_this, newsSrc, 'list', 1, _this.data.cid, _this.data.quyu, e.target.dataset.id);
    _this.setData({
      areaHidden: true,
      itemsHidden: true,
      still: true,
      item: e.target.dataset.id,
      page: 1
    })
  },
  switchShow: function(e){
    this.setData({
      areaHidden: true,
      itemsHidden: true
    });
  }
})