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
        // have to create the object prehand for some reason now.
        var player = {
            player_name : req.body.player_name,
            player_picture : req.body.player_picture,
            bench : req.body.bench,
            points : req.body.points,
            rebounds : req.body.rebounds,
            steals : req.body.steals,
            blocks : req.body.blocks,
            fouls : req.body.fouls,
            team_id : req.body.team_id,
        }
        models.Player.update({ _id: req.params.pid }, player, function(err, player) {
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
                    res.status(200).json({status: 'Success'});
                });
            }
        });
    }
};
