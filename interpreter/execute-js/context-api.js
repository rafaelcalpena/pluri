module.exports = function(init, firstInstruction, nextInstructions, callback){
	return {
	    done: function(value) {
	        if (typeof value !== 'string') {
	            throw "done must return a string value for function\n" + firstInstruction.scope.join('\n');
	        }
	        init.executeAST(nextInstructions, value, callback)
	    }
	}
}