var Backbone = require('backbone'),
    PlayerModel = require('../models/player');

module.exports = PlayersCollection = Backbone.Collection.extend({
    model:  PlayerModel,
    url: '/api/players'
});
