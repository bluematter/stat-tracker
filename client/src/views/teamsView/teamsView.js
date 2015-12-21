var Marionette = require('backbone.marionette'),
    TeamSettingsLayoutView = require('./teamEditor/teamEditor');

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
    setHome:function(e) {
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
    
        /*
        |--------------------------------------------------------------------------
        | When .team-changes is clicked we render an editor within this view.
        |--------------------------------------------------------------------------
        */

        var teamSettingsLayoutView = new TeamSettingsLayoutView({ 
            teamModel: this.model
        });
        this.teamSettings.show(teamSettingsLayoutView);

    },
    closeTeamChanges:function() {
        
        /*
        |--------------------------------------------------------------------------
        | When .close-team-editor is clicked we re-render this view so that it can
        | form any changes made by the editor, then we close the editor.
        |--------------------------------------------------------------------------
        */

        this.render();
        this.teamSettings.close();

    },
    convertHex: function(hex,opacity) {
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    },
    templateHelpers:function(){
        
        var hex2rgba = this.convertHex(this.model.get('team_color'),80);

        return {
            opaqueTeam_color: hex2rgba
        }
    }
});

var ListTeamView = Marionette.CollectionView.extend({
    itemView:listTeamsView
});


/*
|--------------------------------------------------------------------------
| View to create a new team
|--------------------------------------------------------------------------
*/

var CreateTeamView = Marionette.Layout.extend({
    template: require('../../../templates/teamsView/teamEditor/createTeamView.hbs'),
    events: {
        'submit #CreateTeam': 'createTheTeam'
    },
    initialize: function() {

        // do stuff to add a team to App.data.teams.create({team_name: 'Input Info here'})

    },
    createTheTeam: function(e) {
        e.preventDefault();

        // add some validation??
        App.data.teams.create({
            team_name: $('.team_name').val(),
            team_color: $('.team_color').val()
        });
    }
});


/*
|--------------------------------------------------------------------------
| Layout to manage the TeamsView, contains a list of teams, and another
| view to create teams.
|--------------------------------------------------------------------------
*/

module.exports = TeamsView = Marionette.Layout.extend({
    className: 'settingsView row',
    template: require('../../../templates/teamsView/teamsView.hbs'),
    events: {
        'click .create-team-btn': 'createTeam',
        'click .close-team-editor': 'closeCreateTeam'
    },
    initialize:function() {
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
    },
    regions: {
        teams: ".the-teams",
        createTeamRegion: ".new-team-editor"
    },
    onRender: function() {

        /*
        |--------------------------------------------------------------------------
        | Show the teams CollectionView inside .the-teams div
        |--------------------------------------------------------------------------
        */

        var listTeamView = new ListTeamView({ 
            collection: this.collection
        });
        this.teams.show(listTeamView);
        

        this.setScroll();
    },
    createTeam: function() {

        /*
        |--------------------------------------------------------------------------
        | View to add a new team model to App.data.teams collection
        |--------------------------------------------------------------------------
        */

        var createTeamView = new CreateTeamView();
        this.createTeamRegion.show(createTeamView);

    },
    closeCreateTeam: function() {

        /*
        |--------------------------------------------------------------------------
        | Just re-render a fresh view upon closing of createTeam.. good practice 
        | to close?? 
        |--------------------------------------------------------------------------
        */

        this.render();
        this.createTeamRegion.close();

    },
    setScroll:function() {

        /*
        |--------------------------------------------------------------------------
        | Set scrollbar in case amount of teams is bigger than screen size
        |--------------------------------------------------------------------------
        */

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