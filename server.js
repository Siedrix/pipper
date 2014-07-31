var express = require('express'),
	swig = require('swig'),
	browserify = require('browserify'),
	literalify = require('literalify');

var server = express();

// Server bower files
server.use( '/vendors', express.static(__dirname + '/bower_components') );

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
	.transform(literalify.configure({backbone: 'window.Backbone'}))
	.require('./collections/items.js')
	.bundle()
	.pipe(res);
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');