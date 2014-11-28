var Backbone = require('backbone'),
    PlayerModel = require('../models/player');

module.exports = PlayersCollection = Backbone.Collection.extend({
    model:  PlayerModel,
    url: '/api/players',
    byPlaying:function(teamID) {
    	var Playingresults = this.where({ team_id: teamID, bench: false });
        return new PlayersCollection(Playingresults);
    },
    byBench:function(teamID) {
        var Benchresults = this.where({ team_id: teamID, bench: true });
        return new PlayersCollection(Benchresults);
    },
    byTeam:function(teamID) {
    	var SpecificTeam = App.data.players.where({ team_id: teamID });
        return new PlayersCollection(SpecificTeam); 
    }

});
