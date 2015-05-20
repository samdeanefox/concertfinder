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
	'De La Soul', 'Death Cab for Cutie', 'DeBarge', 'Della Mae', 'The Devil Makes Three', 'Devil Makes Three',
	'The Diplomats', 'Dirty Vegas', 'Disclosure', 'DJ Shadow', 'The Doobie Brothers', 'Dream Koala', 'The Drums',
	'Earth, Wind & Fire', 'Echosmith', 'El DeBarge', 'Elaquent', 'Electric Light Orchestra', 'Eminem',
	'The Emotions', 'Empire Of The Sun', 'Empire of the Sun', 'EOTO', 'Elephants Only Talk Occasionally', 'Family of the Year',
	'Fitz and The Tantrums', 'Fleetwood Mac', 'The Floozies', 'Flying Lotus', 'Foster The People', 'The Fray',
	'Free The Robots', 'Generationals', 'Gil Scott-Heron & Jamie xx', 'Givers', 'Grateful Dead', 'Groundation', 'Guster',
	'Guy', 'Hamilton Park', 'The Head And The Heart', 'Hieroglyphics', 'Holy Ghost!', 'Hot Natured',
	'Hot Rize', 'Husalah', 'Imogen Heap', 'Inf', 'The Isaacs', 'J Dilla', 'J-Diggs', 'J. Rawls', 'Ja Rule', 'The Jacka',
	'Jackie Greene', 'Jackson Browne', 'James Blake', 'James Brown', 'James Taylor', 'Jim James',
	'John Mayer', 'Junip', 'JUNIP', 'Keith Sweat', 'The Killers', 'Kodomo', 'Kurupt', 'La Roux', 'Lanterns on the Lake',
	'Lemon Jelly', 'Lenny Kravitz', 'Les Sins', 'Liquid Tension Experiment', 'Little People', 'London Grammar',
	'Lotus', 'Lucy Rose', 'Luniz', 'Mac Dre', 'Mac Miller', 'Madeon', 'Magic!', 'Man Man', 'Marcus D', 'Marcus Marr',
	'Mark Ronson', 'Martin Jondo', 'Marvin Gaye', 'Mat.Joe', 'Mat Joe', 'Maximo Park', 'Metaform', 'MGMT',
	'Miami Horror', 'Miike Snow', 'Modjo', 'Mord Fustang', 'Mr Little Jeans', 'Mutemath', 'Nada Surf', 'Neil Young',
	'Neon Indian', 'The New Deal', 'New Found Glory', 'Nicolas Jaar', 'Nirvana', 'Norah Jones', 'The Notorious B.I.G.',
	'Oasis', 'Of Monsters And Men', 'Oingo Boingo', 'Old Crow Medicine Show', 'Opiuo', 'OutKast', 'P.S.D', 'Papadosio',
	'Parliament', 'Passion Pit', 'Patrick Lee', 'Penguin Prison', 'People Under The Stairs', 'Phaeleh', 'Pharrell Williams',
	'Phil Collins', 'Phoenix', 'Pnuma Trio', 'The Pnuma Trio', 'Pogo', 'The Postal Service', 'Prefuse 73', 'Prefuse73', 'Pretty Lights',
	'R. Kelly', 'RAC', 'Radiohead', 'Random Rab', 'Ratatat', 'Ray Charles', 'Red Hot Chili Peppers', 'Rhye', 'Rooney',
	'Ryan Montbleau', 'Sade', 'Samiyam', 'Sbtrkt', 'SBTRKT', 'Shy Girls', 'Sierra Hull', 'Six Deep', 'Skrillex', 'Smooth Jazz All-Stars',
	'Social Distortion', 'Spoon', 'Squarepusher', 'Stacey Kent', 'Star Slinger', 'Starship Connection & K-Maxx', 'Steely Dan',
	'Stephane Pompougnac', 'Stevie Wonder', 'STRFKR', 'STS9', 'Sound Tribe Sector 9', 'Sufjan Stevens', 'Sum 41', 'Summer Camp', 'Summer Heart',
	'Sunshine Anderson', 'Tame Impala', 'Telefon Tel Aviv', 'Todd Terje', 'Tony Ozier', 'Toro Y Moi', 'Toro y Moi', 'Totally Enormous Extinct Dinosaurs',
	'Trey Songz', 'Turner', 'TV On The Radio', 'Twin Forks', 'Two Door Cinema Club', 'Two Hours Traffic', 'Tycho', 'The Virgins', 'Washed Out',
	'The Weeknd', 'The Whispers', 'White Denim', 'The Who', 'Wild Cub', 'Wilkinson', 'Wiz Khalifa', 'YACHT',
	'Yeah Yeah Yeahs', 'Yellowcard', 'Yonder Mountain String Band', 'The Yonder Mountain String Band', 'Young the Giant', 'Young The Giant', 'Yukmouth'
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