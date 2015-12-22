var mongoose = require('mongoose'),
    models = require('./models'),
    md5 = require('MD5');

module.exports = {
    testWeek: function() {

    },
    check: function() {
        models.Week.find({}, function(err, weeks) {
            if(weeks.length === 0) {
                console.log('no weeks found, fresh app, seeding...');
                var newWeek = new models.Week({
                    week: 1
                });
                newWeek.save(function(err, week) {
                    models.Team.find({}, function(err, teams) {
                        if(teams.length === 0) {
                            console.log('no teams found, seeding...');
                            var newTeam = new models.Team({
                                team_name:   'Bulls',
                                team_color:  '#D20E18',
                                playing:      true,
                                side:         'home',
                                position:     1,
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
                                week:         1,
                                feed:        null
                            });
                            newTeam.save(function(err, team) {
                                console.log('successfully inserted team: ' + team._id);
                                var newPlayer = new models.Player({
                                    player_name:  'Taj Gibson',
                                    team_id:      team._id,
                                    bench:        false,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Kirk Hinrich',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       0,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Derrick Rose',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       0,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                            });

                            var newTeam = new models.Team({
                                team_name:   'Wizards',
                                team_color:  '#042859',
                                playing:      true,
                                side:         'away',
                                position:     2,
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
                                week:         1,
                                feed:        null
                            });
                            newTeam.save(function(err, team) {
                                console.log('successfully inserted team: ' + team._id);
                                var newPlayer = new models.Player({
                                    player_name:  'John Wall',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       18,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Bradley Beal',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       1,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Andre Miller',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       1,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });

                                var newTeam = new models.Team({
                                team_name:   'Cavs',
                                team_color:  '#F2BC48',
                                playing:      false,
                                side:         null,
                                position:     null,
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
                                week:         1,
                                feed:        null
                            });
                            newTeam.save(function(err, team) {
                                console.log('successfully inserted team: ' + team._id);
                                var newPlayer = new models.Player({
                                    player_name:  'LeBron James',
                                    team_id:      team._id,
                                    bench:        false,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Kevin Love',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       0,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                                var newPlayer = new models.Player({
                                    player_name:  'Kyrie Irving',
                                    team_id:      team._id,
                                    bench:        false,
                                    points:       0,
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
                                    week:         1,
                                    facebook_id:  null
                                });
                                newPlayer.save(function(err, player) {
                                    console.log('successfully inserted a player: ' + player._id);
                                });
                            });
                            });
                        } else {
                            console.log('found ' + teams.length + ' existing teams!');
                        }
                    });
                });
            }
        });
    }
};
