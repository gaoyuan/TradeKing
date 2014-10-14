exports.queryString = function(options){
	return Object.keys(options).map(function(k){
    	return encodeURIComponent(k) + '=' + encodeURIComponent(options[k])
  }).join('&');
}