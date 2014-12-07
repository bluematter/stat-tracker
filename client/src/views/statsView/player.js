var Marionette = require('backbone.marionette');
var TeamsCollection = require('../../collections/teams');

/*
|--------------------------------------------------------------------------
| ItemView for each player, contains logic to add stats to the player, 
| and adds to the global teams collection for team stats.
|--------------------------------------------------------------------------
*/

var playerView = Marionette.ItemView.extend({
	className: 'players-wrap row',
    template: require('../../../templates/statsView/player.hbs'),
    events: {
    	'mouseenter .player-image': 'playerOn',
        'mouseleave .player-image': 'playerOff',
        'click .player-image': 'playerClicked',
        'keydown': 'on_keypress',
        'click .one-point': 'onePoint',
        'click .two-point': 'twoPoint',
        'click .three-point': 'threePoint',
        'click .add-rebound': 'addRebound',
        'click .add-steal': 'addSteal',
        'click .add-block': 'addBlock',
        'click .add-foul': 'addFoul'
    },
    initialize:function() {
        this.listenTo(this.model, 'change', this.render);

    	_.bindAll(this, 'on_keypress');
        $(document).bind('keydown', this.on_keypress);

    },
    onRender: function() {
        this.$el.attr('data-player', this.model.get('player_name').replace(/\s+/g,"_").toLowerCase());
    },
    playerOn:function() {
    	this.$el.addClass('hover');
        this.findPlayer(this.model.get('player_name'), 'add');   	
    },
    playerOff:function() {
    	this.$el.removeClass('hover');
        this.findPlayer(this.model.get('player_name'), 'remove');
    },
    playerClicked:function() {
        this.$el.toggleClass('hover-clicked');
        this.findPlayer(this.model.get('player_name'), 'toggle'); 
    },
    findPlayer:function(name, action) {
        var player = $('.data-wrap .player-data[data-player='+ name.replace(/\s+/g,"_").toLowerCase() +']');
        if(action === 'toggle') { player.toggleClass('show-confirmed-clicked') }
        if(action === 'add')    { player.addClass('show-player-data') }
        if(action === 'remove') { player.removeClass('show-player-data') }
    },
    onePoint:function(e) {
        var addStat = parseInt(this.model.get('points')) + 1;        
        this.model.set('points', addStat);
        this.model.save();

        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({points: parseInt(theTeam.get('points')) + 1 });
        });
    },
    twoPoint:function(e) {
        var addStat = parseInt(this.model.get('points')) + 2;        
        this.model.set('points', addStat);
        this.model.save();
        
        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({points: parseInt(theTeam.get('points')) + 2 });
        });
    },
    threePoint:function(e) {
        var addStat = parseInt(this.model.get('points')) + 3;        
        this.model.set('points', addStat);
        this.model.save();

        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({points: parseInt(theTeam.get('points')) + 3 });
        });
    },
    addRebound:function(e) {
        var addStat = parseInt(this.model.get('rebounds')) + 1;        
        this.model.set('rebounds', addStat);
        this.model.save();

        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({rebounds: parseInt(theTeam.get('rebounds')) + 1 });
        });
    },
    addSteal:function(e) {
        var addStat = parseInt(this.model.get('steals')) + 1;        
        this.model.set('steals', addStat);
        this.model.save();

        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({steals: parseInt(theTeam.get('steals')) + 1 });
        });
    },
    addBlock:function(e) {
        var addStat = parseInt(this.model.get('blocks')) + 1;        
        this.model.set('blocks', addStat);
        this.model.save();

        // better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({blocks: parseInt(theTeam.get('blocks')) + 1 });
        });
    },
    addFoul:function(e) {
        //$(e.currentTarget).css({'background-color': '#f38079', 'border-color': '#f38079'});
        var addStat = parseInt(this.model.get('fouls')) + 1;        
        this.model.set('fouls', addStat);
        this.model.save();

        //better way to update team stats from new player stats... still BETA
        var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
        var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
        thisPlayersTeam.each(function(theTeam) {
            theTeam.save({fouls: parseInt(theTeam.get('fouls')) + 1 });
        });
    },
    on_keypress:function(e) {
        this.keyStat(e, 49, 'points', 1);   // 1 point
        this.keyStat(e, 50, 'points', 2);   // 2 points
        this.keyStat(e, 51, 'points', 3);   // 3 points
        this.keyStat(e, 82, 'rebounds', 1); // R rebounds
        this.keyStat(e, 83, 'steals', 1); // S steals
	},
	keyStat:function(e, keyVal, stat, number) {
		if(e.keyCode == keyVal && !e.ctrlKey) { 
		    if(this.$el.hasClass('hover')) {
                var addStat = parseInt(this.model.get(stat)) + number;        
	            this.model.set(stat, addStat);
                this.model.save();

                // better way to update team stats from new player stats... still BETA
                var getPlayersTeam = App.data.teams.where({_id: this.model.get('team_id')});
                var thisPlayersTeam = new TeamsCollection(getPlayersTeam);
                thisPlayersTeam.each(function(theTeam) {
                    theTeam.save({stat: parseInt(theTeam.get(stat)) + number });
                });
            }
		}
	},
    removePoint: function() {
        
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});


/*
|--------------------------------------------------------------------------
| CollectionView for all the players the parent Teams Layout filters the 
| players, so this view only returns players that match a team_id
|--------------------------------------------------------------------------
*/

module.exports = PlayersView = Marionette.CollectionView.extend({ 
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: playerView
});
