//app.js
const logo = require('/require/logo');
App({
    globalData:{
        appId:'wx8fd0f04121e3868f',//appId
        secret:'8275b9065c4b34d8e95fd57facbc9f84',//secret
        request: 'https://18508788.17tongcheng.cn/api/'//请求地址
    },
    onLaunch: function () {
        var _this = this;
        var logoUrl = `${_this.globalData.request}logo.php`;
        logo.fetchLogo.call(_this, logoUrl);
        var user=wx.getStorageSync('user') || {};
        var userInfo=wx.getStorageSync('userInfo') || {};
        if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){
            wx.login({
            success: function(res){
                if(res.code) {
                    wx.getUserInfo({
                        success: function (res) {
                            var objz={};
                            objz.avatarUrl=res.userInfo.avatarUrl;
                            objz.nickName=res.userInfo.nickName;
                            wx.setStorageSync('userInfo', objz);//存储userInfo
                        }
                    });
                    var d=_this.globalData;//这里存储了appId、secret、token串
                    var l=`https://api.weixin.qq.com/sns/jscode2session?appId=${d.appId}&secret=${d.secret}&js_code=${res.code}&grant_type=authorization_code`;
                    wx.request({
                        url: l,
                        data: {},
                        method: 'GET',
                        success: function(res){
                            console.log(res);
                            var obj={};
                            obj.openid=res.data.openid;
                            obj.expires_in=Date.now()+res.data.expires_in;
                            //console.log(obj);
                            wx.setStorageSync('user', obj);//存储openid
                        }
                    });
                }else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            }
        });
    }
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
        }
        })
    }
});