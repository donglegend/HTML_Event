var $ = require("../../components/lib/$");
$(function (){
	var URI = require("../../components/urijs/src/URI.js");
	var Pay = require("./pay");
	var links = require("./links");

	var _index = URI.parseQuery(URI.parse(location.href).query).url || 0;
	var desUrl = links[Number(_index)] || "";


	Pay.pay({
		cb: function (){
			location.href = desUrl;
		}
	});
})



