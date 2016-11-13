module.exports = function(obj){
	var keys = [];
    var items = [];
    for (var key in obj){
    	keys.push(key);
    	items.push(obj[key])
    }
    return {keys, items}
}