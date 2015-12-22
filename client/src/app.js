var Marionette        = require('backbone.marionette'),
    DualStorage       = require('backbone.dualStorage'),
    Handlebars        = require('hbsfy/runtime'),
    Bootsrap          = require('bootstrap'),
    slimscroll        = require('slimscroll'),
    unslider          = require('unslider'),
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
Handlebars.registerHelper('is', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

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

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data  = {};
        App.state = {};
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

        // ajax get weeks, then start app
        $.get('/api/week', function(weeks) {
            
            function weekStuff() {

                // set localstorage state
                if (localStorage['week']) {
                    App.state.week = localStorage.getItem('week');
                } else {
                    App.state.week = 1;
                }

                // set cookie state for server
                if(document.cookie.indexOf('week') > -1) {
                    document.cookie = 'week='+App.state.week+';path=/';
                } else {
                    document.cookie = 'week=1;path=/';
                }

                weeks.forEach(function(week) {
                    var classState = (parseInt(week.week) == parseInt(App.state.week)) ? "active":"";
                    $('.choose-week ul').append('<li class="'+classState+'" data-week="'+week.week+'"><span class="circle-week"></span><span class="week-text">week '+week.week+'</span></li>');
                });

                // custom weekly navigator
                $('.choose-week li').on('click', function() {
                    var week = $(this).data('week');
                    localStorage.setItem('week', week);
                    document.cookie = 'week='+week+';path=/';
                    window.location.href = '/week/'+week;
                });

                // create new week
                $('.choose-week .add-week').on('click', function() {
                    var lastWeekObj = _.max(weeks, function (obj) {
                      return obj.week;
                    });
                    var lastWeekIndex = weeks.indexOf(lastWeekObj);
                    $.post('/api/newWeek', { week: parseInt(lastWeekIndex + 1)}, function(data) {
                        localStorage.setItem('week', data.newWeek);
                        window.location.href = '/week/'+data.newWeek;
                    });
                });
            };

            weekStuff();

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
