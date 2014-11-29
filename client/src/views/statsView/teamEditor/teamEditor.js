var Marionette         = require('backbone.marionette'),
    PlayingPlayersView = require('./playingPlayers/playingPlayers.js'),
    BenchPlayersView   = require('./benchPlayers/benchPlayers.js');


/*
|--------------------------------------------------------------------------
| A simple ItemView that contains actions to create a player from scratch
|--------------------------------------------------------------------------
*/

var AddPlayerSettingsView = Marionette.ItemView.extend({
    template: require('../../../../templates/statsView/teamEditor/addplayerSettings.hbs'),
    events: {
        'submit #AddPlayer': 'addPlayer'
    },

    initialize:function() {
    },
    addPlayer: function(e) {
        
        // move this form??
        e.preventDefault();
        
        var $newPlayer = this.$el.find('input.player_name')
        var newPlayer = App.data.players.create({player_name : $newPlayer.val(), team_id : this.model.id, bench: true});

        App.vent.trigger('newPlayer');

        $newPlayer.val('');

    }
});



/*
|--------------------------------------------------------------------------
| A collection of facebookers that contains a click to add a player 
| from the FB api.
|--------------------------------------------------------------------------
*/

var addFacebookPlayersView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../../templates/statsView/teamEditor/addFacebookPlayer.hbs'),
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


/*
|--------------------------------------------------------------------------
| A Layout view that handles the team editor stuff.
|--------------------------------------------------------------------------
*/

module.exports = teamEditor = Backbone.Marionette.Layout.extend({
    className: 'edit',
    template: require('../../../../templates/statsView/teamEditor/teamSettings.hbs'),
    events: {
        'click .add-player': 'addPlayerRegion',
        'click .list-facebookers': 'facebookRegion',
        'click .go-back': 'goBack'
    },

    regions: {
        addPlayer: ".add-player-section",
        playingPlayers: ".playing-players",
        benchPlayers: ".bench-players",
        facebookPlayers: ".facebook-players"
    },

    initialize: function() {
        var self = this;

        /*
        |--------------------------------------------------------------------------
        | This App.vent triggers a re render if a new player was subbed or added.
        |--------------------------------------------------------------------------
        */

        App.vent.on('newPlayer', function(data) { self.render() });
        App.vent.on('subbed', function(data) { self.render() });

    },

    onRender: function() {

        /*
        |--------------------------------------------------------------------------
        | This area needs a height for slimScroll to work, could be improved.
        |--------------------------------------------------------------------------
        */

        this.$el.height(this.$el.height());


        /*
        |--------------------------------------------------------------------------
        | Create an instance of PlayingPlayers and show it in the proper region.
        | Pass a collection of the players that are playing.
        |--------------------------------------------------------------------------
        */

        var playingPlayersSettingsView = new PlayingPlayersView({ 
            collection: App.data.players.byPlaying(this.options.teamModel.id)
        });
        this.playingPlayers.show(playingPlayersSettingsView);


        /*
        |--------------------------------------------------------------------------
        | Create an instance of BenchPlayers and show it in the proper region.
        | Pass a collection of the players that are on the bench.
        |--------------------------------------------------------------------------
        */

        var benchPlayersSettingsView = new BenchPlayersView({ 
            collection: App.data.players.byBench(this.options.teamModel.id)
        });
        this.benchPlayers.show(benchPlayersSettingsView);

    },
    addPlayerRegion: function() {

        //TODO: This is sloppy, improve this stackoverflow??
        
        // hide some region
        this.playingPlayers.$el.hide();
        this.benchPlayers.$el.hide();

        // region to add players
        var addPlayerSettingsView = new AddPlayerSettingsView({ 
            model: this.options.teamModel
        });
        this.addPlayer.show(addPlayerSettingsView);
        
        // need to show the el if its been hidden
        this.addPlayer.$el.show();
    },
    facebookRegion: function() {

        //TODO: This is sloppy, improve this stackoverflow??
        
        // hide some region
        this.playingPlayers.$el.hide();
        this.benchPlayers.$el.hide();

        // region showing a list of facebookers  
        var addFacebookPlayersView = new AddFacebookPlayersView({ 
            collection: App.data.facebookPlayers,
            teamModel: this.options.teamModel
        });
        this.facebookPlayers.show(addFacebookPlayersView);
        
        // need to show the el if its been hidden
        this.facebookPlayers.$el.show();
    },
    goBack: function() {

        //TODO: This is sloppy, improve this stackoverflow??

        this.facebookPlayers.$el.hide();
        this.playingPlayers.$el.show();
        this.benchPlayers.$el.show();
    }
});