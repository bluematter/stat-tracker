var Marionette = require('backbone.marionette');

var listTeamsView = Marionette.ItemView.extend({
    className: 'col-md-6',
    template: require('../../../templates/team-list.hbs'),
    events: {
        'click .home': 'setHome',
        'click .away': 'setAway'
    },
    setHome:function(e) { 
        //App.vent.trigger('home-team-change', this.model.get('team_name'));
        App.data.teams.each(function(team) {
            // clear any team that has side:'home'
            if(team.get('side') === 'home') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }  
        },this);
        this.model.set({playing: true, position: 1, side: 'home'});
        this.model.save();
    },
    setAway:function(e) { 
        //App.vent.trigger('away-team-change', this.model.get('team_name'));
        App.data.teams.each(function(team) {
            // clear any team that has side:'away'
            if(team.get('side') === 'away') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }  
        },this);
        this.model.set({playing: true, position: 2, side: 'away'});
        this.model.save();
    }
});

module.exports = SettingsView = Marionette.CollectionView.extend({
    className: 'row',
    initialize:function() {
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
    },
    itemView:listTeamsView
});