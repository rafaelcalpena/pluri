module.exports = function(injected){
	return function(){
		return new Promise(function(resolve, reject){

			var ast = injected.ast;

		    var firstInstruction = ast[0];
		    ast.shift();
		    var nextInstructions = ast;
		    resolve({firstInstruction, nextInstructions});
		})
	}
}