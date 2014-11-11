var Marionette = require('backbone.marionette'),
    AppView    = require('./views/appView'),
    StatsView  = require('./views/statsView');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function(options) {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        //window.App.views.statsView  = new StatsView({ collection: window.App.data.teams });
        window.App.views.appView  = new AppLayoutView();
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.appView;
        this.renderView(view);
        window.App.router.navigate('#');
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
