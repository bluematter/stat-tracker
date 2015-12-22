var Backbone = require('backbone'),
    TeamModel = require('../models/team'),
    PlayersCollection = require('./players');

module.exports = TeamsCollection = Backbone.Collection.extend({
    model:  TeamModel,
    url: function() {
        var path = window.location.pathname.split('/');
        return '/api/week/'+path[2]+'/teams'
    },
    comparator: function(team) {
        return team.get('position');
    },
    byPlaying:function() {
        playing = this.filter(function(team) {
            return team.get('playing') === true;
        });
        return new TeamsCollection(playing);
    },
    byWeek:function(wid) {
        weeklyTeams = this.filter(function(team) {
            return team.get('week') === wid;
        });
        return new TeamsCollection(weeklyTeams);
    },
    byWeekPlaying:function(wid) {
        weekPlaying = this.filter(function(team) {
            return team.get('playing') === true && team.get('week') === parseInt(wid);
        });
        return new TeamsCollection(weekPlaying);
    }
});
