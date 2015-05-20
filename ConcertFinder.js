var args = process.argv;

if(args.length!==4 || args[2].length!==5 || isNaN(parseInt(args[2])) || isNaN(parseInt(args[3]))) {
	console.log('Usage: node ConcertFinder.js [zipcode] [radius]');
	process.exit(1);
}


var url = require('url'),
	http = require('http'),

	apiKey = '832t889gh3n8728fzxthr644',
	zipcode = parseInt(args[2]),
	radius = parseFloat(args[3]),
	urlStr = 'http://api.jambase.com/events?zipCode=' + zipcode + '&radius=' + radius + '&page=0&api_key=' + apiKey,

	u = url.parse(urlStr),

	options = {
	host: u.hostname,
	path: u.path,
	port: u.port || 80,
	method: 'GET'
	};


function responseHandler(res) {
	var str = '';
	res.on('data', function(chunk) {
		str += chunk;
	});

	res.on('end', function() {
		var obj = JSON.parse(str);
		for(var i in obj.Events) {
			console.log('');
			//Extract Data
			var id = obj.Events[i].Id,
				date = obj.Events[i].Date,
				venue = obj.Events[i].Venue,
				artists = obj.Events[i].Artists,
				ticketURL = obj.Events[i].TicketUrl;
			//Print	
			process.stdout.write('\nArtist(s): ');
			for(var j in artists) {
				process.stdout.write(artists[j].Name);
				if(j < artists.length-1) process.stdout.write(', ');
				else console.log('');
			}
			console.log('City: ' + venue.City + ', ' + venue.StateCode);
			console.log('Venue: ' + venue.Name);
			if(venue.Url) console.log('URL: ' + venue.Url);
		}
		console.log('\n\nTotal Concerts Found: ' + obj.Events.length + '\n');
	});
}


console.log('connecting...');
var req = http.request(options, responseHandler);
req.end();