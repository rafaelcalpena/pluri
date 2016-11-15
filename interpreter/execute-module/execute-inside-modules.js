module.exports = function(injected){


    return function($){
        return new Promise(function(resolve, reject){

            var depsCache = injected.depsCache,
                moduleContent = $.moduleContent,
                firstInstruction = injected.firstInstruction,
                init = injected.init,
                nextInstructions = injected.nextInstructions,
                callback = injected.callback,
                response = injected.response;            

            var instructions = depsCache.pluriParser.parse(moduleContent.join('\n')); // parse inside of pluri module

            for (var i = 0, j = instructions.length; i < j; i++) { //add submodules as next instructions

                instructions[i].input = firstInstruction.scope.join('\n'); //set inside argument for sub module

                instructions[i].parentInput = instructions[i].parentInput || firstInstruction.input;

                nextInstructions.splice(i, 0, instructions[i]); //add submodule as the next instruction
            }

            init.executeAST(nextInstructions, response, callback); //continue executing ast with sub modules added and next instructions
            
        })
    }
}        