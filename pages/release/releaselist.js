// pages/release/releaselist.js
const common = require('../../common/common');
const app = getApp();
Page({
  data:{
    tableList: [
      {
        name: "招聘",
        id: 1
      },
      {
        name: "房产",
        id: 2
      },
      {
        name: "其他",
        id: 3
      },
    ],
    //switch的信息
    sex: ['男', '女', '不限'],
    sexindex: 0,
    money: ['面议', '2000元以下', '2000-4000元', '4000-6000元', '6000-8000元', '8000-10000元', '1万元以上'],
    moneyindex: 0,
    mold: [],
    moldindex: 1,
    quyu: [],
    quyuindex: 0,
    original: [],
    classes: [],
    classesindex: 0,
    classsec: [],
    classsecindex: 0,
    date: '2016-09-01',
    time: '12:01',
    curNav: 1,
    curIndex: 0,
    areaList: [],
    imageList: [],
    countIndex: 3,
    count: [1, 2, 3, 4],
    openId: '',
    nickname: '',
    lists: [],
    first: [],
    third: [],
    classesindex: 0,
    classesindex2: 0,
    classesindex3: 0
  },
  onLoad:function(options){
    let openId = wx.getStorageSync('user').openid;
    let nickname = wx.getStorageSync('userInfo').nickName;
    this.setData({
      openid: openId,
      nickname: nickname
    })
    var _this = this;
    wx.request({
      url: `${app.globalData.request}quyu.php`,
      data: {},
      method: 'GET',
      success: function(res){
        var quyu = [];
        var quyuid = [];
        for(var i=0; i<res.data.length; i++){
          quyu.push(res.data[i].title);
          quyuid.push(res.data[i].id);
        }
        _this.setData({
          quyu,
          quyuid
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    wx.request({
      //设置class
      url: `${app.globalData.request}class.php`,
      data: {types:'typefabu'},
      method: 'GET',
      success: function(res){
        console.log(res.data);
        let [list, second, third] = [[],[],[]];
        for (let i = 0; i < res.data.length; i++){
          list.push(res.data[i].title);
        }
        for (let i = 0; i < res.data[0].itemlist.length; i++){
          second.push(res.data[0].itemlist[i].title);
        }
        for (let i = 0; i < res.data[0].itemlist[0].itemlists.length; i++) {
          third.push(res.data[0].itemlist[0].itemlists[i].title);
        }
        _this.setData({
          lists: res.data,
          first: list,
          second,
          third
        })
      }
    })
    wx.request({
      url: `${app.globalData.request}fangxm.php`,
      data: {},
      method: 'GET',
      success: function(res){
        var modList = [];
        var indexList = [];
        for(let i=0;i<res.data.length; i++){
          modList.push(res.data[i].title);
          indexList.push(res.data[i].id);
        }
        _this.setData({
          molds: indexList,
          mold: modList
        })
      }
    })
  },
  switchRightTab: function(e) {
    let id = e.target.dataset.id,
		index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
	  	curIndex: index
		})
  },
  bindPickerChange: function(e) {
    this.setData({
      moneyindex: e.detail.value
    })
  },
  //change事件
  bindClassesChange: function(e){
    console.log(e.detail.value);
    var _this = this;
    this.setData({
      classesindex: e.detail.value
    })
    let second = [];
    for (let i = 0; i < _this.data.lists[e.detail.value].itemlist.length; i++){
      second.push(_this.data.lists[e.detail.value].itemlist[i].title);
    }
    _this.setData({
      second
    })
  },
  bindClassesChange2: function (e) {
    var _this = this;
    this.setData({
      classesindex2: e.detail.value
    })
    let third = [];
    if (_this.data.lists[_this.data.classesindex].itemlist[e.detail.value].itemlists.length > 1) {
      for (let i = 0; i < _this.data.lists[_this.data.classesindex].itemlist[e.detail.value].itemlists.length; i++) {
        third.push(_this.data.lists[_this.data.classesindex].itemlist[e.detail.value].itemlists[i].title);
      }
      _this.setData({
        third
      })
    }
  },
  bindClassesChange3: function (e) {
    this.setData({
      classesindex3: e.detail.value
    })
  },
  changeSex: function(e){
    this.setData({
      sexindex: e.detail.value
    })
  },
  bindMoldChange: function(e){
    this.setData({
      moldindex: e.detail.value
    })
  },
  bindAreaChange: function(e){
    this.setData({
      quyuindex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var _this = this;
    wx.request({
      url: `${app.globalData.request}fabu.php`,
      data: {data: e.detail.value, openid: _this.data.openid, nickname: _this.data.nickname},
      method: 'GET',
      success: function (res) {
        if(res.data == '-1'){
          wx.showToast({
            title: '发布失败，请填写全部信息',
            icon: 'loading',
            duration: 2000
          });
        } else if (res.data == 'no') {
          wx.showToast({
            title: '已超过当天发布条数上限',
            icon: 'loading',
            duration: 2000
          });
        } else if (res.data != 0){
          for (var i = 0; i < _this.data.imageList.length; i++) {
            wx.uploadFile({
              url: `${app.globalData.request}img.php`,
              filePath: _this.data.imageList[i],
              header: { "content-type": "multipart/form-data" },
              name: 'img',
              formData: { types: 'img', num: res.data },
              success: function (res) {
              },
              fail: function (res) {
              },
              complete: function (res) {
              }
            })
          };
          wx.showToast({
            title: '发布成功，3秒钟后返回首页',
            icon: 'success',
            duration: 3000
          });
          setTimeout(()=>{
              wx.reLaunch({
                  url: '/pages/index/index'
              });
          }, 3000);
        } else{
          wx.showToast({
            title: '发布失败，请核实信息后重新提交',
            icon: 'loading',
            duration: 2000
          });
        }
      },
      fail: function(res) {
        common.showModal('提交失败', '请检查网络状态');
      },
      complete: function(res) {
        // complete
      }
    })
  },
  formSubmit1: function(e){
    var _this = this;
    wx.request({
      url: `${app.globalData.request}fabu.php`,
      data: {data: e.detail.value, openid: _this.data.openid, nickname: _this.data.nickname},
      method: 'GET',
      success: function(res){
        if (res.data == '-1') {
          wx.showToast({
            title: '发布失败，请填写全部信息',
            icon: 'loading',
            duration: 2000
          });
        } else if (res.data == 'no'){
          wx.showToast({
            title: '已超过当天发布条数上限',
            icon: 'loading',
            duration: 2000
          });
        } else if(res.data!= 0){
          for(var i=0; i<_this.data.imageList.length; i++){
            wx.uploadFile({
              url: `${app.globalData.request}img.php`,
              filePath: _this.data.imageList[i],
              header: {"content-type": "multipart/form-data"},
              name: 'img',
              formData: {types: 'img', num: res.data},
              success: function(res){
              },
              fail: function(res) {
              },
              complete: function(res) {
              }
            })
          }
          wx.showToast({
            title: '发布成功，3秒钟后返回首页',
            icon: 'success',
            duration: 3000
          });
          setTimeout(()=>{
              wx.reLaunch({
                  url: '/pages/index/index'
              });
          }, 3000);
        } else{
          wx.showToast({
            title: '发布失败，请核实信息后重新提交',
            icon: 'loading',
            duration: 2000
          });
        }
      },
      fail: function(res) {
        common.showModal('提交失败', '请检查网络状态');
      }
    });
  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var _this = this
    wx.chooseImage({
      sizeType: 'compressed',
      count: 4,
      success: function (res) {
        _this.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
})