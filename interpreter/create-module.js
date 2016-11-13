module.exports = function(injected){

	var firstInstruction = injected.firstInstruction,
	    init = injected.init;

    return function($){

    	return new Promise(function(resolve, reject){

	    	var title = firstInstruction.scope[0];
		    firstInstruction.scope.shift();
		    var instructions = firstInstruction.scope;
		    init.pluriModules[title] = instructions;
		    response = 'created: true';
		    resolve({response});

    	})


	}
}