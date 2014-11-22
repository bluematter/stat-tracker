var Marionette = require('backbone.marionette'),
    PlayersView = require('./player'),
    PlayersCollection = require('../../collections/players'),
    TeamSettingsLayoutView = require('../settings/teamSettings');

var teamView = Backbone.Marionette.Layout.extend({
	className: 'team row',
    template: require('../../../templates/teams/team.hbs'),
    events: {
        'click .team-changes': 'teamChanges',
        'click .close-team-editor': 'closeTeamChanges'
    },
    regions: {
        players: ".the-players",
        teamSettings: '.team-editor'
    },
    initialize: function() {

        var self = this;

        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);

        // pass the team name from the model to teamIdenity function
        this.teamIdentity(this.model.get('team_name'));

        // temp re render regions bench/playing collections
        // App.vent.on('subbed', function(data) {});

    },
    onRender: function() {

        // region showing a list of playing players  
        var Playingresults = App.data.players.where({ team_id: this.model.id, bench: false });
        var filteredPlayingCollection = new PlayersCollection(Playingresults); 

        var playersView = new PlayersView({ 
            collection: filteredPlayingCollection
        });
        this.players.show(playersView);

    },
    teamIdentity: function(teamName) {

        // add the team name to DOM // not really needed!!! consider removing??
        this.$el.addClass(teamName);
        this.$el.attr('data-team', teamName);

    },
    teamChanges:function() {
    
        // event triggers another Layout to make subs and add players etc
        var teamSettingsLayoutView = new TeamSettingsLayoutView({ 
            teamModel: this.model
        });
        this.teamSettings.show(teamSettingsLayoutView);

    },
    closeTeamChanges:function() {
        
        // event renders this based on changes made in Layout above and closes the Layout
        this.render();
        this.teamSettings.close();

    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'playing',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
        
        // builds a backbone collection from facebook API
        this.facebook(function (response) {
            var testCollection = new PlayersCollection(response);
            window.App.data.facebookPlayers = testCollection;
        });

        this.setScroll();

    },
    setScroll: function() {
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
    facebook: function(callback) {
        // Build object from facebook suitable for playersCollection
        // DOES NOT EXECUTE IT THIS IS NOT LOADED INITIALLY, IF ANOTHER
        // VIEW IS ACTIVE THIS WILL MISS...
        $(document).on('fbStatusChange', function (event, data) {
            if (data.status === 'connected') {
                console.log('facebook api connected')
                
                var facebookPlayers = [];

                FB.api('/554870764588961?fields=members{id,name,picture.type(large)}', function (response) {
                    for (i = 0; i < response.members.data.length; i++) { 
                        facebookPlayers.push({
                            player_name:response.members.data[i].name ,
                            player_picture:response.members.data[i].picture.data.url
                        });
                    }
                    callback(facebookPlayers);
                });

            } else {
                console.log('facebook api not connected')
            }
        });
    },
    itemView: teamView
});
