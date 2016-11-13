module.exports = function(firstInstruction, init, depsCache, nextInstructions, callback, response){

	return function(){

		var createJavascriptFunction = init['executeJS.createJavascriptFunction']({firstInstruction, init, depsCache, nextInstructions, callback, response});
		var runJavascriptFunction = init['executeJS.runJavascriptFunction']({firstInstruction})
		
		createJavascriptFunction().
		then(runJavascriptFunction)

	}
}