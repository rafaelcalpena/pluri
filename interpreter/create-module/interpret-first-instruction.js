module.exports = function(injected){

	var init = injected.init,
	    firstInstruction = injected.firstInstruction,
	    response = injected.response,
	    nextInstructions = injected.nextInstructions,
	    callback = injected.callback,
	    depsCache = injected.depsCache;

    return function($){
    	return new Promise(function(resolve, reject){

		    /* interpret first instruction */
		    if (firstInstruction.module === "create") {

		    	var createModule = init['createModule']({firstInstruction, init});
		    	var proceedToNextInstruction = init['createModule.proceedToNextInstruction']({init, nextInstructions, callback})
		    	createModule().then(proceedToNextInstruction);

		    } else if (firstInstruction.module === "javascript") {

		        var executeJS = init['executeJS'](firstInstruction, init, depsCache, nextInstructions, callback, response);
		        executeJS();

		    } else {

		        var executeModule = init['executeModule'](firstInstruction, init, depsCache, nextInstructions, callback, response);
		        executeModule();
		    }

    	})
	}
}		    		    