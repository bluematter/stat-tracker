var Marionette   = require('backbone.marionette'),
    Snap         = require('snapjs'),
    TeamsView    = require('../teams/teams'),
    DataView     = require('../data/teamData'),
    TeamsCollection = require('../../collections/teams');

module.exports = statsView = Marionette.ItemView.extend({
    className: 'statsView',
    template: require('../../../templates/statsView.hbs'),
    events: {
        'mouseenter .home-boost': 'homeBoost',
        'mouseenter .away-boost': 'awayBoost'
    },
    initialize: function() {

        var self = this;

        // intialize third party stuff
        this.facebook();

        this.$el.height($(window).height() - $('.navbar').outerHeight());

        // listen for changes 
        //App.vent.on('home-team-change', function(data) { self.changeHomeTeam(data); self.render(); });
        //App.vent.on('away-team-change', function(data) { self.changeAwayTeam(data); self.render(); });
    
    },
    onRender: function() {

        // make a collection for the teams that are playing
        this.playingCollection  = this.playingTeam();

        // make a collection for the teams that are inactive
        this.sidelineCollection = this.notPlayingTeam();
        
        // grab the playing teams ID's assuming there should be 2 teams only
        //var team_id1 = this.playingCollection.pluck('_id')[0];
        //var team_id2 = this.playingCollection.pluck('_id')[1];
        
        // initialize some views
        window.App.views.teamsView = new TeamsView({ collection: this.playingCollection });
        window.App.views.dataView  = new DataView({ collection: App.data.players });
        
        // append the view's to the DOM
        this.$el.find('.app .teams-box').prepend(App.views.teamsView.render().el); // teams/players view
        this.$el.find('.app').prepend(App.views.dataView.render().el); // data view
    },
    onShow:function() {
        setTimeout(function() {
            console.log(document.getElementById('stats'));  
        
            /* beta menu open */
            var snapper = new Snap({ element: document.getElementById('stats') });
            snapper.settings({
                resistance: 0.5,
                flickThreshold: 50,
                transitionSpeed: 0.3,
                easing: 'ease',
                maxPosition: 200
            });
            $('.custom-toggle').click(function(){
                if( snapper.state().state=="left" ){
                    snapper.close();
                    $(this).removeClass('close-menu');
                } else {
                    snapper.open('left');
                    $(this).addClass('close-menu'); 
                }
            });
            snapper.on('animated', function(){
                if(snapper.state().state != 'closed') {
                    $('.custom-toggle').addClass('close-menu');
                } else {
                    $('.custom-toggle').removeClass('close-menu');
                }
            });
        },0);
    },
    playingTeam: function (value) {
        
        // determine who is playing by looking for the team models
        // that have "playing" set to true
        var models = this.collection.where({playing: true});
        return new TeamsCollection(models);

    },
    notPlayingTeam: function (value) {

        // determine who is NOT playing by looking for the team models
        // that have "playing" set to false
        var models = this.collection.where({playing: false});
        return new TeamsCollection(models);

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
    }
});
