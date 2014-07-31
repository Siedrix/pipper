var pipper = {};

pipper.resUtils = function (req, res, next) {
	res.locals.injectedData = [];

	res.injectCollectionToView = function(config){
		// Do nothing
		if(!config){return;}

		res.locals.injectedData.push({
			exposeAs : config.exposeAs,
			data : config.collection.toJSON(),
			collectionName : config.collectionName,
			collectionPath : config.collectionPath
		});
	};

	next();
};

pipper.swigHelpers = function(swig){
	var hydrate = function (dehydratedData) {
		if(!dehydratedData.length){ return ''; }

		var str = '<script>';
		str = str + 'window._data = {}\n';
		str = str + 'window.collections = window.collections || {}\n';
		

		dehydratedData.forEach(function(item){
			str = str + 'window.collections.'+ item.collectionName +' = require(\''+ item.collectionPath +'\');\n';
			str = str + 'window._data.'+ item.name +'Data = '+ JSON.stringify(item.data) +';\n';
			str = str + item.exposeAs +' = new window.collections.'+ item.collectionName +'( window._data.'+ item.name +'Data );\n';
		});

		str = str + '</script>';
		return str;
	};

	hydrate.safe = true;
	swig.setFilter('hydrate', hydrate);
};

module.exports = pipper;