var WxShare = require("../../commonJs/share");

var config = {
	title: "让爱易读，实时见证千万粉丝读书的力量",
	desc: "十点读书联合易赞共同发起的慈善、千万粉丝竞猜系列活动。",
	link: "http://hd.yeezan.com/yz_shidian/index.php",
	imgUrl: "http://event.yeezan.com/p_ten/images/share.jpg"
}

module.exports = new WxShare(config);