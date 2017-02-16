var WxShare = require("../../commonJs/share");

var config = {
	title: "donglegend",
	desc: "东胜东胜东胜",
	link: "http://event.yeezan.com/p_house/index.html",
	imgUrl: "http://event.yeezan.com/p_house/images/houseCard.jpg"
}


new WxShare(config);


module.exports = new WxShare(config);