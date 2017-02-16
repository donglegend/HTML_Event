var $ = require("../../components/lib/$");
var reqUrl = "http://hd.yeezan.com/yz_shidian/api.php?to_read_pay"; 
// api/pay

var elToast = $(".toast");

function pay(params){
	$.post(reqUrl, function (data){
		if(+data.error == 0){
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				onBridgeReady(data.data.js_param, params.cb || $.noop);
			}
		}else{
			showMsg("很抱歉，请求微信支付参数出错!")
		}
	}, "json")
}

function showMsg(text){
	elToast.html(text).show();
	setTimeout(function (){
		elToast.hide();
	}, 2000)
}


function onBridgeReady(ops, cb) {
	WeixinJSBridge.invoke(	
		'getBrandWCPayRequest', ops,
		function(res) {
			if (res.err_msg == "get_brand_wcpay_request:ok") {
				typeof cb == 'function' && cb();
			} else {
				showMsg("很抱歉，支付失败!")
			} 
		}
	);
}


module.exports = {
	pay: pay
}
