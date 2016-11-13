module.exports = function(injected){

	var init = injected.init,
		nextInstructions = injected.nextInstructions,
		callback = injected.callback;

	return function($) {
		init.executeAST(nextInstructions, $.response, callback)
	};
}