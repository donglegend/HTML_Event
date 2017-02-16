// var $ = require("../../components/zepto/zepto");
var $ = require("../../components/jquery/dist/jquery.min");
var jqForm = require("../../components/lib/jquery.form");
var Swiper = require("../../components/mySwiper/dist/swiper.js");

var EXIF = require("../../components/exif-js/exif");

var elBtnCreate = $("#btn-create");
var mySwiper;


var loading=$(".loadEffect");

var elBtnRed = $("#btn-red");

var elStage = $("#stage");

var elPersonBox = $("#personBox");
var elImg = $("img", elPersonBox);
var elMpName = $("#mpName");

var clsn = "error";

var posturl = 'http://hd.yeezan.com.cn/interface/save_image.php';

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

var userAgent = navigator.userAgent;

function swiper(){
	var swiperOps = {
		direction : "vertical",
		elastic: 1
	}
	mySwiper = new Swiper(swiperOps);
}

var WxShare;


var isAndroid = /Android (\d+\.\d+)/.test(navigator.userAgent);



var M = {

	init: function (p){
		// swiper();
		WxShare = p || null;
		M.bindEvent();
	},

	localIds: "",

	getFileUrl: function (obj){
		var url; 
		if (userAgent.indexOf("MSIE")>=1) { // IE 
			url = obj.value; 
		} else if(userAgent.indexOf("Firefox")>0) { // Firefox 
			url = window.URL.createObjectURL(obj.files.item(0)); 
		} else if(userAgent.indexOf("Chrome")>0) { // Chrome 
			url = window.URL.createObjectURL(obj.files.item(0)); 
		} else if(userAgent.indexOf("Safari") >= 1){
			url = window.URL.createObjectURL(obj.files.item(0));
		}else{
			url = obj.value; 
		}
		return url; 
	},

	uploadImg: function (){
		elImg.removeClass(clsn);
		var self = $(this);
		var v = self.val();
		// alert(v)
		if(!v){
			return ;
		}



		

		
		var file = self[0].files;


		var reader = new FileReader();
			
		var mime_type = "image/jpeg";
		var quality = 50;
		reader.onload = function (){
			var result = this.result;
			M.localIds = result;
			elImg.attr("src", result);
			elImg.attr("data-val", "1");
			return ;
		}
		reader.readAsDataURL(file[0])

		// return ;

		// if(Math.floor(Number(file[0].size)) < 200000){
		// 	M._upload({
		// 		src: v
		// 	})
		// }else{
		// 	var url = M.getFileUrl(self[0]) || ""; 
		// 	var img = new Image();
			
		// 	img.onload = function(){

		// 		elImg.attr('src', url);
		//         elImg.attr('data-val', url);
		//         return ;
	 //        	var w = img.width;
	 //        	var h = img.height;
	 //        	console.log(w, h)
		// 	    var tCanvas = document.createElement("canvas");
		// 		tctx = tCanvas.getContext("2d");
		// 		tctx.drawImage(img, 0, 0);

		// 		var newurl = tCanvas.toDataURL("image/jpeg", .5);
		// 		loading.show();
		// 		$.post(posturl, {image: newurl}, function (data){
		// 			var data = JSON.parse(data);
		//     		loading.hide();
		//     		elImg.attr('src', data.image);
		//         	elImg.attr('data-val', data.image);
		//         });
			    
		// 	}
		// 	img.src = url || "";
		// }

		


		/*
		
		if(Math.floor(Number(file[0].size)) < 200000){
			M._upload({
				src: v
			})
		}else{
			var reader = new FileReader();
			
			var mime_type = "image/jpeg";
			var quality = 50;
			reader.onload = function (){
				var result = this.result;
				var dImg = new Image();
				dImg.src = result;

				var cvs = document.createElement('canvas');
				cvs.width = dImg.width;
				cvs.height = dImg.height;

				

				cvs.getContext("2d").drawImage(dImg, 0, 0);
				var newImageData = cvs.toDataURL(mime_type, .5);
				loading.show();
				$.post(posturl, {image: newImageData}, function (data){
					loading.hide();
					var data = JSON.parse(data);
					alert(data.image)
					elImg.attr('src', data.image);
		        	elImg.attr('data-val', data.image);
		        });
			}
			reader.readAsDataURL(file[0]);
			
		}

		*/
		
	},


	_upload: function (ops){
		loading.show();

		// var options = {
		//     url: posturl, //跳转到相应的Action  
		//     type: "POST", //提交方式 
		//     data: {
		//     	'type': 'img'
		//     },
		//     dataType: "json", //数据类型 
		//     success: function(data) {
		//     	loading.hide();
		//     	elImg.attr('src', data.image);
		//         elImg.attr('data-val', data.image);
		//     }
		// };

		var options = {  
	        url:posturl,
	        type: "POST",
	        beforeSubmit:  $.noop,  //提交前处理 
	        success: function(data) {
		    	loading.hide();
		    	elImg.attr('src', data.image);
		        elImg.attr('data-val', data.image);
		    },  //处理完成 
	        resetForm: true,  
	        dataType:  'json'  
	    }; 


		$("#personForm").ajaxSubmit(options);
		
	},

	createImg: function (){
		elImg.removeClass(clsn);
		elMpName.removeClass(clsn);
		var url = elImg.attr("data-val");
		if(!url){
			return elImg.addClass(clsn);
		}
		var name = elMpName.val();
		if(!name){
			return elMpName.addClass(clsn);
		}



		var c = document.getElementById("mycanvas");  
		c.width = 600;
		c.height = 940;
		var W = c.width, H = c.height;
		var cxt = c.getContext("2d");  
		var img = new Image();
		
		loading.show();
		img.onload = function() {
			// cxt.drawImage(img, -2, -1, 310, 474);  
			cxt.drawImage(img, -3, -1, 610, 948);    

	        cxt.font = "16px Arial";  
	        cxt.fillStyle="#787878"; 
	        cxt.textBaseline = "middle"; 

	        var _t = 0; 
	        if(isAndroid){
	        	_t = 36;
	        }else{
	        	_t = 35;
	        }
	        cxt.fillText(name, 235*2-3, _t*2+14, 50*2);

	        var img2 = new Image();
	        img2.onload = function (){
	        	var dir = 1, degree = 0;
	        	var p1={x:0,y:0}, p2={x:0, y:0}
	        	
	        	EXIF.getData(img2, function() {
		            dir = EXIF.getTag(this, 'Orientation');
		        });
		        
		        switch (dir) {
		        	case 3:
		        		degree = 180;
		        		p1 = {
							x: 221,
							y: 26
		        	 	}
		        	 	p2 = {
							x: 100,
							y: 428
		        	 	}
		        	break;
		        	//iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
		        	case 6:
		        		degree = 90;
						p1 = {
							x: 218,
							y: 32
		        	 	}
		        	 	p2 = {
							x: 84,
							y: 432
		        	 	}
		        	break;

		        	case 8:
		        		degree = 270;
		        		p1 = {
							x: 214,
							y: 19
		        	 	}
		        	 	p2 = {
							x: 96,
							y: 410
		        	 	}
		        	break;

		        	default: 
		        	 	degree = 0;
		        	 	p1 = {
							x: 210,
							y: 26
		        	 	}
		        	 	p2 = {
							x: 80,
							y: 415
		        	 	}
		        	break;

		        }
				
			
				
		        cxt.save();
		        cxt.translate(226*2, 36*2);
		        cxt.rotate(degree * Math.PI / 180);
		        cxt.translate(-226*2, -36*2);
		        cxt.drawImage(img2, p1.x*2 - 4, p1.y*2+6, 20*2, 20*2);
		        cxt.restore();


		        


				cxt.save();
				cxt.translate(96*2, 426*2);
				cxt.rotate((degree-15)*Math.PI/180);
				cxt.translate(-96*2, -426*2);

				cxt.beginPath();
				cxt.arc((p2.x+5)*2, (p2.y+5)*2, 6*2, 0, Math.PI * 2, true);
				cxt.closePath();
                cxt.clip();

				cxt.drawImage(img2, (p2.x-1)*2, (p2.y-1)*2, 12*2, 12*2);  
				cxt.restore();

				var newurl = c.toDataURL("image/jpeg", 1);
				if(!isAndroid){
					$(".floor2 .save").attr("src", newurl);
		    		loading.hide();
		    		$(c).hide();
		    		M.setStyle(1);
				}else{
					$.post(posturl, {image: newurl}, function (data){
						var data = JSON.parse(data);
						$(".floor2 .save").attr("src", data.image);
			    		loading.hide();
			    		$(c).hide();
			    		M.setStyle(1);
			        });
				}
	        }
	        img2.src = M.localIds;

			// drawPerson();
	    }
	    img.setAttribute('crossOrigin', 'anonymous');
		img.src="images/d_canvas.png"; 


		function drawPerson(){
			var img2 = new Image();
			img2.onload = function() {
				alert("load");
				cxt.drawImage(img2, 210, 26, 20, 20);

				cxt.save()
				cxt.rotate(-15*Math.PI/180);
				cxt.translate(-114, 8);
				cxt.drawImage(img2, 80, 415, 12, 12);  
				cxt.restore();

				var newurl = c.toDataURL("image/jpeg", .8);
				if(!isAndroid){
					$(".floor2 .save").attr("src", newurl);
		    		loading.hide();
		    		$(c).hide();
		    		M.setStyle(1);
				}else{
					$.post(posturl, {image: newurl}, function (data){
						var data = JSON.parse(data);
						$(".floor2 .save").attr("src", data.image);
			    		loading.hide();
			    		$(c).hide();
			    		M.setStyle(1);
			        });
				}
				
		    }
		    img2.setAttribute('crossOrigin', 'anonymous');
		    img2.crossOrigin = "*";
			img2.src = elImg.attr('src');
			
		}

		WxShare && M.setShare(name);
		
	},

	random: function (n, m){
		var c = m-n+1;  
    	return Math.floor(Math.random() * c + n);
	},

	setShare: function (name){
		var arr = [
			"李彦宏关注了我的微信公众账号/"+name,
			"数博会大佬溜号看"+name,
			"自从李彦宏关注"+name+"，平台暴涨万粉"
		];
		var n = M.random(0, 2);
		WxShare.wx_config.title = arr[n];
		WxShare.setShareInfo(WxShare.wx_config);
	},

	setStyle: function (n){
		var _h = elStage.height();
		var _s = "translate3d(0, -" + n*_h + "px, 0)";
		elStage.css({
			'-webkit-transform': _s,
			'transform': _s
		})
	},

	bindEvent: function (){

		$("input", elPersonBox).on("change", M.uploadImg);
		elBtnCreate.on(touchstart, M.createImg);
		elMpName.on("input", function (){
			$(this).removeClass(clsn)
		});
		// elBtnRed.on(touchstart, function (){
		// 	 M.setStyle(2);
		// })

	}
}


module.exports = M;