	var $ = require("../../components/zepto/zepto");
	var WxShare = require("./share");
	var btn=$(".btn");
	var imgBox=$(".img-box");
	var del=$(".del");
	var tip=$(".tip");
	var inputV=$(".inner-box input");
	var loading=$(".loadEffect");
	

	WxShare.init();
	
	var House=M={
		
		init:function(){
			M.bindEvent();
			M.meta();
		},
		
		meta:function(){
			if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
				var version = parseFloat(RegExp.$1);
				if(version>2.3){
					var phoneScale = parseInt(window.screen.width)/640;
					document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
				}else{
					document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
				}
			}else{
			document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-			dpi">');
			}
		},
		
		drowCanvas:function(){
			
			var Name=inputV.val();
			var myData=new Date();
			var houseData=myData.getFullYear()+"-"+(Number(myData.getMonth())+1)+"-"+myData.getDate();
			$("<div>").addClass("mask").appendTo("body");
			if(imgBox.hasClass("hid")){
				imgBox.removeClass("hid");
			};
			if(tip.hasClass("hid")){
				tip.removeClass("hid");
			};
			
			
			/* 插入图片和文字 */			
			var c = document.getElementById("mycanvas");  
    		var cxt = c.getContext("2d");  
    		var img = new Image();
    		img.src="images/houseCard.jpg"; 
    		loading.show();
    		img.onload = function () {  
        		cxt.drawImage(img, 0, 0,500,600);  
        		cxt.fillStyle = "#333";  
		        cxt.font = "500 12px STSong";  
		        cxt.textBaseline = "top";  
		        cxt.fillText(Name, 180, 100);
		        cxt.fillText(houseData, 175, 220);
		        var newurl = c.toDataURL("image/jpeg", 0.5);			
		    		$.post("http://hd.weixiezuo.com.cn/interface/save_image.php", {image: newurl}, function (data){
		    			var data = JSON.parse(data);
		        		$(".img-box img").attr("src", data.image);		
		        		loading.hide();
		        });
		        
   			 };	   			
   			imgBox.addClass("show");
			tip.addClass("show");
			$(c).addClass("hid");
		},

		delFn:function(){
			imgBox.addClass("hid");
			$(".mask").remove();
			tip.addClass("hid");
		},
		
		bindEvent:function(){
			var ct;
			if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
				ct="touchend";
			}
			else {
				ct="click";
			}
			del.live(ct,M.delFn);		
			btn.live(ct, M.drowCanvas) 
		}
	}
	
	House.init()
