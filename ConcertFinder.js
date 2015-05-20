var args = process.argv;

if(args.length!==4 || args[2].length!==5 || isNaN(parseInt(args[2])) || isNaN(parseInt(args[3]))) {
	console.log('Usage: node ConcertFinder.js [zipcode] [radius]');
	process.exit(1);
}

var myArtists = [
	'2Pac', '2wice', '311', '360', 'a-ha', 'Above & Beyond', 'Above and Beyond',
	'Aeroplane', 'Air', 'Al Green', 'Aloe Blacc', 'alt-J', 'Anchorsong', 'Anchor Song',
	'Antonio Carlos Jobim', 'Aphex Twin', 'Apparat', 'Atlas Genius', 'Atmosphere',
	'ATU', 'The Avett Brothers', 'Avett Brothers', 'AWOLNATION', 'Awolnation',
	'B.o.B', 'Badbadnotgood', 'Bag Raiders', 'Banks', 'Bastille',
	'Baths', 'Beats Antique', 'Bibio', 'Big L', 'Blind Melon', 'Blind Pilot',
	'blink-182', 'Blink-182', 'Blockhead', 'Blood Orange', 'Blue Oyster Cult',
	'The Wailers', 'Bobby Brown', 'Bobby McFerrin', 'Bondax', 'Boney James', 'Bonobo',
	'Booker T. & The MG\'s', 'Breakbot', 'Brotha Lynch Hung', 'Bruno Mars', 'C2C', 'Capital Cities',
	'Carole King', 'Carousel', 'Cashmere Cat', 'Catching Flies', 'Cheap Trick', 'Childish Gambino',
	'Chris Malinchak', 'Chrome Sparks', 'Chromeo', 'Classixx', 'Clean Bandit', 'Colour Coding',
	'Com Truise', 'Compton\'s Most Wanted', 'Conspirator', 'Crayon', 'Cults', 'Cut Copy', 'Dabrye',
	'Daft Punk', 'Damian Marley', 'Dan Auerbach', 'Darius', 'DARKSUNN', 'Dave Van Ronk', 'David Grisman',
	'De La Soul'
];


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
		try {
			console.log('processing...');
			var obj = JSON.parse(str),
				matches = [];
			for(var i in obj.Events) {
				//Extract Data
				var id = obj.Events[i].Id,
					date = obj.Events[i].Date,
					venue = obj.Events[i].Venue,
					artists = obj.Events[i].Artists,
					ticketURL = obj.Events[i].TicketUrl;
				//Scan for Match
				var flag = false;
				for(var j in artists) {
					for(var k=0; k<myArtists.length; k++) {
						if(artists[j].Name === myArtists[k]) {
							matches.push(obj.Events[i]);
							flag = true;
							break;
						}
					}
					if(flag) break;
				}
			}
		

			//Print
			for(var i in matches) {
				console.log('');
				var id = matches[i].Id,
					date = matches[i].Date,
					venue = matches[i].Venue,
					artists = matches[i].Artists,
					ticketURL = matches[i].TicketUrl;
				process.stdout.write('\nArtist(s): ');
				for(var j in artists) {
					process.stdout.write(artists[j].Name);
					if(j < artists.length-1) process.stdout.write(', ');
					else console.log('');
				}
				console.log('City: ' + venue.City + ', ' + venue.StateCode);
				console.log('Venue: ' + venue.Name);
				if(venue.Url) console.log('URL: ' + venue.Url);
				if(ticketURL) console.log('Tickets: ' + ticketURL);
			}
			console.log('\n\nTotal Concerts Found: ' + obj.Events.length + '\n');
		}
		catch(err) {
			console.log('\n\nSomething went wrong...');
			console.log('Response:');
			console.log(str);
		}
	});
}


console.log('connecting...');
var req = http.request(options, responseHandler);
req.end();