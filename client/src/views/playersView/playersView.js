var Marionette = require('backbone.marionette');

var listPlayersView = Marionette.ItemView.extend({
    className: 'col-md-6',
    template: require('../../../templates/playersView/playerView.hbs')
});

var ListPlayersView = Marionette.CollectionView.extend({
    itemView:listPlayersView
});

module.exports = PlayersSettingsView = Marionette.Layout.extend({
    className: 'row',
    template: require('../../../templates/playersView/playersView.hbs'),
    initialize:function() {
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
    },
    regions: {
        players: ".the-players"
    },
    onRender: function() {

        // show another view, add a new team??

        // show all the teams, thier data, and modification buttons
        var listPlayersView = new ListPlayersView({ 
            collection: this.collection
        });
        this.players.show(listPlayersView);

        // show another view, possibly the teams that are playing etc...
    }
});