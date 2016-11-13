#! /usr/bin/env node


let fs = require('fs'),
	pluri = require('./'),
	path = require('path'),
	mkdirp = require('mkdirp');

function tryToExecuteFile(error, data){
    if (error) {
    	console.log('There was an error trying to open the file:\n', error)
        return;
    }
    pluri.interpreter({require:require}).executeString(data);
}

var time = Date.now();
var folderPath = path.resolve(process.env.PWD, '.pluri', time.toString());


if (process.argv[2]){


	createDirectory(folderPath)
	.then(addIndexFile)


}

function createDirectory(path){
	return new Promise(function(resolve, reject){   
		mkdirp(path, function (err) {
			//console.log(arguments)
		    if (err){
		    	reject();
		    }
		    else {
		    	resolve();
		    }
		});
	})
}

/* when node process exits */
var deleteFolderRecursive = function(path) {
  if (!path || path==='') return;
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


function exitHandler(options, err) {
    /*if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();*/
    deleteFolderRecursive(folderPath)

}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


function addIndexFile(){
	copyFile(path.resolve(__dirname, 'cli-instance-index.js'), path.resolve(folderPath, 'generate-index.js'), function(err){
		if (err) {
			return;
		}

				// Now we can run a script and invoke a callback when complete, e.g.
				//console.log(process.env.PWD)
		runScript(path.resolve(folderPath, 'generate-index.js'), [__dirname, process.argv[2]], function (err) {
		    if (err) throw err;
		    //console.log('finished running generated script');
		});

	});
}


var childProcess = require('child_process');

function runScript(scriptPath, args, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var nprocess = childProcess.fork(scriptPath, args);

    // listen for errors as they may prevent the exit event from firing
    nprocess.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    nprocess.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}



function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
