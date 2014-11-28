var Marionette = require('backbone.marionette'),
    TeamSettingsLayoutView = require('./teamSettings');

/*
|--------------------------------------------------------------------------
| Layout view for a team in teamSettings rendered as an item, contains a 
| region to display team settings, change colors, name, and stats.
|--------------------------------------------------------------------------
*/

var listTeamsView = Marionette.Layout.extend({
    className: 'col-md-6',
    template: require('../../../templates/teamsView/team-list.hbs'),
    events: {
        'click .home': 'setHome',
        'click .away': 'setAway',
        'click .team-changes': 'teamChanges',
        'click .close-team-editor': 'closeTeamChanges'
    },
    regions: {
        teamSettings: '.team-editor'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    onRender: function() {
        this.$el.find('.team-block').colourBrightness();
    },
    setHome:function(e) { 
        App.vent.trigger('home-team-change', this.model.get('team_name'));
        App.data.teams.each(function(team) {
            // clear any team that has side:'home'
            if(team.get('side') === 'home') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }  
        },this);
        this.model.set({playing: true, position: 1, side: 'home'});
        this.model.save();
    },
    setAway:function(e) { 
        App.vent.trigger('away-team-change', this.model.get('team_name'));
        App.data.teams.each(function(team) {
            // clear any team that has side:'away'
            if(team.get('side') === 'away') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }  
        },this);
        this.model.set({playing: true, position: 2, side: 'away'});
        this.model.save();
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

var ListTeamView = Marionette.CompositeView.extend({
    template: require('../../../templates/teamsView/addTeamsView.hbs'),
    events: {
        'submit #AddTeam': 'addTeam'
    },
    addTeam: function(e) {
        e.preventDefault();
        var newTeam = this.$el.find('input.team_name').val();
        this.collection.create({team_name: newTeam})
    },
    itemView:listTeamsView
});

module.exports = TeamsView = Marionette.Layout.extend({
    className: 'settingsView row',
    template: require('../../../templates/teamsView/teamsView.hbs'),
    initialize:function() {
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
    },
    regions: {
        teams: ".the-teams"
    },
    onRender: function() {

        // show another view, add a new team??

        // show all the teams, thier data, and modification buttons
        var listTeamView = new ListTeamView({ 
            collection: this.collection
        });
        this.teams.show(listTeamView);

        // show another view, possibly the teams that are playing etc...

        this.setScroll();
    },
    setScroll:function() {
        var self = this;
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.settingsView').height(), // 60 for margins
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    }
});