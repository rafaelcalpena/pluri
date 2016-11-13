	/* this file will be copied to a /runs/run directory */
	var pluri = require(process.argv[2]);
	let fs = require('fs');
	let path = require('path')


	function tryToExecuteFile(error, data){

    if (error) {
        return;
    }
    pluri.interpreter({require:require, requireFromPluriDir: function(name){
    	return require(path.resolve(process.argv[2],'node_modules', name))
    }}).executeString(data);
}

if (process.argv[2]){


	fs.readFile(path.resolve(__dirname, '../..', process.argv[3]), 'utf-8', tryToExecuteFile);
}
