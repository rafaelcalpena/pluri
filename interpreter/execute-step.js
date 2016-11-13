var depsCache = {
	pluriParser: require('../parser/pluri-parser.js')
};

module.exports = function(init){
	return function(firstInstruction, nextInstructions, response, callback) {

		var checkIfParametersAreValid = init['createModule.checkIfParametersAreValid']({firstInstruction, response, init});

	    var interpretFirstInstruction = init['createModule.interpretFirstInstruction']({init, depsCache, firstInstruction, nextInstructions, response, callback});

	    checkIfParametersAreValid().then(interpretFirstInstruction)

	    
	}
}