define(function(require, exports, module) {
	var $ =require('jquery');
	
	//console.log(require('jquery'));
    function hello(){
    	$("#hello").html('<h1>hello word!</h1>');
    }
    exports.a=hello;
});