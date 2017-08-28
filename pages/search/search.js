// pages/search/search.js
Page({
  data:{
    text: ''
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: "搜索"
    });
  },
  setText: function(e){
    var text = e.detail.value;
    this.setData({
      text
    })
  },
  search: function(){
    var _this = this;
    wx.redirectTo({
      url: `/pages/classes/classlist?key=${_this.data.text}`
    })
  }
})