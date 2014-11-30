var models = require('../app/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Team.find({}, function(err, data) {
            res.json(data);
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
        // have to create the object prehand for some reason now.
        var team = {
            team_name : req.body.team_name,
            team_color : req.body.team_color,
            playing : req.body.playing,
            side : req.body.side,
            position : req.body.position,
            points : req.body.points,
            rebounds : req.body.rebounds,
            steals : req.body.steals,
            blocks : req.body.blocks,
            fouls : req.body.fouls
        }
        models.Team.update({ _id: req.params.id }, team, function(err, updated) {
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
    }
};
