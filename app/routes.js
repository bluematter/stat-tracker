var home   = require('../controllers/home'),
    user   = require('../controllers/users'),
    team   = require('../controllers/teams'),
    player = require('../controllers/players');

module.exports.initialize = function(app, router, passport) {

    
    // routing
    router.get('/week/:wid', user.index);
    router.get('/login',  user.login);
    router.get('/signup', user.signup);
    router.get('/logout', user.logout);
    
    app.post('/login', 
        passport.authenticate('local-login', { 
            successRedirect: '/',
            failureRedirect: '/login', 
            failureFlash: true 
    }));

    router.post('/signup', passport.authenticate('local-signup', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : false 
    }));

    // facebook auth
    app.get('/auth/facebook', passport.authenticate('facebook', 
        { scope : ['user_groups', 'publish_actions', 'read_stream', 'email', 'user_friends', 'user_about_me'] }
    ));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        })
    );

    // api for teams
    router.get('/', home.index);
    router.get('/api/week/:wid/teams', team.index);
    router.get('/api/week/:wid/teams/:id', team.getById);
    router.post('/api/week/:wid/teams', team.add);
    router.put('/api/week/:wid/teams/:id', team.update);
    router.delete('/api/week/:wid/teams/:id', team.delete);
    
    // start new week route
    router.post('/api/newWeek', team.newWeek);
    
    // api for players
    router.get('/api/week/:wid/players', player.index);
    router.get('/api/week/:wid/players/:tid', player.getByTeamId);
    router.get('/api/week/:wid/players/:tid/:pid', player.getById);
    router.post('/api/week/:wid/players', player.add);
    router.put('/api/week/:wid/players/:pid', player.update);
    router.delete('/api/week/:wid/players/:pid', player.delete);



    // route middleware
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    app.use('/', router);


};
