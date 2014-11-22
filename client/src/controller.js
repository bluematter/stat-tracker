var Marionette = require('backbone.marionette'),
    AppView    = require('./views/appView'),
    SetTeamsView = require('./views/teamsView/setTeams'),
    PlayersSettingsView = require('./views/playersView/playersView'),
    StatsView  = require('./views/statsView/statsView');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function(options) {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.appView  = new AppLayoutView();

        // render appLayoutView
        var view = window.App.views.appView;
        this.renderView(view);
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        window.App.views.appView.stats.show(new StatsView({ collection: window.App.data.teams }));
        window.App.router.navigate('#');
    },

    teams: function() {
        App.core.vent.trigger('app:log', 'Controller: "Teams" route hit.');
        window.App.views.appView.stats.show(new SetTeamsView({ collection: window.App.data.teams }));
        window.App.router.navigate('#teams');
    },

    players: function() {
        App.core.vent.trigger('app:log', 'Controller: "Players" route hit.');
        window.App.views.appView.stats.show(new PlayersSettingsView({ collection: window.App.data.players }));
        window.App.router.navigate('#players');
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
