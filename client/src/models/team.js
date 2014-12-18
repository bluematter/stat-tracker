var Backbone          = require('backbone');
var PlayersCollection = require('../collections/players');

module.exports = TeamModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        team_name: '',
        team_color:   '#777',         
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
        half:         1,
        firstHalf_timeout: false,
        secondHalf_timeout: false,
        firstHalf_fouls: 0,
        secondHalf_fouls: 0
    }
});

