// var $ = require("../../components/lib/zepto");
var $ = require("../jquery/dist/jquery");

$.fn.animatefn = function (ops){
    var $el = $(this);
	if(!ops){
		return $el;
	}
	var cb = ops.cb || $.noop,
		effect = ops.effect || "bounceOutLeft";

	$el.addClass('animated '+effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
		cb();
		return $el;
	});
}


module.exports = $;
