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