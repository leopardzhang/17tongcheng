function fetchNews(url="", types="", page="1", cid="0", quyu="", xmid="", key=""){
    var _this = this;
    wx.request({
      url: url,
      data: {types:types,page:page,cid:cid,quyu:quyu,xmid:xmid, key: key},
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        console.log(res);
        if(key){
          _this.setData({
            still: false
          });
        }
        _this.setData({
            newsList: res.data,
            have: true
        });
      }
    })
}
module.exports = {
    fetchNews: fetchNews
}