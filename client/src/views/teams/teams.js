var Marionette = require('backbone.marionette'),
    playerView = require('./player'),
    PlayersCollection = require('../../collections/players');

var teamView = Marionette.CompositeView.extend({
	className: 'team row',
    template: require('../../../templates/teams/team.hbs'),
    events: {
        'submit #AddPlayer': 'addPlayer'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.collection = this.model.players;
        this.teamIdentity(this.model.get('team_name'));

        console.log(this.model.players);
    },
    teamIdentity: function(name) {
        this.$el.addClass(name);
        this.$el.attr('data-team', name);
    },
    addPlayer: function(e) {
        e.preventDefault();
        var newPlayer = this.$el.find('input.player_name');
        this.model.addPlayer(newPlayer.val());
        newPlayer.val('');
    },
    itemView: playerView,
    appendHtml: function(collectionView, itemView){
        collectionView.$('.the-players').append(itemView.el);
    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'col-md-9 playing',
    template: require('../../../templates/teams/basketball.hbs'),
    events: {
        'submit #AddTeam': 'addTeam'
    },
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    addTeam: function(e) {
        e.preventDefault();
        var newTeam = this.$el.find('input.team_name').val();
        console.log(newTeam)
        this.collection.create({team_name: newTeam})
    },
    itemView: teamView
});
