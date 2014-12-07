var Marionette        = require('backbone.marionette'),
    DualStorage       = require('backbone.dualStorage'),
    Handlebars        = require('hbsfy/runtime'),
    Bootsrap          = require('bootstrap'),
    slimscroll        = require('slimscroll'),
    chartjs           = require('chartjs'), 
    colourBrightness  = require('colourBrightness'),
    timerjs           = require('timerjs'), 
    Controller        = require('./controller'),
    Router            = require('./router'),
    PlayerModel       = require('./models/player'),
    PlayersCollection = require('./collections/players'),
    TeamModel         = require('./models/team'),
    TeamsCollection   = require('./collections/teams');

// Handlebars helpers
Handlebars.registerHelper('shorten', function(str) {
    if (str.length > 8)
      return str.substring(0,8) + '...';
    return str;
}); 

Handlebars.registerHelper('foulCount', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}); 

Handlebars.registerHelper('remainingfouls', function(n, block) {
    var accum = '';
    var remainingFouls = 5 - n;
    for(var i = 0; i < remainingFouls; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data  = {};
        App.vent  = new Backbone.Wreqr.EventAggregator();
        App.fb    = {};
        
        // work with the facebook graph api
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '446186442184074',
                xfbml      : true,
                version    : 'v2.1'
            });
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    $(document).trigger('fbStatusChange', response);
                }
            });
        };
        
        // grab our applications data the order is important
        var teams = new TeamsCollection();
        teams.syncDirtyAndDestroyed(); // sync data tracked offline to live DB
        teams.fetch({
            reset: true,
            success: function(team) {
                App.data.teams = teams;

                var players = new PlayersCollection();
                players.syncDirtyAndDestroyed(); // sync data tracked offline to live DB
                players.fetch({
                    success: function(player) {
                        App.data.players = players;
                        App.core.vent.trigger('app:start');
                    }
                });

            }
        });
        
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }
 
        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};
