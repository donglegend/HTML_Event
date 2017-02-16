var $ = require("../../components/lib/$");
var ImageManager = require("../../commonJs/ImageManager");
var getImageRes = require("./images");
var ImgRes = getImageRes();
var Swiper = require("./swiper");
var imgSwiper = require("./imgSwiper");
var Luck = require("./luck");
var data_ops = require("./data_ops");
var des_ops = require("./des_ops");

//var elGifBtn = $('.gif-btn');
var elswiper = $(".swiper");
//var elpage7 = $('.page7');
var elpage8 = $('.page8');
var elpage9 = $('.page9');
var elpage10 = $('.page10');
var elselectImg = $('.selset-box .selectImg');
var elbg = $('.bg',elpage8);
var eluserName = $("#userName");
var eluserPhone = $("#userPhone");
var elbtnSub = $("#btnSub");
var elcityFont = $(".city-font");
var ellodingBox = $(".loding-box");
var elBgSoundImg = $("#bgSoundImg");
var bgSound = document.getElementById("bgSound");
var ellastPage = $(".lastPage");
var elplaceName = $(".placeName");

var domSwiper = new Swiper();

var colorArr = ['blue','green','white','yellow','red'];

var reqUrl = 'http://hd.yeezan.com/yz_piggy_api.php?insert_data';
//  reqUrl = "api/data";

var elLoadProcess = $("#loadProcess");

function loadImageResources(number) {
	var per = Math.ceil(number / ImgRes.length * 100) + "%";
	elLoadProcess.html(per);
	if (number < ImgRes.length) {
		return false;
	}
	
	ellodingBox.hide();
	bgSound.play();
	$('.page1 img').addClass('rubberBand')
}


var 	M = {
	init: function() {
		ImageManager.load(ImgRes, loadImageResources);
		M.domSwiperFn();
		M.eventFn();
	},
	
	domSwiperFn: function() {
		domSwiper.on('swiped', function(prev, current){
	        if(current == 8 ){
	        		$(".pigLog").attr("src","images/pig-log1.png") 
	        }
	    });
	},
	
//	gifFn: function() {
//		var gif = $(this).siblings('img'); 
//		var gifSrc = gif.attr('data-src');
//		gif.attr('src',gifSrc);
//	},
	
	/* 记录索引 */
	indexes: "",
	
	/* 记录奖品 */
	prizes: "", 
	
	/* 图片路径赋值 */
	indexesFn: function(){
		var dataIndex = $(".luckActive",elpage8).attr('data-index'); 
		
		elcityFont.html(des_ops[M.indexes][dataIndex]);
		
		M.prizes = data_ops[M.indexes][dataIndex];
		
		elplaceName.html(M.prizes);
		
		M.indexes = M.indexes+'/'+dataIndex + "";
		
		$("img",elpage9).attr('src','images/'+M.indexes+'/city.png');
		$("img",elpage10).each(function(index){
			
			$(this).attr('src','images/'+M.indexes+'/'+index+'.jpg');
			if(index == 3){
				$(this).attr('src','images/'+M.indexes+'/0.jpg');
			}
			if(index == 4){
				$(this).attr('src','images/'+M.indexes+'/1.jpg');
			}
		})
		var mySwiper = new imgSwiper('.swiper-container',{
		    loop:true,
		    grabCursor: true,
		    speed : 300,
		    autoplay: 1500,
		    autoplayDisableOnInteraction:false
		  })
	},
	
	/* 选择色块 */
	page8show: function(){
		
		if(elpage8.attr("click") == "true"){
			return
		}
		elpage8.attr("click","true");
		
		var color = $(this).attr('data-color');
		
		M.indexes = color+"";
		
		for(var i = 0; i<colorArr.length ;i++){
			if(elbg.hasClass(colorArr[i])){
				elbg.removeClass(colorArr[i])
			}
		}
		elbg.addClass(color);
		M.prizeDraw();
	},
	
	/* 抽奖 */
	prizeDraw: function(){
		var myLuck = new Luck("luckStage");
		myLuck.run(function(){
			M.indexesFn();
			setTimeout(function(){
				domSwiper.next(); 
				elpage8.attr("click","false");
				$(".pigLog").attr("src","images/pig-log1.png") 
			},1000)
		});
	},
	
	/* 提交表单 */
	submitFn: function(){
		if(!eluserName.val()){
			eluserName.addClass('warn')
			return
		}
		if(!eluserPhone.val()){
			eluserPhone.addClass('warn')
			return
		}
		var isPhone = /^1\d{10}$/.test(eluserPhone.val())
		if(!isPhone){
			eluserPhone.addClass('warn')
			eluserPhone.val("");
			return
		}
		
		var o = {
			area: M.prizes,
			name: eluserName.val(),
			phone: eluserPhone.val()
		}
		
		if(elbtnSub.attr("click") == "true"){
			return
		}
		elbtnSub.attr("click","true");
		$.post(reqUrl,o,function(data){
			if(+data.error == 0){
				ellastPage.show();
				elbtnSub.attr("click","false")
			}else{
				alert(data.msg);
			}
			
		},'json')
		
	},
	
	/* 重新选色 */
	reselect: function(){
		domSwiper.go(6);
		elbg.removeClass('luckActive');
		$("img",elpage9).attr('src','');
		$("img",elpage10).attr('src','');
		$(".pigLog").attr("src","images/pig-log.png");
		$(".swiper-slide").each(function(index){
			if(index == 3){
				$(this).remove();
			}else if(index == 4){
				$(this).remove();
			}
		})
		
	},
	
	eventFn: function() {
//		elGifBtn.each(function(){
//			$(this).on('touchstart',M.gifFn)
//		});
		
		elselectImg.each(function(){
			$(this).on('touchend',M.page8show)
		});
		
		eluserPhone.on('focus',function(){
			eluserPhone.removeClass('warn');
		})
		eluserName.on('focus',function(){
			eluserName.removeClass('warn');
		})
		
		elbtnSub.on('touchstart',M.submitFn);
		
		elpage9.on('touchend',function(){domSwiper.next()})
		$('.btn1',elpage10).on('touchend',function(){domSwiper.next();});
		$('.btn2',elpage10).on('touchend',M.reselect);
		
		elBgSoundImg.on('touchstart', function (){
			if(elBgSoundImg.hasClass("musicPlay")){
	            elBgSoundImg.removeClass("musicPlay")
	            bgSound.pause();
	        }else{
	            elBgSoundImg.addClass("musicPlay")
	            bgSound.play();
	        }
		})
	}
}



module.exports = M;