var Backbone = require('backbone'),
    PlayerModel = require('../models/player');

module.exports = PlayersCollection = Backbone.Collection.extend({
    model:  PlayerModel,
    initialize: function(models, options) {
    	this.options = options || {};
        this.team = this.options.team;
    },
    url: function() {
    	return this.team.url() + '/players'
    }
});
