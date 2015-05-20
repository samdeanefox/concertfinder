var url = require('url');
var http = require('http');

var apiKey = '832t889gh3n8728fzxthr644';
var urlStr = 'http://api.jambase.com/events?zipCode=95128&radius=50&page=0&api_key=' + apiKey;


function responseHandler(res) {
	var str = '';
	res.on('data', function(chunk) {
		str += chunk;
	});
	res.on('end', function() {
		console.log(str);
	});
}

