var models = require('../app/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        console.log(req)
        models.Team.find({ _id: req.params.tid }, { players: [] }, function(err, players) {
            if (err) {
                res.json({error: 'players not found.'});
            } else {
                res.json(players[0].players);    
            }
        });
    },
    getById: function(req, res) {
        models.Team.find({ _id: req.params.tid }, { players: { $elemMatch: { _id: req.params.pid } } }, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                res.json(player[0].players);
            }
        })
    },
    add: function(req, res) {
        console.log(req.params.tid);
        models.Team.findByIdAndUpdate(
            req.params.tid,
            { $addToSet: { players: req.body } },
            function(err, newPlayer){
                if (err) {
                    res.json({error: 'Error.'});
                } else {
                    res.json(newPlayer);
                }
            }
        );
    },
    update: function(req, res) {
        models.Team.update({ _id: req.params.tid }, { players: { $elemMatch: { _id: req.params.pid } } }, function(err, player) {
            if (err) {
                res.json({error: 'Player not found.'});
            } else {
                res.json(player[0].players);
            }
        })
    } 
};
