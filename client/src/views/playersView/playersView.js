var Marionette = require('backbone.marionette');

var listPlayersView = Marionette.ItemView.extend({
    className: 'players-wrap row',
    template: require('../../../templates/playersView/playerView.hbs'),
    events: {
        'focusout .editable': 'saveEdit',
        'click .delete': 'deletePlayer'
    },
    onRender: function() {
    },
    saveEdit: function(e) {

        console.log(e.currentTarget)

        //get the editable element
        var editElem = $(e.currentTarget);

        //get the edited element content
        var userVersion = editElem.html();

        //save the edited model
        this.model.set(e.currentTarget.dataset.change, userVersion);
        this.model.save();

    },
    deletePlayer: function() {
        this.model.destroy();
    }
});

var ListPlayersView = Marionette.CollectionView.extend({
    itemView:listPlayersView
});

module.exports = PlayersSettingsView = Marionette.Layout.extend({
    className: 'team row',
    template: require('../../../templates/playersView/playersView.hbs'),
    events: {
        'click .the-name': 'editName'
    },
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

        this.setScroll();
    },
    setScroll: function() {
        var self = this;
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $(self.$el).height(), // 60 for margins
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    }
});