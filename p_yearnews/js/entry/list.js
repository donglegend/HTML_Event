var $ = require("../../../components/jquery/dist/jquery.min");
var render = require("../../../components/artTemplate/dist/template");
var API = require("../api");

var WxShare = require("../share");
WxShare.init();

$(function (){

	var elBox = $("#box");



	var M = {

		init: function (){
			M.getData();
		},

		getData: function (){
			$.ajax({
				url: API.list,
				dataType: "json"
			}).done(function (data){
				if(+data.error != 0){
					alert(data.msg);
					return;
				}

				M.renderHtml(data.data);

			}).fail(function (data){
				alert("request error!");
			})
		},


		renderHtml: function (data){
			var html = "";
			if(data.unavailable && data.unavailable.length == 0 && data.available && data.available.length == 1){
				html = render("temone", data);
			}else{
				html = render("temtwo", data);
			}
			elBox.html(html);

		}

	}


	M.init();

});