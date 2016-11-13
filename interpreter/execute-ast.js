module.exports = function(init){

	return function(ast, response, callback) {

		var checkIfShouldContinue = init['checkIfShouldContinue'];
		var checkIfresponseIsString = init['executeAST.checkIfresponseIsString']({response});
		var separateFirstInstruction = init['executeAST.separateFirstInstruction']({ast});
		var checkIfProgramEnded = init['executeAST.checkIfProgramEnded']({callback});
		var proceedToInstruction = init['executeAST.proceedToInstruction']({init, response, callback});

		checkIfShouldContinue().
		then(checkIfresponseIsString)
		.then(separateFirstInstruction)
		.then(checkIfProgramEnded)
		.then(proceedToInstruction)

	}
}