var Backbone = require('backbone');

var ItemsModel = Backbone.Model.extend();

var ItemsCollection = Backbone.Collection.extend({
	model : ItemsModel
});

module.exports = ItemsCollection;