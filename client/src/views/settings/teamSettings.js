var Marionette = require('backbone.marionette'),
    PlayersCollection = require('../../collections/players');


/* Form to add player */
var AddPlayerSettingsView = Marionette.ItemView.extend({
    template: require('../../../templates/settings/addplayerSettings.hbs'),
    events: {
        'submit #AddPlayer': 'addPlayer'
    },

    initialize:function() {
    },
    addPlayer: function(e) {
        
        // move this??
        e.preventDefault();
        
        var $newPlayer = this.$el.find('input.player_name')
        var newPlayer = App.data.players.create({player_name : $newPlayer.val(), team_id : this.model.id, bench: true});

        App.vent.trigger('newPlayer');

        $newPlayer.val('');

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
    onRender: function() {
        var self = this;
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.editor').height(),
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    },
    itemView: benchPlayerSettingsView
});
/* end players who are on the bench */



/* Players from facebook */
var addFacebookPlayersView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../templates/settings/addFacebookPlayer.hbs'),
    events: {
        'click': 'addToRoster'
    },

    initialize:function(options) {
        this.listenTo(this.model, 'change', this.render);
        this.team = options.team;
    },
    addToRoster:function() {
        this.model.set({team_id: this.team.id, bench:true});
        this.model.save();
        App.data.players.add(this.model);
        App.vent.trigger('subbed');
    }
});

var AddFacebookPlayersView = Marionette.CollectionView.extend({

    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
        this.team = this.options.teamModel
    },
    onRender: function() {
        var self = this;
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.editor').height() - $('.sub-players').height() - $('.add-player').height(),
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    },
    itemView: addFacebookPlayersView,
    itemViewOptions: function(model,index){
        return{
             team: this.team
        }
    }
});
/* end players from facebook */






module.exports = teamSettingsLayoutView = Backbone.Marionette.Layout.extend({
    className: 'edit',
    template: require('../../../templates/settings/teamSettings.hbs'),
    events: {
        'click .list-facebookers': 'facebookRegion',
        'click .go-back': 'goBack'
    },

    regions: {
        addPlayer: ".add-player",
        playingPlayers: ".playing-players",
        benchPlayers: ".bench-players",
        facebookPlayers: ".facebook-players"
    },

    initialize: function() {
        var self = this;

        // temp re render regions bench/playing collections
        App.vent.on('newPlayer', function(data) { self.render() });
        App.vent.on('subbed', function(data) { self.render() });

    },

    onRender: function() {

        // set scrollbars, set height??
        this.$el.height(this.$el.height());
        
        // region to add players
        var SpecificTeam = App.data.players.where({ team_id: this.options.teamModel.id });
        var filteredByTeamCollection = new PlayersCollection(SpecificTeam); 

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

    },
    facebookRegion: function() {
        
        // hide some region
        this.playingPlayers.$el.hide();
        this.benchPlayers.$el.hide();

        // region showing a list of facebookers  
        var addFacebookPlayersView = new AddFacebookPlayersView({ 
            collection: App.data.facebookPlayers,
            teamModel: this.options.teamModel
        });
        this.facebookPlayers.show(addFacebookPlayersView);
        
        // need to show the el after hiding
        this.facebookPlayers.$el.show();
    },
    goBack: function() {

        this.facebookPlayers.$el.hide();

        this.playingPlayers.$el.show();
        this.benchPlayers.$el.show();
    }
});