var Marionette   = require('backbone.marionette'),
    Snap         = require('snapjs'),
    TeamsView    = require('../teams/teams'),
    DataView     = require('../data/teamData'),
    TeamsCollection = require('../../collections/teams');

module.exports = statsView = Marionette.ItemView.extend({
    className: 'statsView',
    template: require('../../../templates/statsView.hbs'),
    
    initialize: function() {

        // intialize third party stuff
        this.facebook();
        // temp height
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());

    },
    onRender: function() {

        // make a collection for the teams that are playing
        this.playingCollection  = this.playingTeam();
        // make a collection for the teams that are inactive
        this.sidelineCollection = this.notPlayingTeam();
        
        // initialize subviews for statsView
        window.App.views.teamsView = new TeamsView({ collection: this.playingCollection });
        window.App.views.dataView  = new DataView({ collection: App.data.players });
        
        // append the view's to the DOM (turn into LayoutView??)
        this.$el.find('.app .teams-box').prepend(App.views.teamsView.render().el); // teams/players view
        this.$el.find('.app').prepend(App.views.dataView.render().el); // data view
    },
    playingTeam: function (value) {
        // get playing team from backbone.collection.extend filter??

        // determine who is playing by looking for the team models
        // that have "playing" set to true
        var models = this.collection.where({playing: true});
        return new TeamsCollection(models);

    },
    notPlayingTeam: function (value) {
        // get playing team from backbone.collection.extend filter??

        // determine who is NOT playing by looking for the team models
        // that have "playing" set to false
        var models = this.collection.where({playing: false});
        return new TeamsCollection(models);

    },
    facebook: function() {
        // WIP
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
