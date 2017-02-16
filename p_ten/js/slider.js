var Slider;


var prefixArr = [
	"-webkit-",
	"-moz-",
	"-ms-",
	"-o-",
	""
];

function getStyle(p,v){
	if(!p){
		return;
	}
	var style = "";
	p += "";
	for(var i = 0,len = prefixArr.length; i<len; i++){
		style += prefixArr[i]+p+": translateY("+ v +");";
	}
	return style;
}


Slider = (function (){
	function Slider(ops){
		this.el = ops.el || null;
		this.count = ops.count || 0;
		this.template = ops.template || "";
		this.itemH = 0;
		this.curIndex = ops.curIndex || 0;
		this._init()
	}

	var p = {
		_init: function (){
			if(!this.el)
				return;
			var html = "";
			if(typeof this.template == "function"){
				html = this.template();
			}else{
				html = this.createHtml();
			}

			this.el.html(html);
			this.itemH = this.el.children(":first").height();
			this.move(this.curIndex)
		},
		
		createHtml: function (){
			var h = ""
			for(var i = 0; i<this.count; i++){
				if( i<10 ){
					h += ('<li>0'+i+':00</li>');
				}else{
					h += ('<li>'+i+':00</li>');
				}
				
			}
			return h; 
		},
		getCurIndex: function (){
			return this.curIndex;
		},
		prev: function (){
			if(this.curIndex < this.count-1){
				++this.curIndex;
			}else{
				this.curIndex = 0;
			}
			this.move(this.curIndex);
			return this;
		},
		next: function (){
			if(this.curIndex > 0){
				this.curIndex--;
			}else{
				this.curIndex =this.count-1;
			}
			this.move(this.curIndex);
			return this;
		},
		move: function (n){
			if(n >= this.count){
				n = 0;
			}
			if(n <= -1){
				n = this.count-1;
			}

			var h = n*this.itemH;
			var cssText = getStyle("transform", (-h)+"px");	
			this.el.attr("style", cssText);
			
		}
		
	}

	for(var k in p){
		Slider.prototype[k] = p[k];
	}
	return Slider;
})();

module.exports = Slider;