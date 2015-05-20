var args = process.argv;

if(args.length!==4 || args[2].length!==5 || isNaN(parseInt(args[2])) || isNaN(parseInt(args[3]))) {
	console.log('Usage: node ConcertFinder.js [zipcode] [radius]');
	process.exit(1);
}

var myArtists = [
	'2Pac', '2wice', '311', '360', 'A Tribe Called Quest', 'a-ha', 'Above & Beyond', 'Above and Beyond', 'AC/DC',
	'Aeroplane', 'AFX', 'Air', 'Al Green', 'Aloe Blacc', 'Alison Krauss', 'alt-J', 'AmpLive', 'Anchorsong', 'Anchor Song',
	'Antonio Carlos Jobim', 'Aphex Twin', 'Aphrodite','Apparat', 'Atlas Genius', 'Atmosphere',
	'ATU', 'The Avalanches','The Avett Brothers', 'Avett Brothers', 'AWOLNATION', 'Awolnation',
	'B.o.B', 'Badbadnotgood', 'Bag Raiders', 'Banks', 'Basement Jaxx', 'Bassnectar', 'Bastille',
	'Baths', 'Beats Antique', 'Berner', 'Bibio', 'Big L', 'Bivouac', 'Blind Melon', 'Blind Pilot',
	'blink-182', 'Blink-182', 'Blockhead', 'Blood Orange', 'Blue Oyster Cult',
	'The Wailers', 'Bobby Brown', 'Bobby McFerrin', 'Bondax', 'Bone Thugs-n-Harmony', 'Boney James', 'Bonobo', 'Carlos Santana', 'Santana',
	'Booker T. & The MG\'s', 'Breakbot', 'Brotha Lynch Hung', 'Bruno Mars', 'C2C', 'Cake', 'Capital Cities',
	'Carole King', 'Carousel', 'Cashmere Cat', 'Catching Flies', 'Celly Cel', 'Cheap Trick', 'Childish Gambino', 'Chris Clark',
	'Chris Malinchak', 'Chrome Sparks', 'Chromeo', 'Classixx', 'Clean Bandit', 'Coldplay', 'Colour Coding',
	'Com Truise', 'Common','Compton\'s Most Wanted', 'Conspirator', 'Crayon', 'Creedence Clearwater Revival', 'Cults', 'Cursive', 'Cut Copy', 'Dabrye', 'Daedelus',
	'Daft Punk', 'Damian Marley', 'Dan Auerbach', 'Darius', 'DARKSUNN', 'Dave Van Ronk', 'David Grisman',
	'De La Soul', 'Death Cab for Cutie', 'DeBarge', 'Deer Tick', 'Della Mae', 'The Devil Makes Three', 'Devil Makes Three',
	'The Diplomats', 'Dirty Vegas', 'Disclosure', 'Dispatch', 'Dizzy Gillespie', 'DJ Cam', 'DJ Shadow', 'The Doobie Brothers', 'Dream Koala', 'Drexciya', 'The Drums',
	'Duke Ellington', 'E-40', 'Eagles', 'Earth, Wind & Fire', 'Echosmith', 'El DeBarge', 'Elaquent', 'Electric Light Orchestra', 'Eliot Lipp',
	'Elton John', 'Eminem', 'The Emotions', 'Empire Of The Sun', 'Empire of the Sun', 'EOTO', 'Elephants Only Talk Occasionally', 'Explosions in the Sky', 'Family of the Year',
	'Fitz and The Tantrums', 'Fleetwood Mac', 'Flight Facilities', 'The Floozies', 'Flying Lotus', 'Foster The People', 'The Fray', 'Fred Falke',
	'Free The Robots', 'Generationals', 'Geto Boys', 'The Geto Boys', 'Ghostland Observatory', 'Gil Scott-Heron & Jamie xx', 'Givers', 'Grateful Dead', 'Groundation', 'Guster',
	'Green Day', 'Guru', 'Guy', 'Hamilton Park', 'The Head And The Heart', 'Heatwave', 'Hieroglyphics', 'Holy Ghost!', 'Hot Natured',
	'Hot Rize', 'Husalah', 'Imogen Heap', 'Immortal Technique', 'Inf', 'Infected Mushroom', 'The Isaacs', 'The Isley Brothers', 'J Dilla', 'J-Diggs', 'J. Rawls', 'Ja Rule', 'The Jacka',
	'Jackie Greene', 'Jackson Browne', 'Jaco Pastorius', 'James Blake', 'James Brown', 'James Taylor', 'Jean-Luc Ponty', 'Jim James', 'Jimmy Eat World', 'Joe Satriani',
	'John Fogerty', 'John Mayer', 'Joomanji', 'Junip', 'JUNIP', 'Justice', 'Keith Sweat', 'Keys N Krates', 'The Killers', 'Kodomo', 'KRS-One', 'Kurupt', 'La Roux', 'Lanterns on the Lake',
	'Lemon Jelly', 'Lianne La Havas', 'Lenny Kravitz', 'Les Sins', 'Liquid Tension Experiment', 'Little People', 'London Grammar', 'Lonnie Liston Smith', 
	'Lotus', 'Lucy Rose', 'Luniz', 'The Lushlife Project', 'Lynyrd Skynyrd', 'M83', 'Mac Dre', 'Mac Miller', 'Madeon', 'Madlib', 'Magic!', 'Man Man', 'Marcus D', 'Marcus Marr',
	'Mark Ronson', 'Martin Jondo', 'Marvin Gaye', 'Mat.Joe', 'Mat Joe', 'Maximo Park', 'Metaform', 'Metallica', 'MGMT', 'Michael Menert', 'Midnight Star', 'Minus The Bear', 'Mitzi', 'Modest Mouse',
	'Miami Horror', 'Maroon 5', 'Matty G', 'Miike Snow', 'Modjo', 'Mord Fustang', 'Mr Little Jeans', 'Mr. Scruff','Mutemath', 'Nada Surf', 'Nas', 'Neil Young',
	'Neon Indian', 'The New Deal', 'New Found Glory', 'Nicolas Jaar', 'Nightmares On Wax', 'Nirvana', 'Norah Jones', 'The Notorious B.I.G.',
	'Oasis', 'Of Monsters And Men', 'The Offspring', 'Oingo Boingo', 'Old Crow Medicine Show', 'Omnimusic', 'Opiuo', 'Oscar Peterson', 'Oscar Peterson Trio', 'The Oscar Peterson Trio', 'OutKast', 'P.S.D', 'Papadosio',
	'Parliament', 'Passion Pit', 'Patrick Lee', 'Paul Hardcastle', 'Penguin Prison', 'People Under The Stairs', 'Pete Rock', 'Phaeleh', 'Pharrell Williams',
	'Phil Collins', 'Phoenix', 'Pink Floyd', 'Pnuma Trio', 'The Pnuma Trio', 'Pogo', 'The Postal Service', 'Prefuse 73', 'Prefuse73', 'Pretty Lights',
	'R. Kelly', 'RAC', 'Radiohead', 'Railroad Earth', 'Random Rab', 'Ratatat', 'Ray Charles', 'Red Hot Chili Peppers', 'Rhye', 'RJD2', 'Rooney', 'Ruckazoid', 'Rusko', 'Ryan Adams',
	'Ryan Montbleau', 'Sade', 'Samiyam', 'Sbtrkt', 'SBTRKT', 'The Shins', 'Shy Girls', 'Sierra Hull', 'Six Deep', 'Skrillex', 'Sly & The Family Stone', 'Smashing Pumpkins', 'Smooth Jazz All-Stars',
	'Social Distortion', 'Spoon', 'Squarepusher', 'Stacey Kent', 'Star Slinger', 'Starship Connection & K-Maxx', 'Steel Pulse', 'Steely Dan',
	'Stephane Pompougnac', 'Stevie Wonder', 'STRFKR', 'STS9', 'Sound Tribe Sector 9', 'Sufjan Stevens', 'Sum 41', 'Summer Camp', 'Summer Heart',
	'Sunshine Anderson', 'Tame Impala', 'Teebs', 'Telefon Tel Aviv', 'The Disco Biscuits', 'Thelonious Monk', 'Thievery Corporation', 'Thundercat', 'Todd Terje', 'Tony Ozier', 'Toro Y Moi', 'Toro y Moi', 'Totally Enormous Extinct Dinosaurs',
	'Trey Songz', 'Turner', 'TV On The Radio', 'Twin Forks', 'Two Door Cinema Club', 'Two Hours Traffic', 'Tycho', 'Van Morrison', 'Vibesquad', 'The Virgins', 'Wagon Christ', 'War', 'Washed Out',
	'The Weeknd', 'The Whispers', 'White Denim', 'The Who', 'Wild Cub', 'Wilkinson', 'Wiz Khalifa', 'YACHT',
	'Yeah Yeah Yeahs', 'Yellowcard', 'Yellowjackets', 'Yonder Mountain String Band', 'The Yonder Mountain String Band', 'Young the Giant', 'Young The Giant', 'Yukmouth', 'Zero 7'
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
				console.log('Date: ' + date);
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