module.exports = function(firstInstruction, init, depsCache, nextInstructions, callback, response){
    return function(){
        
        var warnIfModuleDoesntExist = init['executeModule.warnIfModuleDoesntExist']({firstInstruction, init})
        var executeInsideModules = init['executeModule.executeInsideModules']({firstInstruction, init, depsCache, nextInstructions, callback, response})
        
        warnIfModuleDoesntExist().
        then(executeInsideModules);

        
    }
}
