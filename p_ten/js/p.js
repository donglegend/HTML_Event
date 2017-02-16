var $ = require("../../components/lib/$");
var ImageManager = require("../../commonJs/ImageManager");
var getImageRes = require("./images");
var ImgRes = getImageRes();
var Slider = require("./slider");
var Utils = require("../../commonJs/utils");
var calendar = require("./calendar");

var Z,Zn,RedZ;


var elLoadProcess = $("#loadProcess");

//var elPage1 = $(".part1");
var elPage2 = $(".part2");
var elPage3 = $(".part3");
var elPage5 = $(".part5");
var elBgSoundImg = $("#bgSoundImg");
var bgSound = document.getElementById("bgSound");
var bgS= document.getElementById("bgS");
var lightS= document.getElementById("lightS");

var elSupportMoney = $('#supportMoney');
var elArt = $("#art");

var payList,giftList;


function loadImageResources(number) {
	var per = Math.ceil(number / ImgRes.length * 100) + "%";
	elLoadProcess.html(per);
	if (number < ImgRes.length) {
		return false;
	}

	var el = $(".clock-box");
	el.animatefn({
		effect: "fadeOut",
		cb: function() {
			el.remove();
		}
	})


	if(M.isPay){
		$(".second-login-gift").show();
		$('.support').on('touchstart',function(){
			$(".second-login-gift").css('opacity',1) 
		})
		elPage5.show().animatefn({
			effect: "bounceInDown"
		})
	}else{
		elPage2.show().animatefn({
			effect: "fadeIn"
		});
	}
	
}

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var transitionEnd = 'webkitTransitionEnd mozTransitionEnd msTransitionEnd otransitionEnd transitionEnd';
var click = 'touchend touchmove'; 

var reqUrl = 'http://hd.yeezan.com/yz_shidian/api.php?';
reqUrl = "api/";

var moneyArr = [
	['1.11', "换掉磨手的铅笔头"],
	['9.99', "攒多久才够一本汉语字典"],
	['2.22', "多想买张去城里图书馆的车票"],
	['129', "我也想上学"],
	['52.1', "不敢奢望新学期的小书包"],
	['33.3', "新学期的书本费"],
	['19.9', "一张电影票是孩子一家几天的饭钱"],
	['6.66', "让山里的孩子可以看上四大名著"]
];

