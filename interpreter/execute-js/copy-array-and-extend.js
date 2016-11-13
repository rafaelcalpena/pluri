module.exports = function(arr, add){
	var ret = arr.keys.slice(0);
	ret.push(add);
	return ret;
}