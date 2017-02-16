
(function (){

	if (!Array.prototype.map) {

	  Array.prototype.map = function(callback, thisArg) {

	    var T, A, k;

	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }

	    // 1. Let O be the result of calling ToObject passing the |this| 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal 
	    //    method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    if (arguments.length > 1) {
	      T = thisArg;
	    }

	    // 6. Let A be a new array created as if by the expression new Array(len) 
	    //    where Array is the standard built-in constructor with that name and 
	    //    len is the value of len.
	    A = new Array(len);

	    // 7. Let k be 0
	    k = 0;

	    // 8. Repeat, while k < len
	    while (k < len) {

	      var kValue, mappedValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal 
	        //    method of O with argument Pk.
	        kValue = O[k];

	        // ii. Let mappedValue be the result of calling the Call internal 
	        //     method of callback with T as the this value and argument 
	        //     list containing kValue, k, and O.
	        mappedValue = callback.call(T, kValue, k, O);

	        // iii. Call the DefineOwnProperty internal method of A with arguments
	        // Pk, Property Descriptor
	        // { Value: mappedValue,
	        //   Writable: true,
	        //   Enumerable: true,
	        //   Configurable: true },
	        // and false.

	        // In browsers that support Object.defineProperty, use the following:
	        // Object.defineProperty(A, k, {
	        //   value: mappedValue,
	        //   writable: true,
	        //   enumerable: true,
	        //   configurable: true
	        // });

	        // For best browser support, use the following:
	        A[k] = mappedValue;
	      }
	      // d. Increase k by 1.
	      k++;
	    }

	    // 9. return A
	    return A;
	  };
	}


})();




function getImageRes(){
	var baseUrl = "images/";
	var arr = [
		{
			id: "bg",
			src: "bg.jpg"
		},
		{
			id: "logo_0",
			src: "logo_0.png"
		},
		{
			id: "star",
			src: "star.png"
		},
		{
			id: "p1_1",
			src: "p1_1.png"
		},
		{
			id: "p1_2",
			src: "p1_2.png"
		},
		{
			id: "p1_name",
			src: "p1_name.png"
		},
		{
			id: "p2_1",
			src: "p2_1.png"
		},
		{
			id: "p3_btn1",
			src: "p3_btn1.png"
		},
		{
			id: "p3_btn2",
			src: "p3_btn2.png"
		},
		{
			id: "p3_line",
			src: "p3_line.png"
		},
		{
			id: "bgblur",
			src: "bgblur.jpg"
		},
		{
			id: "p5_1",
			src: "p5_1.png"
		},
		{
			id: "p5_2",
			src: "p5_2.png"
		},
		{
			id: "voicebo2",
			src: "voicebo2.gif"
		},
		{
			id: "up",
			src: "up.png"
		},
		{
			id: "yeezancode",
			src: "yeezancode.png"
		}
	];
	var res = arr.map(function (item){
		item.src = baseUrl + item.src;
		return item;
	})
	return res;
}

module.exports = getImageRes;
