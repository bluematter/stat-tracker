var Marionette = require('backbone.marionette'),
    PlayersCollection = require('../../collections/players');


/* Form to add player */
var AddPlayerSettingsView = Marionette.ItemView.extend({
    template: require('../../../templates/settings/addplayerSettings.hbs'),

    initialize:function() {
    }
});
/* Form to add player */





/* Players who are playing */
var playingPlayerSettingsView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../templates/settings/playerSettings.hbs'),
    events: {
        'click': 'putBench'
    },

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    },
    putBench:function() {
        this.model.set({bench:true});
        this.model.save();
        App.vent.trigger('subbed');
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});

var PlayingPlayersSettingsView = Marionette.CollectionView.extend({
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, "reset", this.render, this);
    },
    itemView: playingPlayerSettingsView
});
/* end players who are playing */




/* Players who are on the bench */
var benchPlayerSettingsView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../templates/settings/playerSettings.hbs'),
    events: {
        'click': 'putGame'
    },

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    },
    putGame:function() {
        this.model.set({bench:false});
        this.model.save();
        App.vent.trigger('subbed');
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});

var BenchPlayersSettingsView = Marionette.CollectionView.extend({

    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
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

    initialize: function() {
        var self = this;

        // temp re render regions bench/playing collections
        App.vent.on('subbed', function(data) { self.render() });
    },

    onRender: function() {
        
        // region to add players
        var addPlayerSettingsView = new AddPlayerSettingsView({ 
            model: this.options.teamModel
        });
        this.addPlayer.show(addPlayerSettingsView);
        


        // region showing a list of playing players  
        var Playingresults = App.data.players.where({ team_id: this.options.teamModel.id, bench: false });
        var filteredPlayingCollection = new PlayersCollection(Playingresults); 

        var playingPlayersSettingsView = new PlayingPlayersSettingsView({ 
            collection: filteredPlayingCollection
        });
        this.playingPlayers.show(playingPlayersSettingsView);



        // region showing a list of bench players  
        var Benchresults = App.data.players.where({ team_id: this.options.teamModel.id, bench: true });
        var filteredBenchCollection = new PlayersCollection(Benchresults); 

        var benchPlayersSettingsView = new BenchPlayersSettingsView({ 
            collection: filteredBenchCollection
        });
        this.benchPlayers.show(benchPlayersSettingsView);

    }
});