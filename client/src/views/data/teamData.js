var Marionette = require('backbone.marionette'),
    playerData = require('./playerData'),
    PlayersCollection = require('../../collections/players');

// var teamDataView = Marionette.CompositeView.extend({
//     className: 'team-data',
//     template: require('../../../templates/data/teamData.hbs'),
//     initialize: function() {
//         this.listenTo(this.model, 'change', this.render);
//         this.collection = new PlayersCollection(App.data.players.where({team_id: this.model.id}));
//     },
//     itemView: playerData
// });

module.exports = CollectionView = Marionette.CollectionView.extend({
    className: 'data-wrap',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: playerData
});
