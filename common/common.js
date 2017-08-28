module.exports = {
    //显示loading
    loading: ()=>{
        wx.showNavigationBarLoading()
    },
    //隐藏loading
    stoploading: ()=>{
        wx.hideNavigationBarLoading()
    },
    //设置导航文字
    setNavTitle: (title)=>{
        var title = title;
        wx.setNavigationBarTitle({
            title: title,
            success: function() {
                console.log('setNavigationBarTitle success')
            },
            fail: function(err) {
                console.log('setNavigationBarTitle fail, err is', err)
            }
        })
        return false
    },
    showModal: (title="网络不给力啊", content="信息加载失败")=>{
        wx.showModal({
            title,
            content,
            showCancel: false,
            confirmText: "确定"
        })
    },
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
	}
}