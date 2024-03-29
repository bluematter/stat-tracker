var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Team = new Schema({
    team_name:    { type: String },
    team_color:   { type: String },
    playing:      { type: Boolean },
    side:         { type: String },
    position:     { type: Number },
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
    half:         { type: Number },
    firstHalf_timeout: { type: Boolean },
    secondHalf_timeout: { type: Boolean },
    firstHalf_fouls: { type: Number },
    secondHalf_fouls: { type: Number },
    week:         { type: Number }
});

var Player = new Schema({
    player_name:  { type: String },
    player_picture: { type: String },
    team_id:      { type: String },
    bench:        { type: Boolean },
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
    facebook_id:  { type: Number },
    week:         { type: Number }
});

var Week = new Schema({
    week: { type: String }
});

module.exports = {
    Team   : mongoose.model('Team', Team),
    Player : mongoose.model('Player', Player),
    Week   : mongoose.model('Week', Week)
};
