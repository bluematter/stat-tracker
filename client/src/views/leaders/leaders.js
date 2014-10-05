var Marionette = require('backbone.marionette'),
    PlayersCollection = require('../../collections/players');

var leaderView = Marionette.ItemView.extend({
    className: 'leaders',
    template: require('../../../templates/leaders/leaders.hbs'),
    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
        this.collection = this.model.players;
    }
});

module.exports = LeadersView = Marionette.CompositeView.extend({
    className: 'leaders-view',
    template: require('../../../templates/leaders/live-stats.hbs'),
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
        this.collection.each(function(team) {
            team.players.bind('change', this.render);
        }, this);
    },
    gameLeader:function(stat) {
        teams = App.data.teams
        var home = teams.get(this.options.id1).players.models;
        var away = teams.get(this.options.id2).players.models;

        all = home.concat(away);
        leaders = new PlayersCollection(all)
        return leaders.max(function(leader) {
            return leader.get(stat);
        });
    },
    templateHelpers:function(){
        return {
            maxPoints: this.gameLeader('points'),
            maxRebounds: this.gameLeader('rebounds'),
            maxSteals: this.gameLeader('steals'),
            maxPointFormat: this.gameLeader('points').attributes.player_name.replace(/\s+/g, '_').toLowerCase(),
            maxReboundFormat: this.gameLeader('rebounds').attributes.player_name.replace(/\s+/g, '_').toLowerCase(),
            maxStealsFormat: this.gameLeader('steals').attributes.player_name.replace(/\s+/g, '_').toLowerCase()
        }
    },
    itemView: leaderView
});
