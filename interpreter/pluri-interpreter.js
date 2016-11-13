"use strict";

/* 
  Pluri Language
*/





module.exports = function(jsGlobalsInitial){
	return function(jsGlobals, customMethods){

		var init = {};
		var methods = {};

		init.tree = [];

		init.executeAST = methods.executeAST || require('./execute-ast.js')(init);

		init.executeString = methods.executeString || require('./execute-string.js')(init);

		init.executeStep = methods.executeStep || require('./execute-step.js')(init);

		init.jsGlobals = jsGlobalsInitial || {};

		init.pluriModules = {};



		if (typeof jsGlobals !== 'undefined'){
			init.jsGlobals = jsGlobals;
		}
		methods = customMethods || {};

		/* executeAST */
		init['executeAST.checkIfresponseIsString'] = require('./execute-ast/check-if-last-argument-is-string.js');
		init['executeAST.separateFirstInstruction'] = require('./execute-ast/separate-first-instruction.js');
		init['executeAST.checkIfProgramEnded'] = require('./execute-ast/check-if-program-ended.js');
		init['executeAST.proceedToInstruction'] = require('./execute-ast/proceed-to-instruction.js');

		/* executeJS */
		init['executeJS'] = require('./execute-js.js');
		init['executeJS.createJavascriptFunction'] = require('./execute-js/create-javascript-function.js');
		init['executeJS.runJavascriptFunction'] = require('./execute-js/run-javascript-function.js');

		/* executeModule */
		init['executeModule'] = require('./execute-module.js');
		init['executeModule.warnIfModuleDoesntExist'] = methods['executeModule.warnIfModuleDoesntExist'] || require('./execute-module/warn-if-module-doesnt-exist.js');
		init['executeModule.executeInsideModules'] = require('./execute-module/execute-inside-modules.js')

		/* createModule */
		init['createModule'] = require('./create-module.js');
		init['createModule.proceedToNextInstruction'] = require('./create-module/proceed-to-next-instruction');	
		init['createModule.checkIfParametersAreValid'] = require('./create-module/check-if-parameters-are-valid');	
		init['createModule.interpretFirstInstruction'] = require('./create-module/interpret-first-instruction');

		/* shouldContinue */
		var sharedStatus = {keepRunning: true};
		init['programStoppedQueue'] = [];
		
		init['checkIfShouldContinue'] = require('./check-if-should-continue.js')(sharedStatus);
		init['askToStopExecution'] = require('./ask-to-stop-execution')({sharedStatus, programStoppedQueue: init['programStoppedQueue']});



		return init;
	}
}