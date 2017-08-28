// pages/note/myclasses.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    newsList: [],
    page: 1,
    still: true,      //是否还有更多信息
    loading: false,   //是否正在加载
    have: false,      //是否有数据
    deleteAble: true
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: "我的发布"
    });
    var _this = this;
    let openid = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    wx.request({
      url: `${app.globalData.request}member_fabu.php`,
      data: {openid, nickname, page: _this.data.page},
      method: 'GET',
      success: function(res){
        _this.setData({
          newsList: res.data,
          have: true
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
  },
  onReachBottom:function(){
    var _this = this;
    _this.setData({
      page: _this.data.page+1,
      loading: true
    })
    var _this = this;
    let openid = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    wx.request({
      url: `${app.globalData.request}member_fabu.php`,
      data: {openid, nickname, page: _this.data.page},
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
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  destory: function(e){
    var _this = this;
    wx.showModal({
      title: '确定删除吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.request}fabu_del.php`,
            data: {types: "fabu", id: e.target.dataset.id},
            method: 'GET',
            success: (res)=>{
              console.log(res);
              wx.showToast({
                title: '删除成功',
              })
              _this.onLoad();
            },
            fail: function(){
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        }
      }
    })
  }
})