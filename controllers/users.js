var User = require('../app/passport/User'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        if (req.user) {

            User.findOne({ _id: req.user.id }, function (err, user) {

                user.save(function(err) {
                    if(err)
                        console.log('error');
                    else 
                        res.render('app', { user: req.user }); 
                });

            });

        }
        else
            res.render('login'); 
    },
    login: function(req, res) {
        res.render('login');
    },
    signup: function(req, res) {
        res.render('signup');
    },
    logout: function(req, res) {
        if (req.user) {
            
            User.findOne({ _id: req.user.id }, function (err, user) {
                user.connected = false;
                user.save(function(err) {
                    if (err)
                        console.log('error')
                    else
                        console.log('success')
                        req.logout();
                        res.redirect('/');
                });
            });
            
        }
    },
    me: function(req, res) {
        if(req.user) {

            var gravatar, admin, chat_id;

            if(req.user.facebook_email) {
                gravatar = null;
            } else {
                gravatar = md5(req.user.email)
            } 

            if(req.user.admin === true) {
                admin = true;
            }

            var user = {
                admin          : admin,
                chat_id        : "2",
                user_id        : req.user.id,
                name           : req.user.name,
                email          : req.user.email,
                facebook_name  : req.user.facebook_name,
                facebook_email : req.user.facebook_email,
                facebook_id    : req.user.facebook_id,
                gravatar       : gravatar  
            }

            res.json(user);

        } else {
            res.redirect('/login');
        }
    }
};
