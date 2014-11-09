var Marionette = require('backbone.marionette');

module.exports = playerView = Marionette.ItemView.extend({
	className: 'players-wrap row',
    template: require('../../../templates/teams/player.hbs'),
    events: {
    	'mouseenter .player-image': 'playerOn',
        'mouseleave .player-image': 'playerOff',
        'click .player-image': 'playerClicked',
        'keydown': 'on_keypress',
        'click .one-point': 'onePoint',
        'click .two-point': 'twoPoint',
        'click .three-point': 'threePoint'
    },
    initialize:function() {
    	_.bindAll(this, 'on_keypress');
        $(document).bind('keydown', this.on_keypress);
        this.listenTo(this.model, 'change', this.render);
        this.$el.attr('data-player', this.model.get('player_name').replace(/\s+/g,"_").toLowerCase());
    },
    playerOn:function(e) {
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
    },
    twoPoint:function(e) {
        var addStat = parseInt(this.model.get('points')) + 2;        
        this.model.set('points', addStat);
        this.model.save();
    },
    threePoint:function(e) {
        var addStat = parseInt(this.model.get('points')) + 3;        
        this.model.set('points', addStat);
        this.model.save();
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
            }
		}
	},
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});
