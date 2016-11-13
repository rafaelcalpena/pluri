  var parser = {};

  /* Private Functions */

  function separateSiblings(code) { 

    /* 
      Will separate the scopes based on the indentation.
      Strict evaluation, no extra spaces allowed.
     */

    var position = 0; //cant reach -1 or 2, otherwise throw error
    var codeLines = code.split(/\n/);
    var numberOfLines = codeLines.length;
    var possiblescopes = [];
    var scope = [];
    var module = null;
    var moduleAndscope = [];

    for (var i = 0; i < numberOfLines; i++) {
      var requireModule = codeLines[i].match(/^"(.*?)" {/);
      if (codeLines[i] === "}") {
        position--;
        possiblescopes.push(scope.join('\n'));
        moduleAndscope.push({module:module, scope: scope})
        scope = [];
        module = null;
      }     
      else if (requireModule) {
        position++;
        module = requireModule[1];
      }   
      else if (position === 1) {
        var lineWithoutPadding = codeLines[i].replace('    ','').replace('\t','');
        scope.push(lineWithoutPadding); // 4 spaces indent
        
      }
    }

    if (position !== 0) {
      throw "Unbalanced brackets on code\n" + code +"\n Make sure there are no spaces before or after the brackets";
    }
    return moduleAndscope;

  }  



  /* Public Functions */

  parser.parse = function (code) {
  	if (typeof code !== 'string'){
      return;
    }
    return separateSiblings(code);
  }
    
  module.exports = {parse: parser.parse}