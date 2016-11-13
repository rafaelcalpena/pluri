module.exports = function(injected) {
	return function($){
		return new Promise(function(resolve, reject){	

			var init = injected.init,
				response = injected.response,
				callback = injected.callback;			

			var firstInstruction = $.firstInstruction,
				nextInstructions = $.nextInstructions;

		    init.executeStep(
		        firstInstruction,
		        nextInstructions,
		        response,
		        callback
		    );	
	    })		
	}
}