var M = {
	init: function() {
		M.getUserInfo();
		setAnimate({
			el: $(".font-box p"),
			effect: "fadeInUp"
		});
		setAnimates({
			el: $(".fans-data .timeAnim"),
			effect: "fadeInUp"
		});
		setAnimates({
			el: $(".ten-font1 .timeAnim"),
			effect: "fadeIn"
		});
		setAnimates({
			el: $(".boyGirl .timeAnim"),
			effect: "fadeIn"
		});
		M.bindEvent();
		M.setList();
		M.initDate();
	},
	
	dates:function(){
		var newDate = new Date();
		var year = newDate.getFullYear();       //年
        var month = newDate.getMonth() + 1;     //月
        var day = newDate.getDate();    
		var newDates = year+"-"+month+"-"+day;
		return newDates;
	},
	date:"",
	startime:"08:00",
	initDate: function (){
		var data;
		var calendarIns = new calendar.calendar( {
            count: 1,
            selectDate: new Date(),
            selectDateName: "",
            minDate: new Date(),
            maxDate: new Date( +new Date() + 1000 * 86400000 ),
            isShowHoliday: false,
            isShowWeek: false
        } );
		
        $.bind( calendarIns, 'afterSelectDate', function( event ) {
            
            var curItem = event.curItem,
                date = event.date,               
                dateName = event.dateName;
                M.date = date;
               
            	calendarIns.setSelectDate( date );
        } );
		
		
        $( '#prevMonth' ).on( 'touchstart', function() {
            calendarIns.prevMonth();
        } );

        $( '#nextMonth' ).on( 'touchstart', function() {
            calendarIns.nextMonth();
        } );
		
		
	},

	moneyTimer : null,

	isPay: false,
	
	getPayList: function() {
		var result;
		$.ajax({
			type:"get",
			url:reqUrl+"get_pay_list",
			async:false,
			success:function(data){
				var data = JSON.parse(data)

				result = data.data;  
			} 
		})
		return result
	},
	 
	getGiftList: function() {
		var result;
		$.ajax({
			type:"get",
			url:reqUrl + "get_gift_list",
			async:false,
			success:function(data){
				var data = JSON.parse(data)
				result = data.data; 
			} 
		})
		return result
	}, 
	
	setList: function(){
		var getPayList = M.getPayList();
		var getGiftList = M.getGiftList();
		var Array1 = [];
		var Array2 = [];
		var list = [];
		var j = getPayList.length + getGiftList.length;
		for (var i = 0; i < getPayList.length; i++) {
			var art1 = "<li class='list red'>"+getPayList[i].username + ":赞赏" + Number(getPayList[i].yeezan_gift_money).toFixed(2) + "元"+"</li>";
			Array1.push(art1);
		}
		for (var i = 0; i < getGiftList.length; i++) {
			var art2 = "<li class='list'>"+getGiftList[i].username + ":支持！"+"</li>";
			Array2.push(art2);
		}
		list = Array1.concat(Array2);
		list = list.sort(function() {
			return 0.5 - Math.random()
		});
		var w = 0;
		

		$(".font-float").html(list.join(""));
//		$(".font-float2").html(list.join(""))
		
		$(".font-float li").each(function (index ,item){
			w += $(item).width();
		})
		var elFl = $(".font-float");
		elFl.css("width", w +(40*(list.length))+ "px");
//		$(".font-float").css("animation", "floatFont " + (list.length + 10) + "s linear infinite");
		elFl.css('transition',"left " +(list.length + 10) +"s linear");
		elFl.css('left',-Number(elFl.width())+"px");
		
		
		
		elFl.on('transitionend',function(){
			elFl.css({
				'transition':'',
				'left':"100%"
				});
		})
		setInterval(function(){
			elFl.css('left',-Number(elFl.width())+"px");
			elFl.css('transition',"left " +(list.length + 10) +"s linear");
		},1000) 
	},
	
	getUserInfo: function() {
		$.get(reqUrl + "get_user_info", function(data) {
			if(+data.error == 0){
				var _data = data,
					data = data.data;
				$('#footer').find("#giftNum").text(data.id);
				if (+data.is_shidian_gift == 1) {
					$('#footer').css('opacity',1);
					$('.heart-box').show();
					$('.heart-box').css('opacity',0);
					$('.status').text("已支持");
					elSupportMoney.text(Number(data.shidian_gift_money).toFixed(2)+"元");
					$(".support", elPage3).attr('data-move', 'y');
				}else{
					if(+data.is_total == 0){
						$("#supportMoney", elPage3).on('touchstart', M.heartfn);
					}else if(+data.is_total == 1){
						$('.status').text("感谢您热心的参与支持，5万元慈善基金已经蓄势待发");
						elSupportMoney.text("");
						$(".support", elPage3).attr('data-move', 'y');
						M.bookRun = true;
					}
				}
				if(+data.is_yeezan_gift == 1){
					M.isPay = true;
					// 已支付，需要切换 支付视图
					$('#timeSec').html(data.choose_time_start+"至"+ data.choose_time_end);
					$('.time-box').remove();
					$('.second-login-gift').css("zIndex",1);					
				}else{
					Z = new Slider({
						el: $("#hour"),
						count:24,
						curIndex: 8
					});

					Zn = new Slider({
						el: $("#hourOther"),
						count:24,
						curIndex: 9
					});

					RedZ = new Slider({
						el: $("#RedMoney"),
						count: moneyArr.length,
						template: function (){
							var h = [];
							for(var i = 0, len = moneyArr.length; i<len; i++){
								h.push('<li>'+moneyArr[i][0]+'</li>')
							}
							return h.join('');
						}
					})

				}
			}else{
				return alert("requset info error!");
			}
			ImageManager.load(ImgRes, loadImageResources);
		}, "json")
	},


	heartfn: function (){
//		alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书，活动后续查询关注“易赞”公共账号，回复十点读书");
//		return 
		var _s = $(this);
		if(_s.attr("clicked") == "true"){
			return ;
		}
		_s.attr("clicked", "true")
		if(M.moneyTimer){
			clearInterval(M.moneyTimer);
		}
		M.moneyTimer = setInterval(function (){
			 elSupportMoney.html((Math.random()*5).toFixed(2)+"元")
		}, 60);

		$.get(reqUrl+"to_shidian_gift", function (data){
			var _data = data,
				data = data.data;
			if(+_data.error == 0){
				setTimeout(function (){
					clearInterval(M.moneyTimer);
					if(data.money){
						elSupportMoney.text(Number(data.money).toFixed(2)+"元");
					}else{
						elSupportMoney.text("0.00元");
					}
					$('.icon-filp').show();
					$('.heart-box').css('opacity',1);
					$('.heart-box').show();
					$('.status').text("已支持");
					$('#footer').animatefn({
								effect: "fadeIn",
								cb:function(){
									$('#footer').css('opacity',1);
								}
					})
					$(".support", elPage3).attr('data-move', 'y');
					M.bookRun = true;
				}, 2000)
			}else{
				_s.attr("clicked", "false")
			}
			
		}, 'json')
	},
	
	money:"1.11",
	
	refreshMoney: function (){
//		alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书");
//		return 
		var i = Utils.random(0, moneyArr.length-1);
		RedZ.move(i);
		elArt.html(moneyArr[i][1]);
		M.money = moneyArr[i][0];
		return M.money;
	},

	payRed: function (){
//		alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书");
//		return 
		
		var s = $(this);
		if(s.attr("clicked") == "true"){
			return ;
		}
		s.attr('click',"true");
		var date = M.date ? M.date : M.dates();
		var o = {
			start_time: date+" "+M.startime, 
			money: M.money
		}
		$.post(reqUrl+"to_yeezan_gift", o, function (data){
			if(+data.error == 0){
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				   }
				}else{
				   onBridgeReady(data.data.js_param);
				}
			}else{
				alert(data.msg);
				s.attr('click',"false");
			}
			// get pay params
			

		},'json')
	},

	bookRun: true,

	bindEvent: function() {
		$('body').on("touchmove", function(ev) {
			ev && ev.preventDefault();
		});
		
		$(".switch", elPage2).on(click, function(ev) {
			lightS.play();
			ev.preventDefault();
			ev.stopPropagation();
			var _s = $(this);
			$(this).animatefn({
				effect: "fadeOut",
				cb: function() {
					_s.remove();
				}
			})
		})

		elPage2.on(click, function(ev) {
			ev.preventDefault()
			$(this).animatefn({
				effect: "fadeOut",
				cb: function() {
					elBgSoundImg.show();
					elBgSoundImg.addClass("musicPlay");
					bgSound.play();
					setTimeout(function(){
						bgSound.pause();
						bgS.play();
					},8000)
//					bgSound.volume = 1;
//					bgS.volume = 0;
					elPage3.show().animatefn({
						effect: "fadeIn",
						cb: function() {
							elPage2.remove();
						}
					});

				}
			}) 
		})
		
		$(".book-closed", elPage3).on('touchstart', function() {
			
			var _s = $(this);
			$(this).animatefn({
				effect: "fadeOut",
				cb:function(){
					_s.remove();
				}
			})
			$(".book", elPage3).animatefn({
				effect: "fadeIn"
			})
		})
		
		
//		var bt = setInterval(function(){
//			if( bgSound.currentTime  > 6){
//				if(bgSound.volume == 0){
//					bgSound.remove();
//					elBgSoundImg.show();
//					return clearInterval(bt);
//				}
//				if(bgSound.volume >= 0.2){
//					bgSound.volume -= 0.2;
//					bgS.volume += 0.2;
//				}
//			}
//		},1000) 
		
	 
	
		  
		$('.tag-box').each(function(){
			var zIndex =Number($('.tag-box').length-1) - Number($(this).index());
			$(this).css('z-index',zIndex);
		})
		
		$(".book", elPage3).on("touchstart", ".tag-box", function(ev) {
			ev.preventDefault()
			var _s = $(this);
			
			if(_s.css('opacity') > 0 && _s.css('opacity') < 1){
				return
			}
			
			if(_s.index() == 1 ){
				if(_s.css('opacity') > 0){
					$('.prePage').show().animatefn({
						effect: "fadeIn",
					})
				}else{
					$('.prePage').animatefn({
						effect: "fadeOut",
						cb:function(){
							$('.prePage').hide().removeClass('fadeOut')
						}
					});
				}
			}
			
			if(+_s.index() == 4 ){
				
//				alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书");
//				return 
				if(_s.css('opacity') > 0){
					
					$('.support').css('opacity',1);
					$('.time-box').css('opacity',1);
					$('.chart').css('opacity',1);
					$('.second-login-gift').css('opacity',1);
				}else{
					$('.support').css('opacity',0);
				}
				
				$('.icon-filp').hide();
				_s.on(transitionEnd, function() {
					$('.float-box').css("opacity",1); 
					$('.heart-box').css('opacity',1);
				})
			}else if(+_s.index() == 5){
//				if(_s.css('opacity') > 0){
//					$('.time-box').css('opacity',1);
//					
//				}else{
//					$('.time-box').css('opacity',0);
//				}
				
				if (_s.attr('data-move') == "y") {
					_s.addClass('backClass');
				}
				_s.on(transitionEnd, function() {
					$('#main').css('opacity',1)
					$('.icon-filp').hide();
				}) 
			}
			
			if (_s.attr('data-move') == "n") {
				M.bookRun = false;
			}

			if (!M.bookRun) {
				return;
			}
			M.bookRun = false;
			
			if(_s.hasClass('runClass')){
				var zIndex =Number($('.tag-box').length) - Number($(this).index());
				_s.removeClass('runClass'); 
				_s.css('z-index',zIndex);
				_s.addClass('backClass').on(transitionEnd, function() {
					_s.css('z-index',zIndex);
				})
				return M.bookRun = true;
			}else{
				if(_s.hasClass('backClass')){
					_s.removeClass('backClass');
				}
				_s.addClass('runClass').on(transitionEnd, function() {
					_s.css('z-index',_s.index())
					_s.next().children('.timeAnim-box').show();
					return M.bookRun = true;
				})
			}
		})


		$(".btn-continu", elPage5).on('touchstart', function (){  
			$('.second-login-gift').hide();
			$('.float-box').css('opacity',1);
			$('#main').css('opacity',0);
			elPage5.show().animatefn({
				effect: "bounceOutUp",
				cb: function (){
					elPage2.show().animatefn({
						effect: "fadeIn"
					});
				}
			})
		})
		$(".btn-go", elPage5).on('touchstart', function (){
//			alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书");
//			return 
			$('.float-box').css('opacity',1);
			$('.chart').css('opacity',1);
			elPage5.show().animatefn({
				effect: "bounceOutUp",
				cb: function (){
					$(".book-closed",elPage3).hide();
					$(".book", elPage3).css("opacity", 1).find(".second-login-gift").siblings().hide();
					$('.chart').show();
					elPage3.show();
					elPage3.css("opacity", 1);
				}
			})
		})

		$('#prev').on('touchstart',function (){
			var i = Z.prev.bind(Z)().getCurIndex();
			M.startime = $("#hour li").eq(i).html();
			Zn.move(i+1)
		});
		$('#next').on('touchstart',function (){
			var i = Z.next().getCurIndex();
			M.startime = $("#hour li").eq(i).html();
			Zn.move(i+1);
		});
		
		$("#btn-sure", elPage3).on('touchstart', function(){
//			alert("活动已结束，活动后续查询关注“易赞”公共账号，回复十点读书");
//			return 
			
			var i = Utils.random(0, moneyArr.length-1);
			RedZ.move(i);
			elArt.html(moneyArr[i][1]);
			$(".red-box").show().find('.red').animatefn({
				effect: "bounceInDown"
			});
			M.money = moneyArr[i][0];
		})

		$("#resertMonet").on('touchstart', M.refreshMoney);

		$("#btn-red").on('touchstart', M.payRed);
		
		$("#closed").on('touchstart',function(){
			$(".red-box").find('.red').animatefn({
				effect: "bounceOutUp",
				cb:function(){
					$(".red-box").hide();
					$('.time-box').addClass('runClass').on('transitionend',function(){
						$('.time-box').attr('data-move','y');
						$('.time-box').hide();
					})
				}
			});
			
		})

		
		$('.chart',elPage3).on('touchstart',function(){
			M.bookRun = false;
		});
		
		elBgSoundImg.on('touchstart', function (){
			if(elBgSoundImg.hasClass("musicPlay")){
	            elBgSoundImg.removeClass("musicPlay")
	            bgS.pause();
	            if(bgSound){
	           	 	bgSound.pause();
	            }
	        }else{
	            elBgSoundImg.addClass("musicPlay")
	            bgS.play();
	            if(bgSound){
	           	 	bgSound.play();
	            }
	        }
		})
		
		$('.second-login-gift').on('touchstart',function(){
			$('#main').css('opacity',1);
			$('.icon-filp').remove();
		})
		$('.chart-btn').on('touchstart',function(){
			location.href = 'http://event.yeezan.com/p_ten/process.html'
		})
		
		$('.rule').on('touchstart',function(){
			var _s = $(this);
			_s.animatefn({
				effect: "fadeOut",
				cb:function(){
					_s.remove()
				}
			})
			$('.chioce').show().animatefn({
				effect: "fadeIn" 
			})
		}) 
	}
}


function setAnimate(ops) {
	ops.el.each(function(index, item) {
		$(item).addClass("animated " + ops.effect + " delay" + 1)
	})
}

function setAnimates(ops) {
	ops.el.each(function(index, item) {
		$(item).addClass("animated " + ops.effect + " delay" + index);
	})
}


function onBridgeReady(ops){
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest', ops,
       function(res){     
//     		alert(res.err_msg);
           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
           		$.post(reqUrl+'pay_result',{'pay_result':1},function(){
           			$(".red-box").find('.red').animatefn({
						effect: "bounceOutUp",
						cb:function(){
							$(".red-box").hide();
							$('.time-box').addClass('runClass').on('transitionend',function(){
								$('.time-box').remove();
							})
						}
					});
           		})
           }else{
           	
           		$.post(reqUrl+'pay_result',{'pay_result':0}); 
      
           		$('#btn-red').attr('click',"false");
           }      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
       }
   );  
}

module.exports = M;