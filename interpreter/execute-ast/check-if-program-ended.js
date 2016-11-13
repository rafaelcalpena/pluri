module.exports = function(injected){
	return function($){
		return new Promise(function(resolve, reject){

			var callback = injected.callback;

			var firstInstruction = $.firstInstruction,
				nextInstructions = $.nextInstructions;

			if (typeof firstInstruction === "undefined") {
		        if (typeof callback === "function") {
		            callback(response);
		        }
		        return;
		    }
		    resolve({firstInstruction, nextInstructions});
		})
	}
}