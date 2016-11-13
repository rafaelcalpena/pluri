module.exports = function(injected){
	return function($){
		return new Promise(function(resolve, reject){
			var firstInstruction = injected.firstInstruction,
				init = injected.init,
				depsCache = injected.depsCache,
				nextInstructions = injected.nextInstructions,
				callback = injected.callback,
				response = injected.response;

			var functionWrapper = 'var transfer = function(){' + firstInstruction.scope.join('\n') + '}; transfer.apply(this, [])';
		    var contextAPI = require('./context-api.js')(init, firstInstruction, nextInstructions, callback)
		    var pluri = require('./pluri-api.js')(depsCache, nextInstructions, callback, init) 
		    var scopeAPI = require('./scope-api.js')(response, firstInstruction.input, firstInstruction.parentInput, pluri, init.jsGlobals)
		    var indexedMapping = require('./index-object.js')(scopeAPI);
		    var functionConstructorArgs = require('./copy-array-and-extend.js')(indexedMapping, functionWrapper);
		    var fn = require('../construct.js')(Function, functionConstructorArgs);
		    var functionArguments = indexedMapping.items;

		    resolve({fn, contextAPI, functionArguments})

		})
	}
}