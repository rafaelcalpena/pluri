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