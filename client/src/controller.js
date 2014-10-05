var Marionette = require('backbone.marionette'),
    HomeView   = require('./views/home'),
    StatsView    = require('./views/statsView');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function(options) {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.homeView = new HomeView();
        window.App.views.statsView  = new StatsView({ collection: window.App.data.teams });
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.homeView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    stats: function() {
        App.core.vent.trigger('app:log', 'Controller: "Stats" route hit.');
        var view = window.App.views.statsView;
        this.renderView(view);
        window.App.router.navigate('#stats');
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
