var $ = require("../../components/zepto/zepto");

$(function (){


var Swiper = require("../../components/iswiper/dist/swiper");
var mySwiper = new Swiper();

var WxShare = require("./share");
var btn=$(".btn");
var box=$(".box");
var floor4=$(".floor4");
var height=$(window).height();
var subBtn=$(".subBtn");
var elForm = $("#form-info");
var elFormTips = $("#form-tips", elForm);
var flag=false;
WxShare.init();


var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

var prefixArr = [
	"-webkit-",
	"-moz-",
	"-ms-",
	"-o-",
	""
];

function getStyle(p,v){
	if(!p){
		return;
	}
	var style = "";
	p += "";
	for(var i = 0,len = prefixArr.length; i<len; i++){
		style += prefixArr[i]+p+": translateY("+ v +");";
	}
	return style;
}

var tea=M={

	csrf: "",
	
	init:function(){
		M.getcsrf();
		M.bindEvent();
		M.pre();
		$("input", elForm).attr("readonly", "readonly");
	},
	
	setBoxStyle: function (p,v){
		var cssText = getStyle(p, v);	
		box.attr("style", cssText);
	},

	pre:function(){
		$("html, body").on("touchmove", function (ev){
	 			ev.preventDefault();
			})
	},
	
	
	btnFn:function(){
		mySwiper.next();
		setTimeout(function (){
			$("input", elForm).removeAttr("readonly");
		}, 900)
		
	},
	
	subFn:function(){
		
		M.setBoxStyle("transform", "-100%");
		floor4.addClass("block");
		$("input", elForm).blur();
//		setTimeout(function(){
//			box.addClass("hid");
//		},700)
		
	},

	getcsrf: function (){
		var url = 'http://hd.weixiezuo.com.cn/yz_teatime/csrf.php';
		$.get(url, function (data){
			if(+data.error != 0){
				return 	alert(data.msg);
			}
			M.csrf = data.data.csrf;	
			
		}, "json")
	},

	formtip: function (el){
		el.focus();
		var t = el.offset().top - elForm.offset().top + 35;
		elFormTips.css({
			top: t
		}).text(el.attr("placeholder")).show();
		setTimeout(function (){
			elFormTips.hide();
		}, 1300)
	},

	verifyfn: function (data){
		for(var i=0,len=data.length; i<len; i++){
			var temp = data[i],
				name = temp.name,
				v = temp.value;
			var el = $("[name="+name+"]", elForm);
			// null
			if(!v){
				M.formtip(el);
				return false;
			}
			// phone
			if(name.indexOf("phone") > -1){
				if(!(/^1\d{10}$/.test(v))){
					M.formtip(el);
					return false;
				}
			}
			// email
			if(name.indexOf("email") > -1){
				if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(v))){
					M.formtip(el);
					return false;
				}
			}
		}
		return true;
	},
	
	bindEvent:function(){
		btn.on(touchend, M.btnFn);
		mySwiper.on('swiped', function(prev, current){
	        if(current == 2){
	        		setTimeout(function (){
					$("input", elForm).removeAttr("readonly");
				}, 900)
	        }
	       
	    });
		elForm.submit(function(e){
			e.preventDefault();	
//			M.subFn();
			var data=$(this).serializeArray();	

			if(!M.verifyfn(data)||flag){
				return;
			}
			flag=true;
			var ret = {};
			if(data.length){
				for(var i=0,len=data.length; i<len; i++){
					var temp = data[i];
					ret[temp.name] = temp.value || "";
				}
			}
			ret.csrf = M.csrf;
			
			var url = 'http://hd.weixiezuo.com.cn/yz_teatime/form.php';
			$.ajax({
				url: url,
				type: "POST",
				data: ret,
				success: function (data){
					if(+data.error != 0){
						alert(data.msg);
						return;
					}
					M.subFn();
				},
				xhrFields: {
			      withCredentials: true
			   },
			   dataType: "json"
			})
			return flag=false;
		});
	}
}

tea.init();

	
});
