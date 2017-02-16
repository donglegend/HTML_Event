var Utils = require("../../commonJs/utils");

var W = window.innerWidth, H = window.innerHeight;

var Star = (function (){

	function Star(ops){
		this.el = ops.el || null;
		this.count = Number(ops.count) || 0;

		this.init();
	}

	Star.prototype = {
		init: function (){
			this.createDom();
		},
		createDom: function (){
			var self = this;
			var el = self.el;
			if(!el){
				return ;
			}
			if(self.count <= 0){
				return ;
			}
			var html = "";
			
			for(var i = 0; i<self.count; i++){
				var n = Utils.random(1, 8);
				var d = Utils.random(1, 5);
				html += "<div class='xing animated infinite delay"+d+" xing"+n+" duration"+n+"'></div>";
			}
			
			// for(var i = 0; i<self.count; i++){
			// 	var pos = self.getPos();
			// 	var scale = (Math.random()*2 + 0.3).toFixed(1);
			// 	var transform = "scale3d("+scale+", "+scale+","+scale+") translate3d(" + pos.x + "px, "+ pos.y +"px, 0)";
			// 	var style = "-webkit-transform: "+ transform + "; transform: "+transform+";";
			// 	html += "<div class='xing animated infinite delay"+Utils.random(1, 8)+"' style='"+style+"'></div>"
			// }
			el.html(html);
		},

		getPos: function (){
			return {
				x: Utils.random(0, W),
				y: Utils.random(-400, -200)
			}
		}
	}

	return Star;

})();

module.exports = Star;