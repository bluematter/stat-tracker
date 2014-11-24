var Marionette = require('backbone.marionette'),
    PlayersView = require('./player'),
    PlayersCollection = require('../../collections/players'),
    TeamSettingsLayoutView = require('../settings/teamSettings');

/*
|--------------------------------------------------------------------------
| Layout view for a team rendered as an item, contains a region to display 
| players for stat tracking, and a region to display team settings
|--------------------------------------------------------------------------
*/

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
        this.listenTo(this.model, 'change', this.render);
    },
    onRender: function() {

        // region showing a list of playing players  
        var playersView = new PlayersView({ collection: App.data.players.byPlaying(this.model.id) });
        this.players.show(playersView);

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


/*
|--------------------------------------------------------------------------
| CollectionView for a collection of teams, renders each team as an Item
|--------------------------------------------------------------------------
*/

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'playing',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
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
    itemView: teamView
});
