var home   = require('../controllers/home'),
    user   = require('../controllers/users'),
    team   = require('../controllers/teams'),
    player = require('../controllers/players');

module.exports.initialize = function(app, router, passport) {

    
    // sample routing
    router.get('/',       user.index);
    router.get('/login',  user.login);
    router.get('/signup', user.signup);
    router.get('/logout', user.logout);
    
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/failure',
        failureFlash : false
    }));
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
