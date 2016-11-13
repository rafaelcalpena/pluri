var callModules = {};
var Call = function(module){

	return function(){

		if (typeof callModules[module] !== "undefined"){
			callModules[module].apply(null, arguments);
		} else {
			console.log('no module registered: ', module);
		}

	}
}
Call.create = function(name, fn){
	if (typeof callModules[name] !== "undefined"){
		return;
	}
	callModules[name] = fn;
}

module.exports = Call;