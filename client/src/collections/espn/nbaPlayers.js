var Backbone = require('backbone'),
    NbaPlayerModel = require('../../models/espn/nbaPlayer');

module.exports = TeamsCollection = Backbone.Collection.extend({
    model:  NbaPlayerModel,
    url: 'http://api.espn.com/v1//sports/basketball/nba/athletes/110?apikey=ujmhwr39agp2ze46f3tvea64' //kobe
    //url: 'http://api.espn.com/v1/sports/basketball/nba/athletes/110/news?apikey=ujmhwr39agp2ze46f3tvea64' // kobe news
});
