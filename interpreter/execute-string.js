var pluriParser = require('../parser/pluri-parser.js');

module.exports = function(init){
	return function(data) {

	    var ast = pluriParser.parse(data);
	    init.executeAST(ast, '', '');

	}
}