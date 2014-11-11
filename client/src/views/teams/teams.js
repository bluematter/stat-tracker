var Marionette = require('backbone.marionette'),
    PlayerView = require('./player'),
    PlayersCollection = require('../../collections/players'),
    TeamSettingsLayoutView = require('../settings/teamSettings');

var teamView = Marionette.CompositeView.extend({
	className: 'team row',
    template: require('../../../templates/teams/team.hbs'),
    itemViewContainer: '.the-players',
    events: {
        'submit #AddPlayer': 'addPlayer',
        'click .team-changes': 'teamChanges',
        'click .close-team-editor': 'closeTeamChanges'
    },
    initialize: function() {
        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);
        
        // build a collection of players with this team ID
        //this.collection = new PlayersCollection(App.data.players.where({team_id: this.model.id}));

        this.collection = this.playingPlayers();

        // pass the team name from the model to teamIdenity function
        this.teamIdentity(this.model.get('team_name'));

    },
    teamIdentity: function(teamName) {
        // add the team name to DOM
        this.$el.addClass(teamName);
        this.$el.attr('data-team', teamName);
    },
    playingPlayers: function (value) {

        //var models = this.collection.where({playing: true});
        var models = App.data.players.where({team_id: this.model.id,bench:false});
        return new PlayersCollection(models);

    },
    benchPlayers: function (value) {

        //var models = this.collection.where({playing: false});
        var models = App.data.players.where({team_id: this.model.id,bench:true});
        return new PlayersCollection(models);

    },
    teamChanges:function() {
        this.playingCollection = this.playingPlayers();
        this.benchedCollection = this.benchPlayers();

        console.log(this.playingCollection);
        console.log(this.benchedCollection);
        
        window.App.views.teamSettingsLayoutView = new TeamSettingsLayoutView({ 
            collection: this.playingCollection,
            benchedCollection: this.benchPlayers()
        });
        this.$el.find('.team-editor').html(App.views.teamSettingsLayoutView.render().el);
    },
    closeTeamChanges:function() {
        window.App.views.teamSettingsLayoutView.close();
    },
    addPlayer: function(e) {
        e.preventDefault();
        
        var $newPlayer = this.$el.find('input.player_name')
        
        var newPlayer = App.data.players.create({player_name : $newPlayer.val(), team_id : this.model.id, bench: true});
        //this.collection.add(newPlayer);

        $newPlayer.val('');

    },
    itemView: PlayerView
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'playing',
    template: require('../../../templates/teams/basketball.hbs'),
    events: {
        'submit #AddTeam': 'addTeam'
    },
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
        //$(this.$el).slimScroll();
    },
    addTeam: function(e) {
        e.preventDefault();
        var newTeam = this.$el.find('input.team_name').val();
        this.collection.create({team_name: newTeam})
    },
    itemView: teamView
});
