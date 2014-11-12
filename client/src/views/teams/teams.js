var Marionette = require('backbone.marionette'),
    PlayersView = require('./player'),
    PlayersCollection = require('../../collections/players'),
    TeamSettingsLayoutView = require('../settings/teamSettings');

var teamView = Backbone.Marionette.Layout.extend({
	className: 'team row',
    template: require('../../../templates/teams/team.hbs'),
    events: {
        'submit #AddPlayer': 'addPlayer',
        'click .team-changes': 'teamChanges',
        'click .close-team-editor': 'closeTeamChanges'
    },
    regions: {
        players: ".the-players"
    },
    initialize: function() {

        var self = this;

        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);

        // pass the team name from the model to teamIdenity function
        this.teamIdentity(this.model.get('team_name'));

        // temp re render regions bench/playing collections
        App.vent.on('subbed', function(data) { self.setRegion() });

    },
    onRender: function() {

        this.setRegion();

    },
    setRegion: function() {

        // region showing a list of playing players  
        var Playingresults = App.data.players.where({ team_id: this.model.id, bench: false });
        var filteredPlayingCollection = new PlayersCollection(Playingresults); 

        var playersView = new PlayersView({ 
            collection: filteredPlayingCollection
        });
        this.players.show(playersView);

    },
    teamIdentity: function(teamName) {

        // add the team name to DOM
        this.$el.addClass(teamName);
        this.$el.attr('data-team', teamName);

    },
    teamChanges:function() {
        
        window.App.views.teamSettingsLayoutView = new TeamSettingsLayoutView({ 
            teamModel: this.model
        });
        this.$el.find('.team-editor').toggleClass('hide show').append(App.views.teamSettingsLayoutView.render().el);
    
    },
    closeTeamChanges:function() {

        this.$el.find('.team-editor').toggleClass('show hide')
        window.App.views.teamSettingsLayoutView.close();

    },
    addPlayer: function(e) {

        e.preventDefault();
        
        var $newPlayer = this.$el.find('input.player_name')
        var newPlayer = App.data.players.create({player_name : $newPlayer.val(), team_id : this.model.id, bench: true});
        //this.collection.add(newPlayer);

        $newPlayer.val('');

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
    onRender: function() {
        var self = this;
        this.$el.height($('.statsView').height());
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.statsView').height() - 62, // 60 for margins
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    },
    addTeam: function(e) {
        e.preventDefault();
        var newTeam = this.$el.find('input.team_name').val();
        this.collection.create({team_name: newTeam})
    },
    itemView: teamView
});
