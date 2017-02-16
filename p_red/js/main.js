var $ = require("../../components/zepto/zepto");
var P = require("./p");

var WxShare = require("./share");
WxShare.init();


$(function (){
	P.init(WxShare);
})