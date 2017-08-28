// pages/user/user.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    logoSrc: '',
    appId:'wx8fd0f04121e3868f',//appId
    secret:'1ca90a7e346a184d3a50b69c5c533080',//secret
    infoList:[
      {imgUrl: '/images/me_12.jpg', name: '我的发布', url: '../note/myclasses'},
      {imgUrl: '/images/me_05.jpg', name: '我的会员', url: '../note/balance'},
      // {imgUrl: '/images/me_14.jpg', name: '代 金 券', url: '../note/youhui'},
      // {imgUrl: '/images/me_10.jpg', name: '交易记录', url: '../note/note?page=充值&name=cost'}
    ]
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '我的'
    });
    var _this = this;
    let logoUrl = wx.getStorageSync('logo');
    _this.setData({
      logoSrc: logoUrl
    });
    try {
      let user = wx.getStorageSync('user');
      let userInfo = wx.getStorageSync('userInfo');
      if (user && userInfo) {
        let date = new Date(user.expires_in);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let timer = `${year}年${month+1}月${day}日${hours}时${minutes}分`;
          _this.setData({
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            openid: user.openid,
            expires_in: user.expires_in,
            timer: timer
          })
      }
    } catch (e) {
      // Do something when catch error
    }
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
	viewSearch: common.viewSearch
})