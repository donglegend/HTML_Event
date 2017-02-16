/**
 * time: Tue Dec 06 2016 11:08:56 GMT+0800 (CST)
 * site: http://event.yeezan.com
 * contact: http://donglegend.com/
 * fn: 模块化的微信js分享，这里的zepto注意 修改源码导出接口
 */
// var $ = require("../components/zepto/zepto");
var $ = require("../components/jquery/dist/jquery.min");

var WxShare = (function (WIN, DOC){

	function Share(config){
		this.wx_config = config || "";
		/*config = {
			title: "",
			desc: "",
			link: "",
			imgUrl: "",
			useOptionMenu: false //是否隐藏右上角菜单
		}*/
	}
	var p = {

		getUrl: function (){
			var url = "http://hd.yeezan.com/get_sign.php";
			var href = WIN.location.href;
			var shareurl = url + "?url=" + encodeURIComponent(href);
			return shareurl;
		},

		setWxInfo: function (wx_config, share_info){
			var self = this;
			wx.config({
				debug: false, 
				appId: wx_config.appId, 
				timestamp: wx_config.timestamp, 
				nonceStr: wx_config.nonce, 
				signature: wx_config.signature,
				jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems', 'chooseImage']        
			});
			
			wx.ready(function(){

				if(!share_info.useOptionMenu){
					wx.hideOptionMenu();
					return ;
				}

				self.setShareInfo(share_info)
				// wx.onMenuShareTimeline({
				//   title: share_info.title, 
				//   link: share_info.link, 
				//   imgUrl: share_info.imgUrl, 
				//   success: function () { 
				//   },
				//   cancel: function () { 
				  	
				//   }
				// });
				
				// wx.onMenuShareAppMessage({
				//   title: share_info.title, 
				//   desc: share_info.desc, 
				//   link: share_info.link, 
				//   imgUrl: share_info.imgUrl, 
				//   type: '', 
				//   dataUrl: '', 
				//   success: function () { 
				  	
				//   },
				//   cancel: function () { 
				  	
				//   }
				// });
			});
			/*
			wx.hideAllNonBaseMenuItem();
			wx.showMenuItems({
			    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite'] // 要显示的菜单项，所有menu项见附录3
			});
			*/
			wx.error(function(res){

			});
		},

		getConfigInfo : function (){
			var self = this;
			var url = self.getUrl();

			$.get(url, function (data){
				if(!data) return;
				var wx_config = JSON.parse(data);
				self.setWxInfo(wx_config, self.wx_config);
			})

		},

		setShareInfo: function (share_info){
			wx.onMenuShareTimeline({
			  title: share_info.title, 
			  link: share_info.link, 
			  imgUrl: share_info.imgUrl, 
			  success: function () { 
			  },
			  cancel: function () { 
			  	
			  }
			});
			
			wx.onMenuShareAppMessage({
			  title: share_info.title, 
			  desc: share_info.desc, 
			  link: share_info.link, 
			  imgUrl: share_info.imgUrl, 
			  type: '', 
			  dataUrl: '', 
			  success: function () { 
			  	
			  },
			  cancel: function () { 
			  	
			  }
			});
		},

		init: function (){
			this.getConfigInfo();
		}
	}

	for(var k in p){
		Share.prototype[k] = p[k];
	}

	return Share;

})(window, document);

module.exports = WxShare;


