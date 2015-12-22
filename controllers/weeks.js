var models = require('../app/models'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        models.Week.find({}, function(err, weeks) {
            if (err) {
                res.json({error: 'weeks not found.'});
            } else {
                res.json(weeks);    
            }
        });
    }
};