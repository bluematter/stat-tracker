var models = require('../app/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Player.find({}, function(err, player) {
            if (err) {
                res.json({error: 'players not found.'});
            } else {
                res.json(player);    
            }
        });
    },
    getById: function(req, res) {
        models.Player.find({ _id: req.params.tid }, { players: { $elemMatch: { _id: req.params.pid } } }, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                res.json(player);
            }
        })
    },
    getByTeamId: function(req, res) {
        models.Player.find({ team_id: req.params.tid }, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                res.json(player);
            }
        })
    },
    add: function(req, res) {
        var newPlayer = new models.Player(req.body);
        newPlayer.save(function(err, player) {
            if (err)
                res.json({});
            console.log('successfully inserted new player: ' + player._id);
            res.json(player);
        });
    },
    update: function(req, res) {
        models.Player.update({ _id: req.params.pid }, req.body, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                res.json(player);
            }
        });
    },
    delete: function(req, res) {
        models.Player.findOne({ _id: req.params.pid }, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                player.remove(function(err, player){
                    res.json(200, {status: 'Success'});
                });
            }
        });
    }
};
