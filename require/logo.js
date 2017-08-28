function fetchLogo(url){
    var _this = this;
    wx.request({
      url: url,
      data: {types:'logo'},
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        //console.log(res.data);
        wx.setStorageSync('logo', res.data.picurl);
      }
    })
}
module.exports = {
    fetchLogo: fetchLogo
}