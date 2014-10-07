var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Team = new Schema({
    team_name:   { type: String },
    playing: { type: Boolean },
    players: [
        {
            player_name:  { type: String },
            points:       { type: Number },
            made_one:     { type: Number },
            made_two:     { type: Number },
            made_three:   { type: Number },
            missed_one:   { type: Number },
            missed_two:   { type: Number },
            missed_three: { type: Number },
            percentage:   { type: Number },
            assists:      { type: Number },
            rebounds:     { type: Number },
            steals:       { type: Number },
            blocks:       { type: Number },
            fouls:        { type: Number },  
            feed:         { type: String },
            facebook_id:  { type: Number }
        }
    ],
    points:       { type: Number },
    made_one:     { type: Number },
    made_two:     { type: Number },
    made_three:   { type: Number },
    missed_one:   { type: Number },
    missed_two:   { type: Number },
    missed_three: { type: Number },
    percentage:   { type: Number },
    assists:      { type: Number },
    rebounds:     { type: Number },
    steals:       { type: Number },
    blocks:       { type: Number },
    fouls:        { type: Number },  
    feed: { type: String }
});

module.exports = {
    Team : mongoose.model('Team', Team)
};
