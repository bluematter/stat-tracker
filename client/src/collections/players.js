var Backbone = require('backbone'),
    PlayerModel = require('../models/player');

module.exports = PlayersCollection = Backbone.Collection.extend({
    model:  PlayerModel,
    url: '/api/players',
    byPlaying:function(teamID, wid) {
    	var Playingresults = this.where({ team_id: teamID, week: wid, bench: false });
        console.log('Playingresults', Playingresults)
        return new PlayersCollection(Playingresults);
    },
    byBench:function(teamID) {
        var Benchresults = this.where({ team_id: teamID, week: wid, bench: true });
        return new PlayersCollection(Benchresults);
    },
    byTeam:function(teamID) {
    	var SpecificTeam = App.data.players.where({ team_id: teamID });
        return new PlayersCollection(SpecificTeam); 
    },
    byPlayingTeam:function(teamID) {
        console.log(teamID)
        var playingPlayers = [];
        for(var i = 0; i < teamID.length; i++) {
            playingPlayers.push(this.where({ team_id: teamID[i] }));
        }
        var Playingresults = playingPlayers[0].concat(playingPlayers[1]);
        return new PlayersCollection(Playingresults);
    }

});
