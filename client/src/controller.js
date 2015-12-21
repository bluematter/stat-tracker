var Marionette = require('backbone.marionette'),
    AppView    = require('./views/appView'),
    StatsView  = require('./views/statsView/statsView'),
    NextWeekView = require('./views/statsView/nextWeek'),
    TeamsView = require('./views/teamsView/teamsView'),
    PlayersView = require('./views/playersView/playersView');

module.exports = Controller = Marionette.Controller.extend({

    /*
    |--------------------------------------------------------------------------
    | Initialize and render main app layout view
    |--------------------------------------------------------------------------
    */ 

    initialize: function(options) {
        App.core.vent.trigger('app:log', 'Controller: Initializing, rendering appView');
        window.App.views.appView  = new AppLayoutView();

        var view = window.App.views.appView;
        this.renderView(view);
    },

    /*
    |--------------------------------------------------------------------------
    | On home route show statsView
    |--------------------------------------------------------------------------
    */

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit, appView showing StatsView.');
        //window.App.views.appView.stats.show(new StatsView({ collection: window.App.data.teams }));
        window.App.router.navigate('#');
    },

    /*
    |--------------------------------------------------------------------------
    | On week route show statsView by week
    |--------------------------------------------------------------------------
    */

    week: function(wid) {
        App.core.vent.trigger('app:log', 'Controller: "Week" route hit, appView showing StatsView by week '+ wid);
        var week = window.App.data.teams.byWeek(parseInt(wid)).pluck('week');
        if(parseInt(wid) === week[0]) {
            window.App.views.appView.stats.show(new StatsView({ collection: window.App.data.teams.byWeek(parseInt(wid)), week: wid }));
        } else {
            window.App.views.appView.stats.show(new NextWeekView({ wid: wid }));
        }
        window.App.router.navigate('#/week/'+wid);
    },
    
    /*
    |--------------------------------------------------------------------------
    | On teams route show SetTeamsView
    |--------------------------------------------------------------------------
    */

    teams: function() {
        App.core.vent.trigger('app:log', 'Controller: "Teams Settings" route hit, appView showing SetTeamsView.');
        window.App.views.appView.stats.show(new TeamsView({ collection: window.App.data.teams }));
        window.App.router.navigate('#teams');
    },

    /*
    |--------------------------------------------------------------------------
    | On players route show PlayersSettingsView
    |--------------------------------------------------------------------------
    */

    players: function() {
        App.core.vent.trigger('app:log', 'Controller: "Players Settings" route hit, appView showing PlayersSettingsView.');
        window.App.views.appView.stats.show(new PlayersView({ collection: window.App.data.players }));
        window.App.router.navigate('#players');
    },

    /*
    |--------------------------------------------------------------------------
    | On settings route show UserSettingsView
    |--------------------------------------------------------------------------
    */

    settings: function() {
        // TODO: Need to build a me api? So user can change his/her personal settings
        // like user name, image and other stuff this can be put off for later. 
        App.core.vent.trigger('app:log', 'Controller: "User Settings" route hit, appView showing UserSettingsView.');
        window.App.views.appView.stats.show(new UserSettingsView({ collection: window.App.data.players }));
        window.App.router.navigate('#settings');
    },

    renderView: function(view) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#basketball').html(view.render().$el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});
