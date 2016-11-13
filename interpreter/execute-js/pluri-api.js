module.exports = function(depsCache, nextInstructions, callback, init){
	return {
	        evaluateNext: function(text) {
	            var instructions = depsCache.pluriParser.parse(text);
	            for (var i = 0, j = instructions.length; i < j; i++) {
	                nextInstructions.splice(i, 0, instructions[i]);
	            }
	        },
	        evaluateBranch: function(text, finalCallback) {
	            var branches = depsCache.pluriParser.parse(text);
	            var mainCallback = callback;
	            var remainingCallbacks = branches.length;
	            for (var i = 0, j = branches.length; i < j; i++) {


	                init.executeAST([branches[i]], '', function(lv) {
	                    remainingCallbacks--;
	                    if (remainingCallbacks === 0) {
	                        finalCallback(lv);
	                    }
	                });

	            }
	        },
	        onProgramStopped: function(fn){
	        	init['programStoppedQueue'].push(fn);
	        }
	}
}