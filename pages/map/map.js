const app = getApp();
const QQMapWX = require('../../require/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    data:{
        markers:[],
        position:{}
    },
    onLoad: function(options){
        wx.setNavigationBarTitle({
          title: options.name
        });
        var _this = this;
        qqmapsdk = new QQMapWX({
          key: '3OYBZ-A5SRG-CG5QL-IWCLN-SDIX2-BBBDM'
        });
        qqmapsdk.geocoder({
            address: options.title,
            success: function(res) {
                _this.setData({
                    markers:[{
                        id: 0,
                        latitude: res.result.location.lat,
                        longitude: res.result.location.lng,
                        width: 50,
                        height: 50,
                        title: result.title
                    }],
                    position:{
                        latitude: res.result.location.lat,
                        longitude: res.result.location.lng
                    }
                });
            },
            fail: function(res) {
                console.log(res);
            }
        });
    },
    onShow: function(){
        
    }
})