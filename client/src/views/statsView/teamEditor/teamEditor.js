var Marionette         = require('backbone.marionette'),
    PlayingPlayersView = require('./playingPlayers/playingPlayers.js'),
    BenchPlayersView   = require('./benchPlayers/benchPlayers.js');


/*
|--------------------------------------------------------------------------
| A layout view that merges PlayingPlayers and BenchPlayers into one
|--------------------------------------------------------------------------
*/

var RosterSettingsView = Marionette.Layout.extend({
    template: require('../../../../templates/statsView/teamEditor/rosterSettings.hbs'),
    regions: {
        playingRegion: '.playing-players',
        benchRegion: '.bench-players'
    },
    onRender: function() {

        var playingPlayersSettingsView = new PlayingPlayersView({ 
            collection: App.data.players.byPlaying(this.model.id, this.options.wid)
        });
        this.playingRegion.show(playingPlayersSettingsView);


        var benchPlayersSettingsView = new BenchPlayersView({ 
            collection: App.data.players.byBench(this.model.id, this.options.wid)
        });
        this.benchRegion.show(benchPlayersSettingsView);

    }
});

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
        
        var playerName = this.$el.find('input.player_name');

        var newPlayer = {
            player_name : playerName.val(), 
            team_id : this.model.id, 
            bench: true
        }
        //App.data.players.create(newPlayer);
        App.data.players.add(newPlayer);
        App.vent.trigger('newPlayer');

        playerName.val('');

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
        this.setScroll();
    },
    setScroll: function() {
        var self = this;
        this.$el.height($('.editor').height() - 48);
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.editor').height() - 48,
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
        managePlayers: '.manage-players-area'
    },

    initialize: function() {
        var self = this;

        /*
        |--------------------------------------------------------------------------
        | This App.vent triggers a re render if a new player was subbed or added.
        |--------------------------------------------------------------------------
        */

        App.vent.on('newPlayer', function(data) { 
            self.render();
        });
        App.vent.on('subbed', function(data) { 
            self.render();
        });

    },

    onRender: function() {


        /*
        |--------------------------------------------------------------------------
        | Create an instance of RosterSettingsView and pass it into managePlayers
        |--------------------------------------------------------------------------
        */

        var rosterSettingsView = new RosterSettingsView({model: this.options.teamModel, wid: this.options.wid});
        this.managePlayers.show(rosterSettingsView);

    },
    addPlayerRegion: function() {
        
        /*
        |--------------------------------------------------------------------------
        | Destroy old managePlayers, create a instance of AddPlayerSettingsView
        | then show it into new managePlayers
        |--------------------------------------------------------------------------
        */
        
        var addPlayerSettingsView = new AddPlayerSettingsView({model: this.options.teamModel});
        this.managePlayers.show(addPlayerSettingsView);

    },
    facebookRegion: function() {
        
        /*
        |--------------------------------------------------------------------------
        | Destroy old managePlayers, create a instance of AddFacebookPlayersView
        | then show it into new managePlayers
        |--------------------------------------------------------------------------
        */
        
        var addFacebookPlayersView = new AddFacebookPlayersView({ 
            collection: App.data.facebookPlayers,
            teamModel: this.options.teamModel
        });
        this.managePlayers.show(addFacebookPlayersView);

    },
    goBack: function() {
        
        // freshen up the view???
        this.render();

    },
    templateHelpers:function(){
        return {
            team_color: this.options.teamModel.get('team_color')
        }
    }
});