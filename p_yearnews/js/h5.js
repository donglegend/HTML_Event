var $ = require("../../components/jquery/dist/jquery.min");
var Swiper = require("../../components/iswiper/dist/swiper");
var render = require("../../components/artTemplate/dist/template");
var eventType = require("../../commonJs/eventType");

var ImageManager = require("../../commonJs/ImageManager");
var getImageRes = require("./images");
var ImgRes = getImageRes();

require("./html5_3d_animation");

//加载图表
var echarts = require('echarts/lib/echarts');
// require("echarts/lib/chart/bar");
require('echarts/lib/chart/map');
// require('echarts/lib/component/tooltip');
require('echarts/lib/component/visualMap');
echarts.registerMap('china', require('echarts/map/json/china.json'));

var chartsOps = require("./echart_ops");


var API = require("./api");


var elLoadingBox = $("#loadingBox");


var mySwiper = null,
	barChart = null,
	mapChart = null,
	wxId = getUrlParam("mp_weixin_id") || "";
	wxName = getUrlParam("mp_name") || "公众号年度报告";

document.title = wxName;

var pageCount = $(".swiper .item").length;

var elArrow = $("#arrow");



var M = {
	init: function (){

		M.drawBg();
		ImageManager.load(ImgRes, loadImageResources);
		
	},
	
	startgame: function (){

		elLoadingBox.fadeOut();
		$(".wrap").show();
		
		mySwiper = new Swiper();

		M.getData();

		M.initCharts();

		M.bindEvent();




	},

	drawBg: function (){
		$("#html5_3d_animation").html5_3d_animation({
            window_width: window.innerWidth,
            window_height: window.innerHeight,
            window_background: '#072845',
            star_count: '1000',
            star_color: '#fff',
            star_depth: '100'
        });
	},

	getData: function (){
		$.ajax({
		  url: API.data,
		  data: {
		  	mp_weixin_id: wxId
		  },
		  dataType: "json"
		}).done(function (data){
			if(!data || (data && +data.error != 0)){
				return alert(data.msg || "request msg error!");
			}

			M.renderHtml(data.data || {});

			M.renderMap(data.data.fans_province_distribution);
		}).fail(function (data){
			alert("request error!");
		})
	},


	initCharts: function (){
		// barChart = echarts.init(document.getElementById('mothlist'));
		// barChart.setOption(chartsOps.barOption);

		mapChart = echarts.init(document.getElementById('mapArea'));
		mapChart.setOption(chartsOps.mapOption);
	},


	// renderMoth: function (){

	// },

	renderMap: function (data){

		var res = M.transformMapData(data);

		if(!res){
			return false;
		}

		mapChart.setOption({
	        series: [{
	            name: 'mpfans',
	            data: res
	        }]
	    });

	},

	transformMapData: function (data){
		var len;
		if(!data || (len = data.length) <=0 ){
			return false;
		}
		var arr = [];
		var o = {};
		for(var i = 0; i<len; i++){
			var temp = data[i];
			o = {};
			o['name'] = temp.province || "";
			o['value'] = parseInt(temp.percent || 0) * 10;
			arr[i] = o;
		}
		arr[i] = {
			name: "南海诸岛",
			value: 0
		}
		return arr;
	},

	renderHtml: function (data){

		for(var i = 1; i<6; i++){
			var h1 = render("tem_p"+i, data) || "";
			$("#p"+i+"Text").html(h1);
		}
		
	},

	bindEvent: function (){
		$("#btnReview").on(eventType.touchend, function (){
			mySwiper.go(0)
		})

		mySwiper.on("swiped", function (prev, current){
			if(current >= pageCount - 1){
				elArrow.fadeOut();
			}else{
				elArrow.fadeIn();
			}
		})
	}
}


function loadImageResources(number) {
	var per = Math.ceil(number / ImgRes.length * 100) + "%";

 	// elLoadingPer.text("loading..."+per);
 	elLoadingBox.find(".t").text(per);
    if(number < ImgRes.length) {
        return false;
    }


    
 	// var el = elLoadingBox;

 	// setTimeout(function (){
 	// 	movefn({
	 // 		el: el,
	 // 		effect: "slideOutUp",
	 // 		cb: function (){
	 // 			el.remove();
	 // 			elPage1.show();
	 // 		}
	 // 	});
 	// }, 100)
 	
	M.startgame();

}

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) {
		return decodeURIComponent(r[2]); 
	}
	return null;
} 



M.init()