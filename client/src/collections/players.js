var Backbone = require('backbone'),
    PlayerModel = require('../models/player');

module.exports = PlayersCollection = Backbone.Collection.extend({
    model:  PlayerModel,
    url: '/api/players',
    byPlaying:function(teamID) {
    	var Playingresults = this.where({ team_id: teamID, bench: false });
        return new PlayersCollection(Playingresults);
    }

});
