var Backbone = require('backbone'),
    TeamModel = require('../models/team'),
    PlayersCollection = require('./players');

module.exports = TeamsCollection = Backbone.Collection.extend({
    model:  TeamModel,
    url: '/api/teams',
    comparator: function(team) {
        return team.get('position');
    },
    byPlaying:function() {
        playing = this.filter(function(team) {
            return team.get('playing') === true;
        });
        return new TeamsCollection(playing);
    }
});
