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
        models.Team.update({ _id: req.params.id }, req.body, function(err, updated) {
            if (err) {
                res.json({error: 'Team not found.'});
            } else {
                res.json(updated);
            }
        });
    },
    delete: function(req, res) {
        models.Team.findOne({ _id: req.params.id }, function(err, team) {
            if (err) {
                res.json({error: 'Team not found.'});
            } else {
                player.remove(function(err, player){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }
};
