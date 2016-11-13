(function (root, factory) {
    root.Pluri = factory();
}(window, function () {
	return {
		parser: require('./parser/pluri-parser.js'),
		interpreter: require('./interpreter/pluri-interpreter.js')({})
	}
})); 

