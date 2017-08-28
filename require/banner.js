function fetchBanner(url, cid="2"){
    var _this = this;
    wx.request({
      url: url,
      data: {types:'banner', cid: cid},
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        //console.log(res.data);
        _this.setData({
            bannerUrlList: res.data
        });
      }
    })
}
module.exports = {
    fetchBanner: fetchBanner
}