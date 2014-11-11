var Marionette = require('backbone.marionette');


/* Form to add player */
var AddPlayerSettingsView = Marionette.ItemView.extend({
    template: require('../../../templates/settings/addplayerSettings.hbs'),

    initialize:function() {
    },
    onRender: function() {
    }
});
/* Form to add player */


/* Players who are playing */
var playingPlayerSettingsView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../templates/settings/playerSettings.hbs'),

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    },
    onRender: function() {

    }
});

var PlayingPlayersSettingsView = Marionette.CollectionView.extend({

    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    onRender: function() {

    },
    itemView: playingPlayerSettingsView
});
/* end players who are playing */


/* Players who are on the bench */
var benchPlayerSettingsView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../templates/settings/playerSettings.hbs'),

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);

        window.DROSE = this.model;
    },
    onRender: function() {

    }
});

var BenchPlayersSettingsView = Marionette.CollectionView.extend({

    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    onRender: function() {

    },
    itemView: benchPlayerSettingsView
});
/* end players who are on the bench */


module.exports = teamSettingsLayoutView = Backbone.Marionette.Layout.extend({
    className: 'edit',
    template: require('../../../templates/settings/teamSettings.hbs'),

    regions: {
        addPlayer: ".add-player",
        playingPlayers: ".playing-players",
        benchPlayers: ".bench-players"
    },

    onRender: function() {

        console.log(this.options.benchedCollection)
        
        // add players
        var addPlayerSettingsView = new AddPlayerSettingsView({ collection: this.collection });
        this.addPlayer.show(addPlayerSettingsView);
        
        // playing players   
        var playingPlayersSettingsView = new PlayingPlayersSettingsView({ collection: this.collection });
        this.playingPlayers.show(playingPlayersSettingsView);

        // bench players   
        var benchPlayersSettingsView = new BenchPlayersSettingsView({ collection: this.options.benchedCollection });
        this.benchPlayers.show(benchPlayersSettingsView);
    }
});