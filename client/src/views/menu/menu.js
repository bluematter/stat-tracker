var Marionette = require('backbone.marionette');

module.exports = MenuView = Backbone.Marionette.Layout.extend({
    template: require('../../../templates/menu/menu.hbs'),

    initialize: function(){
        console.log('Region 1 Layout: initialize');
    },
    onRender: function(){
        console.log('Region 1 Layout: onRender');
    },
    onShow: function(){
        console.log('Region 1 Layout: onShow');
    },
    changeHomeTeam: function(data) {
        this.collection.each(function(team) {
            if(team.get('side') === 'home') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }
            if(team.get('team_name') === data) {
                team.set({playing: true, position: 1, side: 'home'});
                team.save();
            }  
        },this);
    },
    changeAwayTeam: function(data) {
        this.collection.each(function(team) {
            if(team.get('side') === 'away') {
                team.set({playing: false, position: null, side: null});
                team.save();
            }
            if(team.get('team_name') === data) {
                team.set({playing: true, position: 2, side: 'away'});
                team.save();
            }  
        },this);
    }
});