module.exports = function(injected){
	return function(){
		return new Promise(function(resolve, reject){

			var response = injected.response;

			if (typeof response !== "string") {
			    throw 'response for execute must be a string';
			}
			resolve();
		})
	};
}