var WxShare = require("../../commonJs/share");

var config = {
	title: "中奖结果",
	desc: "十点读书联合易赞共同发起的慈善、千万粉丝竞猜系列活动。",
	link: "http://hd.yeezan.com/yz_shidian/result_check.php",
	imgUrl: "http://event.yeezan.com/p_ten/images/share.jpg"
}

module.exports = new WxShare(config); 