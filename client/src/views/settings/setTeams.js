var Marionette = require('backbone.marionette');

var listTeamsView = Marionette.ItemView.extend({
    tagName: 'li',
    template: require('../../../templates/team-list.hbs'),
    events: {
        'click': 'setTeam'
    },
    initialize:function() {

    },
    setTeam:function(e) { 
        if($(e.currentTarget).closest('.choose-teams').hasClass('home')) {
            App.vent.trigger('home-team-change', this.model.get('team_name'));
        } else {
            App.vent.trigger('away-team-change', this.model.get('team_name'));
        }
    }
});

module.exports = SettingsView = Marionette.CollectionView.extend({
    tagName: 'ul',
    initialize:function() {
        
    },
    itemView:listTeamsView
});