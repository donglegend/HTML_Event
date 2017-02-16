var WxShare = require("../../commonJs/share");

var config = {
	title: "易赞下午茶",
	desc: "听说你很懂新媒体 易赞想约你4.16喝个下午茶",
	link: "http://event.yeezan.com/p_tea/index.html",
	imgUrl: "http://event.yeezan.com/p_tea/images/share.jpg"
}

module.exports = new WxShare(config);