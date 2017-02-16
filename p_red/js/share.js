var WxShare = require("../../commonJs/share");

var config = {
	title: "李彦宏关注了我的微信公众账号",
	desc: "自媒体都在玩的装逼神器，玩完粉丝暴涨。",
	link: "http://hd.yeezan.com.cn/yz_hongbao/index.php",
	imgUrl: "http://hd.yeezan.com.cn/yz_hongbao/images/share1.jpg"
}

module.exports = new WxShare(config);