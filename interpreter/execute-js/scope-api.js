module.exports = function(response, input, parentInput, pluri, jsGlobals){
	return {
		'response': response,
		'input': input,
		'parentInput': parentInput,
		'pluri': pluri,
		'jsGlobals': jsGlobals
	}
}