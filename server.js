var express = require('express'),
	swig = require('swig'),
	browserify = require('browserify');

var server = express();

// Swig config
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');

// Disable view cache
server.set('view cache', false);
swig.setDefaults({ cache: false });

var pipper = require('./lib/pipper');

server.use(pipper.resUtils);
pipper.swigHelpers(swig);

var pipperController = require('./controllers/pipper');
pipperController(server);

// Send collection to front with browserify
server.get('/data-layer.js', function (req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	browserify()
	.require('./collections/items.js')
	.bundle()
	.pipe(res);
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');