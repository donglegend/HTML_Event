var $ = require("../../components/lib/$");
var Utils = require("../../commonJs/utils");

var elBtn = $("#btn");
var elBtnSub = $("#btnSub");
var elInputBox = $(".input-box");
var elNoData = $(".no-data");

var elUserName = $("input[name='u_name']");
var elUserPhone = $("input[name='u_phone']");
var elUserAdress = $("textarea[name='u_address']");

var reqUrl = 'http://hd.yeezan.com/yz_shidian/api.php?';
// reqUrl = "api/";   


var M = {
	init: function(){
		M.bindEvent();
	},
	
	/* 表单提交 */
	submitFn: function(e){
		e.preventDefault();	
		
		if(!elUserName.val()){
			return elUserName.addClass('warn')
		};
		if(!elUserPhone.val() || !/^1\d{10}$/.test(elUserPhone.val())){
			return elUserPhone.addClass('warn')
		};
		if(!elUserAdress.val()){
			return elUserAdress.addClass('warn')
		};
		
		
		var params = {
			u_name: elUserName.val(),
			u_phone: elUserPhone.val(),
			u_address: elUserAdress.val()		
		}
		
//		$.ajax({
//			type: "post",
//			url: reqUrl+"access_user_info",
//			data: params	,
//			dataType: "json",
//			success: function(){
//				history.go();
//			},
//			error: function(data){
//				var data = JSON.parse(data)
//				alert(data.msg); 
//			}
//		});

		$.get(reqUrl+"access_user_info",params,function(data){
			alert(data)
			if( +data.error == 0){
				alert("ok")
			}else{
				alert(data.msg); 
			}
		},"json")
		
	},
		
	removeWarn: function(){
		if($(this).hasClass('warn')){
			$(this).removeClass('warn');
		}
	},
	
	bindEvent: function(){
		elBtn.on('click',function(){
			elInputBox.show();
			elNoData.hide(); 
		});
		
		elBtnSub.on('click',M.submitFn);
		
		elUserName.on('focus',M.removeWarn);
		elUserPhone.on('focus',M.removeWarn);
		elUserAdress.on('focus',M.removeWarn);
	}
}

module.exports = M;