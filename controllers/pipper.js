var controller = require('stackers'),
	Items = require('../collections/items.js');

var pipperController = controller({
	path : '/'
});

pipperController.get('', function(req, res){
	var items = new Items([
		{label : 'foo'},
		{label : 'bar'},
		{label : 'baz'},
		{label : 'quz'},
	]);

	// currentCollection, variable name on view, collection contructor
	res.injectCollectionToView({
		collection : items,
		exposeAs : 'window.items',
		collectionName : 'Items',
		collectionPath : './collections/items.js'
	});

	res.render('home');
});

module.exports = pipperController;