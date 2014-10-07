var home   = require('../controllers/home'),
    user   = require('../controllers/users'),
    team   = require('../controllers/teams'),
    player = require('../controllers/players'),
    RememberMeStrategy = require('passport-remember-me').Strategy,
    utils  = require('utils');

module.exports.initialize = function(app, router, passport) {

    
    // sample routing
    router.get('/',       user.index);
    router.get('/login',  user.login);
    router.get('/signup', user.signup);
    router.get('/logout', user.logout);
    
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/',
    //     failureRedirect : '/failure',
    //     failureFlash : false
    // }));

    /*
    |--------------------------------------------------------------------------
    | Remember me
    |--------------------------------------------------------------------------
    |
    |
    */

    /* Fake, in-memory database of remember me tokens */

    var tokens = {}

    function consumeRememberMeToken(token, fn) {
      var uid = tokens[token];
      // invalidate the single-use token
      delete tokens[token];
      return fn(null, uid);
    }

    function saveRememberMeToken(token, uid, fn) {
      tokens[token] = uid;
      return fn();
    }

    passport.use(new RememberMeStrategy(

        function(token, done) {
            consumeRememberMeToken(token, function(err, uid) {
                if (err) { return done(err); }
                if (!uid) { return done(null, false); }

                User.findById(id, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user);
                });

            });
        },

        issueToken

    ));

    function issueToken(user, done) {
        var token = utils.randomString(64);
        saveRememberMeToken(token, user.id, function(err) {
            if (err) { return done(err); }
            return done(null, token);
        });
    }
    
    app.post('/login', 
        passport.authenticate('local-login', { failureRedirect: '/login', failureFlash: true }),
        
        function(req, res, next) {
            // Issue a remember me cookie if the option was checked
            if (!req.body.remember_me) { 
                res.clearCookie('RMME');
                return next(); 
            }

            issueToken(req.user, function(err, token) {
                if (err) { return next(err); }
                res.cookie('RMME', req.user.local.email, { maxAge: 900000, httpOnly: true });
                res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
                return next();
            });
        },

        function(req, res) {
            res.redirect('/');
        }

    );

    router.post('/signup', passport.authenticate('local-signup', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : false 
    }));

    // facebook auth
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'user_friends', 'user_about_me'] }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        })
    );


    router.get('/', home.index);
    router.get('/api/teams', team.index);
    router.get('/api/teams/:id', team.getById);
    router.post('/api/teams', team.add);
    router.put('/api/teams/:id', team.update);
    router.delete('/api/teams/:id', team.delete);



    router.get('/api/teams/:tid/players', player.index);
    router.get('/api/teams/:tid/players/:pid', player.getById);
    router.post('/api/teams/:tid/players', player.add);
    router.put('/api/teams/:tid/players/:pid', player.update);



    // route middleware
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    app.use('/', router);


};
