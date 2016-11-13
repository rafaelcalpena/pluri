module.exports = function(injected){

	var response = injected.response,
	    firstInstruction = injected.firstInstruction;

    return function($){
    	return new Promise(function(resolve, reject){


		    if (typeof response !== "string") {
		        throw 'response must be a string. Got instead ' + typeof response
		    }

		    if (!firstInstruction) {
		    	throw "Execute-step requires a firstInstruction to run";
		    }

		    resolve()

    	})
	}
}		    