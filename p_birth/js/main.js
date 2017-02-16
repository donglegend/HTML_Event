var $ = require("../../components/jquery/dist/jquery.min");
var WxShare = require("./share");
WxShare.init();


$(function (){
	var P = require("./p");
	P.init(WxShare);
	var Star = require("./star");
})

