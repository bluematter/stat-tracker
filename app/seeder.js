var mongoose = require('mongoose'),
    models = require('./models'),
    md5 = require('MD5');

module.exports = {
    check: function() {
        models.Team.find({}, function(err, teams) {
            if (teams.length === 0) {
                console.log('no teams found, seeding...');
                var newTeam = new models.Team({
                    team_name:   'Bulls',
                    players: [
                        {
                            player_name:  'Taj Gibson',
                            points:       22,
                            made_one:     3,
                            made_two:     4,
                            made_three:   5,
                            missed_one:   2,
                            missed_two:   3,
                            missed_three: 4,
                            percentage:   5,
                            assists:      2,
                            rebounds:     2,
                            steals:       2,
                            blocks:       5,
                            fouls:        3,  
                            feed:         null,
                            facebook_id:  null
                        },
                        {
                            player_name:  'Kirk Hinrich',
                            points:       22,
                            made_one:     3,
                            made_two:     4,
                            made_three:   5,
                            missed_one:   2,
                            missed_two:   3,
                            missed_three: 4,
                            percentage:   5,
                            assists:      2,
                            rebounds:     2,
                            steals:       2,
                            blocks:       5,
                            fouls:        3,  
                            feed:         null,
                            facebook_id:  null
                        }
                    ],
                    points:       44,
                    made_one:     10,
                    made_two:     15,
                    made_three:   5,
                    missed_one:   4,
                    missed_two:   20,
                    missed_three: 4,
                    percentage:   50,
                    assists:      80,
                    rebounds:     100,
                    steals:       33,
                    blocks:       14,
                    fouls:        20,  
                    feed:        null
                });
                newTeam.save(function(err, team) {
                    console.log('successfully inserted team: ' + team._id);
                });

                var newTeam = new models.Team({
                    team_name:   'Wizards',
                    players: [
                        {
                            player_name:  'John Wall',
                            points:       22,
                            made_one:     3,
                            made_two:     4,
                            made_three:   5,
                            missed_one:   2,
                            missed_two:   3,
                            missed_three: 4,
                            percentage:   5,
                            assists:      2,
                            rebounds:     2,
                            steals:       2,
                            blocks:       5,
                            fouls:        3,  
                            feed:         null,
                            facebook_id:  null
                        },
                        {
                            player_name:  'Bradley Beal',
                            points:       22,
                            made_one:     3,
                            made_two:     4,
                            made_three:   5,
                            missed_one:   2,
                            missed_two:   3,
                            missed_three: 4,
                            percentage:   5,
                            assists:      2,
                            rebounds:     2,
                            steals:       2,
                            blocks:       5,
                            fouls:        3,  
                            feed:         null,
                            facebook_id:  null
                        }
                    ],
                    points:       44,
                    made_one:     10,
                    made_two:     15,
                    made_three:   5,
                    missed_one:   4,
                    missed_two:   20,
                    missed_three: 4,
                    percentage:   50,
                    assists:      80,
                    rebounds:     100,
                    steals:       33,
                    blocks:       14,
                    fouls:        20,  
                    feed:        null
                });
                newTeam.save(function(err, team) {
                    console.log('successfully inserted team: ' + team._id);
                });
            } else {
                console.log('found ' + teams.length + ' existing teams!');
            }
        });
    }
};
