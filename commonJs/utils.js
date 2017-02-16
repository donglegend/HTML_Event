/**
 * 工具函数
 */
var Utils = {
	isArray: function (arg){
		if (!Array.isArray) {
		    return Object.prototype.toString.call(arg) === '[object Array]';
		}
		return Array.isArray(arg);
	},
	isNullObj: function (obj){
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				return false;
			}
		}
		return true;
	},
	random: function (n, m){
		var c = m-n+1;  
    	return Math.floor(Math.random() * c + n);
	}
}

module.exports = Utils;