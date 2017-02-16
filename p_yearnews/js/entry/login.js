var $ = require("../../../components/jquery/dist/jquery.min");
var API = require("../api");

var WxShare = require("../share");
WxShare.init();

$(function (){

	var elForm = $("#form-login"),
		elPhone = $("[name='u_phone']",elForm),
		elPwd = $("[name=u_password]", elForm),
		elMask = $(".mask");

	var rule = {
		u_phone: /^1\d{10}$/,
		u_password: 6
	}

	var T  = {
		"0": "您输入的手机号、密码有误，请核对您的手机号密码",
		"1": "对不起，当前用户没有可用的报告"
	}


	function showTip(text){
		elMask.html('<p class="tip">'+text+'</p>').fadeIn();

		setTimeout(function (){
			elMask.fadeOut();
		}, 2000)
	}

	var isloging = false;


	elForm.on("submit", function (ev){

		if(isloging){
			return ;
		}

		ev && ev.preventDefault();

		var phone = elPhone.val(),
			pwd = elPwd.val();

		if(rule.u_phone.test(phone) && pwd.length >= 6){
			isloging = true;
			$.ajax({
				method: "post",
				url: API.login,
				data: {
					u_phone: phone,
					u_password: pwd
				}
			}).done(function (data){
				if(+data.error === 0){
					location.href = "/mobile/event/reportList";
				}else{
					showTip(data.msg || "很抱歉,请重新登录!");
					isloging = false;
				}
			}).fail(function (data){
				showTip("登录失败！");
				isloging = false;
			})
		}else{
			showTip(T["0"]);
		}

	})

});
