module.exports = function(injected){
	return function($){
		return new Promise(function(resolve, reject){

			var fn = $.fn,
				contextAPI = $.contextAPI,
				functionArguments = $.functionArguments;

			var firstInstruction = injected.firstInstruction;

		    try {
		        var exec = fn.apply(contextAPI, functionArguments)
		    } catch (err) {
		        console.log('ERROR WHILE EXECUTING JAVASCRIPT:\n MODULE:', firstInstruction, '\n', err)
		    }
		})
	}
}

