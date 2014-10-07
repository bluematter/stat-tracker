var Marionette = require('backbone.marionette'),
    playerView = require('./player'),
    PlayersCollection = require('../../collections/players');

var teamView = Marionette.CompositeView.extend({
	className: 'team row',
    template: require('../../../templates/teams/team.hbs'),
    events: {
        'submit #AddPlayer': 'addPlayer',
        'click .team-changes': 'teamChanges'
    },
    initialize: function() {
        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);

        // define this collection (its a model with an array) as a collection of players
        this.collection = this.model.players;

        // pass the team name from the model to teamIdenity function
        this.teamIdentity(this.model.get('team_name'));
    },
    teamIdentity: function(teamName) {
        // add the team name to DOM
        this.$el.addClass(teamName);
        this.$el.attr('data-team', teamName);
    },
    teamChanges:function() {
         this.$el.find('.team-editor').addClass('edit');
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
    className: 'playing',
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
