var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

var M, Lock;

var Lock = (function (){
	function Lock(ops){
		this.el = ops.el;
		this._start = {};
		this._move = {};
		this._end = {};
		this.isMouseDown = false;
		this._elastic = 2;
		this.duration = 0.3;
		this.threshold = 100;
		this.cb = ops.cb || function (){}

		this.bindEvent();
	}

	Lock.prototype = {
		getPos: function (e){
			var touch = {};
	        touch.target = e.changedTouches ? e.changedTouches[0].target : e.target;
	        touch.x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
	        touch.y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
	        return touch;
		},
		bindEvent: function (){
			var self = this;
			var W = self.el.width();
			var el = self.el[0];


			el.addEventListener(touchstart, function (e){
				self.isMouseDown = true;

				el.style["-webkit-transition"] = "none";
				el.style.transition = "none";

		  		var touch = self.getPos(e);
		        self._start.x = touch.x;
		        self._start.y = touch.y;
			})

			el.addEventListener(touchmove, function (e){
				e.preventDefault();
				if(!self.isMouseDown){
					return;
				}
		  		var touch = self.getPos(e);
		        self._move.x = touch.x;
		        self._move.y = touch.y;

		        var distance = Math.floor((self._move.x - self._start.x)/self._elastic);
		        var transform = "translate3d(" + distance + "px, 0, 0)";
		        
		        // if(distance <= 0){
		        // 	return ;
		        // }
		        el.style['-webkit-transform'] = transform;
	            el.style.transform = transform;

			})
			el.addEventListener(touchend, function (e){
				self.isMouseDown = false;
				var touch = self.getPos(e);
		        self._end.x = touch.x;
		        self._end.y = touch.y;
		        var distance = Math.floor((self._end.x - self._start.x)/self._elastic);
		        
		        var transform = "";
		        var duration = self.duration + "s";
		        var locked = false;
		        if(distance > self.threshold){
		        	transform = "translate3d(" + W + "px, 0, 0)";
		        	locked = true;
		        }else{
		        	transform = "translate3d(0, 0, 0)";
		        }
		        el.style['-webkit-transition'] = duration;
			    el.style.transition = duration;
				el.style['-webkit-transform'] = transform;
			    el.style.transform = transform;

			    el.addEventListener("webkitTransitionEnd", function (e){
			    	if (e.target !== el) {
		                return false;
		            }
		            if(locked){
		            	self.cb && self.cb();
		            	el.remove();
		            }
			    })
			})
		}
	}


	return Lock;

})();

module.exports = Lock;