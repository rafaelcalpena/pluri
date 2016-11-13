module.exports = {
	parser: require('./parser/pluri-parser.js'),
	interpreter: require('./interpreter/pluri-interpreter.js')({requireFromPluriDir:require, require:require})
}