var Backbone = require('backbone'),
    TeamModel = require('../models/team'),
    PlayersCollection = require('./players');

module.exports = TeamsCollection = Backbone.Collection.extend({
    model:  TeamModel,
    url: '/api/teams',
    initialize:function() {
    	this.on('reset', this.getPlayers, this);
    },
    getPlayers:function() {
    	this.each(function(team) {
    		team.players = new PlayersCollection([], { team: team });
    		team.players.fetch();
    	});
    },
    byPlaying:function() {
        playing = this.filter(function(team) {
            return team.get('playing') === true;
        });
        return new TeamsCollection(playing);
    },
    comparator:function(a) {
        console.log('sorted');
        return a.get('position');
    }
});
