var $ = require("../../components/jquery/dist/jquery.min");
var ImageManager = require("../../commonJs/ImageManager");
var Lock = require("./lock");
var Star = require("./star")

var getImageRes = require("./images");
var ImgRes = getImageRes();

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";



var elStage = $("#stage");
var elLoadingBox = $("#loadingBox")
var elLoadingPer = $(".text", elLoadingBox);

var elStarts = $("#starts", elStage);

var elPage1 = $(".page1", elStage);
var elPage2 = $(".page2", elStage);
var elPage3 = $(".page3", elStage);
var elPage4 = $(".page4", elStage);
var elPage5 = $(".page5", elStage);

var elYeezanlogo = $(".yeezanlogo", elStage);
var elSharepage = $("#sharepage", elStage);
var elPage2NextBtn = $("#nextBtn", elPage2);

var elVoicebo = $("#voicebo", elPage3);

var elBgSoundImg = $("#bgSoundImg");
var bgSound = document.getElementById("bgSound");

var elGuideTop = $(".guideTop", elStage);
var elWho = $("#who", elStage);

var WxShare;

var M = {
	init: function (wxShare){
		WxShare = wxShare;
		M.setName();
		ImageManager.load(ImgRes, loadImageResources);
		M.bindEvent();
	},

	setName: function (){
		var name = getUrlParam("name") || "";
		if(!name){
			elWho.parent().hide().remove();
			return ;
		}
		elWho.text(name);
		WxShare.wx_config.link = WxShare.wx_config.link+"?name="+encodeURIComponent(name);
		WxShare.setShareInfo(WxShare.wx_config)
	},

	bindEvent: function (){
		$('body').on("touchmove", function (ev) {
		    ev && ev.preventDefault();
		});

		elBgSoundImg.on(touchstart, function (){
			if(elBgSoundImg.hasClass("musicPlay")){
	            elBgSoundImg.removeClass("musicPlay")
	            bgSound.pause();
	        }else{
	            elBgSoundImg.addClass("musicPlay")
	            bgSound.play();
	        }
		})


		new Star({
			el: elStarts,
			count: 16
		})

		new Lock({
			el: elPage1,
			cb: function (){
				elPage2.hide();
				elPage2.show();
				elYeezanlogo.show();
				setTimeout(function (){
					elPage2NextBtn.removeClass("rollIn delay3").css("opacity", 1).addClass("jello infinite")
				}, 4000)
			}
		})

		elPage2NextBtn.on(touchend, function (){
			movefn({
		 		el: elPage2,
		 		effect: "slideOutUp",
		 		cb: function (){
		 			elPage2.remove();
		 			elPage3.show();
		 		}
		 	});
		})

		elPage3.on(touchstart, ".btn", function (){
			var self = $(this);
			self.addClass("pressed");
			elVoicebo.addClass("show");
		})

		elPage3.on(touchend, ".btn", function (){

			var self = $(this);
			self.removeClass("pressed");
			elVoicebo.removeClass("show");
			if(self.attr('clicked') != "true"){
				$(".infoBox", elPage3).hide();
				$(".textinfo", elPage3).hide();
				$(".question", elPage3).show();
				self.attr('clicked', "true")
				return ;
			}
			movefn({
		 		el: elPage3,
		 		effect: "fadeOut",
		 		cb: function (){
		 			elPage3.remove();
		 			elPage4.addClass('fadeIn').show();
		 			
		 			var timer = false;
		 			$(".delay6",elPage4).on(animationEnd, function (){
		 				elGuideTop.show();
		 				elPage4.on(touchend, function (){
		 					timer = true;
		 					move();
		 				})
		 			})


		 			function move(){
		 				movefn({
					 		el: elPage4,
					 		effect: "fadeOut",
					 		cb: function (){
					 			elPage4.remove();
					 			elPage5.show();
					 			elGuideTop.hide();
					 		}
					 	});
		 			}

		 			setTimeout(function (){
		 				if(timer){
		 					return ;
		 				}
		 				move();
		 			}, 10000)
		 		}
		 	});
		})

		elPage5.on(touchend, ".btn-share", function (){
			elSharepage.show();
		})

		elSharepage.on(touchend, function (){
			elSharepage.hide();
		})
	}
}



module.exports = M;

function loadImageResources(number) {
	var per = Math.ceil(number / ImgRes.length * 100) + "%";
 	elLoadingPer.text("loading..."+per)
    if(number < ImgRes.length) {
        return false;
    }
    
 	var el = elLoadingBox;

 	setTimeout(function (){
 		movefn({
	 		el: el,
	 		effect: "slideOutUp",
	 		cb: function (){
	 			el.remove();
	 			elPage1.show();
	 		}
	 	});
 	}, 100)
 	
}
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
function movefn(ops){
	
	ops.el
		.addClass(ops.effect)
		.one(animationEnd, function (){
			ops.cb();
		})
}


function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) {
		return decodeURIComponent(r[2]); 
	}
	return null;
} 
