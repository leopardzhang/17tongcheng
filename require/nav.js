function fetchNav(url, cid){
    var _this = this;
    wx.request({
      url: url,
      data: {types:'tj'},
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        _this.setData({
            navList: res.data
        });
      }
    })
}
module.exports = {
    fetchNav: fetchNav
}