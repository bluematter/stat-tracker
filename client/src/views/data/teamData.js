var Marionette = require('backbone.marionette'),
    playerData = require('./playerData');

var teamDataView = Marionette.CompositeView.extend({
    className: 'team-data',
    template: require('../../../templates/data/teamData.hbs'),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.collection = this.model.players;
    },
    itemView: playerData
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'data-wrap',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: teamDataView
});
