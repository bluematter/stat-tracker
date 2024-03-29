var models = require('../app/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Team.find({ week: req.params.wid }, function(err, teams) {
            if (err) {
                res.json({error: 'teams not found.'});
            } else {
                res.json(teams);    
            }
        });
    },
    getById: function(req, res) {
        models.Team.find({ _id: req.params.id }, function(err, team) {
            if (err) {
                res.json({error: 'team not found.'});
            } else {
                res.json(team);
            }
        });
    },
    newWeek: function(req, res) {
        var newWeek = new models.Week({ week: parseInt(req.body.week) + 1});
        newWeek.save(function(err, week) {
            if (err) {
                res.json({error: 'Error adding week.'});
            } else {
                // make a copy of players from week 1, should actually do from last week
                models.Team.find({week: parseInt(req.body.week)}, function(err, teams) {
                    if (err) {
                        res.json({error: err});
                    } else {

                        teams.forEach(function(team) {
                            var oldTeamID = team['_id'];
                            var newTeamCopy = {
                                week: parseInt(req.body.week) + 1,
                                team_name: team['team_name'],
                                team_color: team['team_color'],
                                playing: team['playing'],
                                side: team['side'],
                                position: team['position'],
                                fouls: 0,
                                blocks: 0,
                                steals: 0,
                                rebounds: 0,
                                assists: 0,
                                percentage: 0,
                                missed_three: 0,
                                missed_two: 0,
                                missed_one: 0,
                                made_three: 0,
                                made_two: 0,
                                made_one: 0,
                                points: 0
                            }
                            var newTeam = new models.Team(newTeamCopy);

                            newTeam.save(function(err, team) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('New copy of team '+team.id+' saved for week '+team.week+' adding players now...');

                                    // find players before saving teams
                                    models.Player.find({ team_id: oldTeamID }, function(err, players) {
                                        players.forEach(function(player) {
                                            var newPlayerCopy = {
                                                player_name: player['player_name'],
                                                team_id: team.id,
                                                bench: player['bench'],
                                                points: 0,
                                                made_one: 0,
                                                made_two: 0,
                                                made_three: 0,
                                                missed_one: 0,
                                                missed_two: 0,
                                                missed_three: 0,
                                                percentage: 0,
                                                assists: 0,
                                                rebounds: 0,
                                                steals: 0,
                                                blocks: 0,
                                                fouls: 0,
                                                feed: null,
                                                week: parseInt(req.body.week) + 1,
                                                facebook_id: player['facebook_id']
                                            }
                                            var newPlayer = new models.Player(newPlayerCopy);

                                            newPlayer.save(function(err, player) {
                                                if(err) {
                                                    console.log(err);
                                                } else {
                                                    console.log('New Copy of player '+player.id)
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        });

                        // take teams in loop and create new copy of teams
                        res.json({newWeek: parseInt(req.body.week) + 1});
                    }
                });
            }
        });
    },
    add: function(req, res) {
        var newTeam = new models.Team(req.body);
        newTeam.save(function(err, team) {
            if (err) {
                res.json({error: 'Error adding team.'});
            } else {
                res.json(team);
            }
        });
    },
    update: function(req, res) {
        // have to create the object for some reason now req.body not working.
        models.Team.update({ _id: req.params.id }, {
            team_name : req.body.team_name,
            team_color : req.body.team_color,
            playing : req.body.playing,
            side : req.body.side,
            position : req.body.position,
            points : req.body.points,
            rebounds : req.body.rebounds,
            steals : req.body.steals,
            blocks : req.body.blocks,
            fouls : req.body.fouls,
            half : req.body.half,
            firstHalf_timeout: req.body.firstHalf_timeout,
            secondHalf_timeout: req.body.secondHalf_timeout,
            firstHalf_fouls: req.body.firstHalf_fouls,
            secondHalf_fouls: req.body.secondHalf_fouls
        }, function(err, updated) {
            if (err) {
                res.json({error: 'Team not found.'});
            } else {
                res.json(updated);
            }
        });
    },
    delete: function(req, res) {
        models.Team.findOne({ _id: req.params.id }, req.body, function(err, team) {
            if (err) {
                res.json({error: 'Team not found.'});
            } else {
                team.remove(function(err, team){
                    res.status(200).json({status: 'Success'});
                })
            }
        });
    },
    reset: function(req,res) {
        models.Team.find({}, function(err, team) {
            for (i = 0; i < team.length; i++) { 
                models.Team.update({ _id: team[i]._id }, 
                    { 
                        points: 0, 
                        rebounds : 0,
                        steals : 0,
                        blocks : 0,
                        fouls : 0,
                        half: 1,
                        firstHalf_timeout: false,
                        secondHalf_timeout: false,
                        firstHalf_fouls: 0,
                        secondHalf_fouls: 0

                    }, 
                    { multi: true }, 
                    function(err, team) {
                        if (err) {
                            res.json({error: 'Team not found.'});
                        } else {
                            console.log('Successful reset')
                        }
                    }
                );
            }
        });
    }
};
