// pages/note/pay.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    openid: '',
    curNav: 0,
    table: [],
    money: '',
    curNav: 1,
    curIndex: 0,
    chosed: false,
    youhuiid: '0'
  },
  onLoad:function(options){
    var _this = this;
    const user = wx.getStorageSync('user');
    this.setData({
      openid: user.openid
    })
    wx.request({
      url: `${app.globalData.request}chong.php`,
      data: {},
      method: 'GET',
      success: function(res){
        var tableList = res.data;
        for(let i = 1; i <= tableList.length; i++){
          tableList[i-1].cid = i;
        }
        _this.setData({
          table: tableList
        })
      },
      fail: function(res) {
        common.showModal('支付失败', res.data);
      },
      complete: function(res) {
        // complete
      }
    })
    wx.request({//获取优惠券
      url: `${app.globalData.request}youhui_sy.php`,
      data: {openid: _this.data.openid},
      method: 'GET',
      success: function(res){
        console.log(res.data)
        _this.setData({
          youhuiList: res.data
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
  requestPay: function(){
    var _this = this;
    wx.request({
      url: `${app.globalData.request}pay.php`,
      data: {openid: _this.data.openid, total: _this.data.table[_this.data.curNav-1].id, youhuiid: _this.data.youhuiid || '0'},
      method: 'GET',
      success: function(res){
        console.log(_this.data.table[_this.data.curNav-1].id);
        var _res = res;
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function(res){
            console.log(res);
            wx.request({
              url: `${app.globalData.request}pay_hd.php`,
              data: {code: _res.data.package},
              method: 'GET',
              success: function(res){
                
              }
            })
          },
          fail: function(res) {
          },
          complete: function(res) {
            // complete
          }
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // complete
      }
    })
  },
  switchRightTab: function(e) {
    let id = e.currentTarget.dataset.cid,
		index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
	  	curIndex: index
		})
  },
  bindYouChange: function(e){
    this.setData({
      classsecindex: e.detail.value
    })
  },
  choseCard: function(e){
    var _this = this;
    this.setData({
      chosed: !this.data.chosed,
      youhuiid: _this.data.youhuiid == '0' ? e.currentTarget.dataset.you : '0'
    })
    console.log(_this.data.youhuiid)
  }
})