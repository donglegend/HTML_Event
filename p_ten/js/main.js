var $ = require("../../components/lib/$");
var FastClick = require('../../components/fastclick/lib/fastclick');
var WxShare = require("./share");
WxShare.init();

$(function(){
	FastClick(document.body);
	var P = require("./p");
	var setOption = require("./setOption");
	P.init();
}); 

