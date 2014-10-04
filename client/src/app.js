var Marionette        = require('backbone.marionette'),
    DualStorage       = require('backbone.dualStorage'),
    Bootsrap          = require('bootstrap'),
    Controller        = require('./controller'),
    Router            = require('./router'),
    PlayerModel       = require('./models/player'),
    PlayersCollection = require('./collections/players'),
    TeamModel         = require('./models/team'),
    TeamsCollection   = require('./collections/teams');

// playing with the espn data    
var NBACollection     = require('./collections/espn/nbaPlayers');   

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data  = {};
        App.vent  = {}
        App.fb    = {};

        App.vent = _.extend({}, Backbone.Events);
        
        // work with the facebook graph api
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '446186442184074',
                xfbml      : true,
                version    : 'v2.0'
            });
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    $(document).trigger('fbStatusChange', response);
                }
            });
        };
        
        // grab our applications data the order is important
        var teams = new TeamsCollection();
        teams.fetch({
            reset: true,
            success: function(team) {
                App.data.teams = teams;
                App.core.vent.trigger('app:start');
            }
        });
        
        // playing with the espn api
        var nba = new NBACollection();
        nba.fetch({
            reset: true,
            success: function(team) {
                App.data.nba = nba;
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
