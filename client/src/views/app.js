var Marionette   = require('backbone.marionette'),
    Stellar      = require('jquery.stellar'),
    Snap         = require('snapjs'),
    LeaderView   = require('./leaders/leaders'),
    TeamsView    = require('./teams/teams'),
    DataView     = require('./data/teamData'),
    SettingsView = require('./settings/setTeams'), 
    FeedView     = require('./feed/feed'),
    TeamsCollection = require('../collections/teams');

module.exports = appView = Marionette.ItemView.extend({
    className: 'appView',
    template: require('../../templates/app.hbs'),
    events: {
        'mouseenter .home-boost': 'homeBoost',
        'mouseenter .away-boost': 'awayBoost'
    },
    initialize: function() {
        var self = this;
        this.snapMenu();
        this.facebook();
        App.vent.on('home-team-change', function(data) { self.changeHomeTeam(data); self.render(); });
        App.vent.on('away-team-change', function(data) { self.changeAwayTeam(data); self.render(); });
    },
    playing: function (value) {
        var models = this.collection.where({playing: true});
        return new TeamsCollection(models);
    },
    notPlaying: function (value) {
        var models = this.collection.where({playing: false});
        return new TeamsCollection(models);
    },
    onRender: function() {
        this.playingCollection  = this.playing();
        this.sidelineCollection = this.notPlaying();
        var team_id1 = this.playingCollection.pluck('_id')[0];
        var team_id2 = this.playingCollection.pluck('_id')[1];
        window.App.views.leaderView   = new LeaderView({ collection: this.playingCollection, id1: team_id1, id2: team_id2 }); 
        window.App.views.teamsView    = new TeamsView({ collection: this.playingCollection });
        window.App.views.dataView     = new DataView({ collection: this.playingCollection });
        window.App.views.settingsView = new SettingsView({ collection: this.sidelineCollection });
        window.App.views.feedView     = new FeedView({ collection: this.playingCollection });
        $('.settings .choose-teams').html(App.views.settingsView.render().el); // settings view
        this.$el.find('.app .teams-box').prepend(App.views.teamsView.render().el); // teams/players view
        this.$el.find('.app').prepend(App.views.dataView.render().el); // data view
        this.$el.prepend(App.views.leaderView.render().el); // leader view
        this.$el.find('.app .feed').html(App.views.feedView.render().el); // feed view
    },
    changeHomeTeam: function(data) {
        this.collection.each(function(team) {
            if(team.get('side') === 'home') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }
            if(team.get('team_name') === data) {
                team.set({playing: true, position: 1, side: 'home'});
                team.save();
            }  
        },this);
    },
    changeAwayTeam: function(data) {
        this.collection.each(function(team) {
            if(team.get('side') === 'away') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }
            if(team.get('team_name') === data) {
                team.set({playing: true, position: 2, side: 'away'});
                team.save();
            }  
        },this);
    },
    homeBoost:function(e) {
        $('.away-boost').removeClass('active');
        $(e.currentTarget).addClass('active');
        $(".col-md-9.playing").animate({ scrollTop: 0 }, 800);
    },
    awayBoost:function(e) {
        $('.home-boost').removeClass('active');
        $(e.currentTarget).addClass('active');
        $(".col-md-9.playing").animate({ scrollTop: 674 }, 800);
    },
    facebook: function() {
        $(document).on('fbStatusChange', function (event, data) {
            if (data.status === 'connected') {
                console.log('connected')
                FB.api('/554870764588961/members/', function (response) {
                    console.log(response);
                });
            } else {
                console.log('not connected')
            }
        });
    },
    snapMenu: function() {
        var snapper = new Snap({ element: document.getElementById('wrap') });
        $('.custom-toggle').click(function(){
            if( snapper.state().state=="left" ){
                snapper.close();
                $(this).removeClass('close-menu');
            } else {
                snapper.open('left');
                $(this).addClass('close-menu');
            }
        });
    }
});
