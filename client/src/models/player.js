var Backbone     = require('backbone');
//var NestedModel  = require('backbone.nested');
//var Relational = require('backbone.relational');

module.exports = PlayerModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        player_name: '',
        points:       0, 
        made_one:     0, 
        made_two:     0, 
        made_three:   0, 
        missed_one:   0, 
        missed_two:   0, 
        missed_three: 0,
        percentage:   0,
        assists:      0, 
        rebounds:     0, 
        steals:       0, 
        blocks:       0, 
        fouls:        0, 
        feed: '',
        facebookID: '' 
    }
});
