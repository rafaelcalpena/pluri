/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function (root, factory) {
	    root.Pluri = factory();
	    console.log(root)
	}(window, function () {
		return {
			parser: __webpack_require__(1),
			interpreter: __webpack_require__(2)({})
		}
	})); 



/***/ },
/* 1 */
/***/ function(module, exports) {

	  var parser = {};

	  /* Private Functions */

	  function separateSiblings(code) { 

	    /* 
	      Will separate the scopes based on the indentation.
	      Strict evaluation, no extra spaces allowed.
	     */

	    var position = 0; //cant reach -1 or 2, otherwise throw error
	    var codeLines = code.split(/\n/);
	    var numberOfLines = codeLines.length;
	    var possiblescopes = [];
	    var scope = [];
	    var module = null;
	    var moduleAndscope = [];

	    for (var i = 0; i < numberOfLines; i++) {
	      var requireModule = codeLines[i].match(/^"(.*?)" {/);
	      if (codeLines[i] === "}") {
	        position--;
	        possiblescopes.push(scope.join('\n'));
	        moduleAndscope.push({module:module, scope: scope})
	        scope = [];
	        module = null;
	      }     
	      else if (requireModule) {
	        position++;
	        module = requireModule[1];
	      }   
	      else if (position === 1) {
	        var lineWithoutPadding = codeLines[i].replace('    ','').replace('\t','');
	        scope.push(lineWithoutPadding); // 4 spaces indent
	        
	      }
	    }

	    if (position !== 0) {
	      throw "Unbalanced brackets on code\n" + code +"\n Make sure there are no spaces before or after the brackets";
	    }
	    return moduleAndscope;

	  }  



	  /* Public Functions */

	  parser.parse = function (code) {
	  	if (typeof code !== 'string'){
	      return;
	    }
	    return separateSiblings(code);
	  }
	    
	  module.exports = {parse: parser.parse}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* 
	  Pluri Language
	*/





	module.exports = function(jsGlobalsInitial){
		return function(jsGlobals, customMethods){

			var init = {};
			var methods = {};

			init.tree = [];

			init.executeAST = methods.executeAST || __webpack_require__(3)(init);

			init.executeString = methods.executeString || __webpack_require__(4)(init);

			init.executeStep = methods.executeStep || __webpack_require__(5)(init);

			init.jsGlobals = jsGlobalsInitial || {};

			init.pluriModules = {};



			if (typeof jsGlobals !== 'undefined'){
				init.jsGlobals = jsGlobals;
			}
			methods = customMethods || {};

			/* executeAST */
			init['executeAST.checkIfresponseIsString'] = __webpack_require__(6);
			init['executeAST.separateFirstInstruction'] = __webpack_require__(7);
			init['executeAST.checkIfProgramEnded'] = __webpack_require__(8);
			init['executeAST.proceedToInstruction'] = __webpack_require__(9);

			/* executeJS */
			init['executeJS'] = __webpack_require__(10);
			init['executeJS.createJavascriptFunction'] = __webpack_require__(11);
			init['executeJS.runJavascriptFunction'] = __webpack_require__(18);

			/* executeModule */
			init['executeModule'] = __webpack_require__(19);
			init['executeModule.warnIfModuleDoesntExist'] = methods['executeModule.warnIfModuleDoesntExist'] || __webpack_require__(20);
			init['executeModule.executeInsideModules'] = __webpack_require__(21)

			/* createModule */
			init['createModule'] = __webpack_require__(22);
			init['createModule.proceedToNextInstruction'] = __webpack_require__(23);	
			init['createModule.checkIfParametersAreValid'] = __webpack_require__(24);	
			init['createModule.interpretFirstInstruction'] = __webpack_require__(25);

			/* shouldContinue */
			var sharedStatus = {keepRunning: true};
			init['programStoppedQueue'] = [];
			
			init['checkIfShouldContinue'] = __webpack_require__(26)(sharedStatus);
			init['askToStopExecution'] = __webpack_require__(27)({sharedStatus, programStoppedQueue: init['programStoppedQueue']});



			return init;
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let pluriParser = __webpack_require__(1);

	module.exports = function(init){
		return function(data) {

		    var ast = pluriParser.parse(data);
		    init.executeAST(ast, '', '');

		}
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var depsCache = {
		pluriParser: __webpack_require__(1)
	};

	module.exports = function(init){
		return function(firstInstruction, nextInstructions, response, callback) {

			var checkIfParametersAreValid = init['createModule.checkIfParametersAreValid']({firstInstruction, response, init});

		    var interpretFirstInstruction = init['createModule.interpretFirstInstruction']({init, depsCache, firstInstruction, nextInstructions, response, callback});

		    checkIfParametersAreValid().then(interpretFirstInstruction)

		    
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(injected){
		return function(){
			return new Promise(function(resolve, reject){

				var response = injected.response;

				if (typeof response !== "string") {
				    throw 'response for execute must be a string';
				}
				resolve();
			})
		};
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(injected){
		return function($){
			return new Promise(function(resolve, reject){

				var callback = injected.callback;

				var firstInstruction = $.firstInstruction,
					nextInstructions = $.nextInstructions;

				if (typeof firstInstruction === "undefined") {
			        if (typeof callback === "function") {
			            callback(response);
			        }
			        return;
			    }
			    resolve({firstInstruction, nextInstructions});
			})
		}
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(injected) {
		return function($){
			return new Promise(function(resolve, reject){	

				var init = injected.init,
					response = injected.response,
					callback = injected.callback;			

				var firstInstruction = $.firstInstruction,
					nextInstructions = $.nextInstructions;

			    init.executeStep(
			        firstInstruction,
			        nextInstructions,
			        response,
			        callback
			    );	
		    })		
		}
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(firstInstruction, init, depsCache, nextInstructions, callback, response){

		return function(){

			var createJavascriptFunction = init['executeJS.createJavascriptFunction']({firstInstruction, init, depsCache, nextInstructions, callback, response});
			var runJavascriptFunction = init['executeJS.runJavascriptFunction']({firstInstruction})
			
			createJavascriptFunction().
			then(runJavascriptFunction)

		}
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

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
			    var contextAPI = __webpack_require__(12)(init, firstInstruction, nextInstructions, callback)
			    var pluri = __webpack_require__(13)(depsCache, nextInstructions, callback, init) 
			    var scopeAPI = __webpack_require__(14)(response, firstInstruction.input, firstInstruction.parentInput, pluri, init.jsGlobals)
			    var indexedMapping = __webpack_require__(15)(scopeAPI);
			    var functionConstructorArgs = __webpack_require__(16)(indexedMapping, functionWrapper);
			    var fn = __webpack_require__(17)(Function, functionConstructorArgs);
			    var functionArguments = indexedMapping.items;

			    resolve({fn, contextAPI, functionArguments})

			})
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

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

/***/ },
/* 13 */
/***/ function(module, exports) {

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

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(response, input, parentInput, pluri, jsGlobals){
		return {
			'response': response,
			'input': input,
			'parentInput': parentInput,
			'pluri': pluri,
			'jsGlobals': jsGlobals
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(obj){
		var keys = [];
	    var items = [];
	    for (var key in obj){
	    	keys.push(key);
	    	items.push(obj[key])
	    }
	    return {keys, items}
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(arr, add){
		var ret = arr.keys.slice(0);
		ret.push(add);
		return ret;
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(constructor, args) {
	    function F() {
	        return constructor.apply(this, args);
	    }
	    F.prototype = constructor.prototype;
	    return new F();
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(injected){
		return function($){
			return new Promise(function(resolve, reject){

				var fn = $.fn,
					contextAPI = $.contextAPI,
					functionArguments = $.functionArguments;

				var firstInstruction = injected.firstInstruction;

			    try {
			        var exec = fn.apply(contextAPI, functionArguments)
			    } catch (err) {
			        console.log('ERROR WHILE EXECUTING JAVASCRIPT:\n MODULE:', firstInstruction, '\n', err)
			    }
			})
		}
	}



/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(firstInstruction, init, depsCache, nextInstructions, callback, response){
	    return function(){
	        
	        var warnIfModuleDoesntExist = init['executeModule.warnIfModuleDoesntExist']({firstInstruction, init})
	        var executeInsideModules = init['executeModule.executeInsideModules']({firstInstruction, init, depsCache, nextInstructions, callback, response})
	        
	        warnIfModuleDoesntExist().
	        then(executeInsideModules);

	        
	    }
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(injected){

		return function($){

			return new Promise(function(resolve, reject){

				var init = injected.init;

				var firstInstruction = injected.firstInstruction;
				var moduleContent = init.pluriModules[firstInstruction.module];

		        if (!moduleContent){
		            console.log(firstInstruction.module, ' not found. Maybe you created the module after it being executed?');
		            return;            
		        }


		        resolve({moduleContent})

			})
		}
	}



/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(injected){


	    return function($){
	        return new Promise(function(resolve, reject){

	            var depsCache = injected.depsCache,
	                moduleContent = $.moduleContent,
	                firstInstruction = injected.firstInstruction,
	                init = injected.init,
	                nextInstructions = injected.nextInstructions,
	                callback = injected.callback,
	                response = injected.response;            

	            var instructions = depsCache.pluriParser.parse(moduleContent.join('\n')); // parse inside of pluri module

	            for (var i = 0, j = instructions.length; i < j; i++) { //add submodules as next instructions

	                instructions[i].input = firstInstruction.scope.join('\n'); //set inside argument for sub module

	                instructions[i].parentInput = firstInstruction.input;

	                nextInstructions.splice(i, 0, instructions[i]); //add submodule as the next instruction
	            }

	            init.executeAST(nextInstructions, response, callback); //continue executing ast with sub modules added and next instructions
	            
	        })
	    }
	}        

/***/ },
/* 22 */
/***/ function(module, exports) {

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

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(injected){

		var init = injected.init,
			nextInstructions = injected.nextInstructions,
			callback = injected.callback;

		return function($) {
			init.executeAST(nextInstructions, $.response, callback)
		};
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(injected){

		var response = injected.response,
		    firstInstruction = injected.firstInstruction;

	    return function($){
	    	return new Promise(function(resolve, reject){


			    if (typeof response !== "string") {
			        throw 'response must be a string. Got instead ' + typeof response
			    }

			    if (!firstInstruction) {
			    	throw "Execute-step requires a firstInstruction to run";
			    }

			    resolve()

	    	})
		}
	}		    

/***/ },
/* 25 */
/***/ function(module, exports) {

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

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(injected){


	    return function($){

	    	return new Promise(function(resolve, reject){

				var keepRunning = injected.keepRunning;

		    	if (keepRunning === true) {
		    		resolve()
		    	}
		    	else {
		    		console.log('stopping program...')
		    	}

	    	})


		}
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(injected){

	    return function($){

	    	return new Promise(function(resolve, reject){

		    	injected.sharedStatus.keepRunning = false;


		    	var queue = injected.programStoppedQueue;

		    	for (var i=0, j = queue.length; i < j; i++) {
		    		if (typeof queue[i] === 'function'){
		    			queue[i]();
		    		}
		    	}

	    	})


		}
	}

/***/ }
/******/ ]);