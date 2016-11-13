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

