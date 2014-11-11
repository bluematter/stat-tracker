var Marionette = require('backbone.marionette'),
    MenuView = require('./menu/menu'),
    StatsView = require('./statsView/statsView');

module.exports = AppLayoutView = Backbone.Marionette.Layout.extend({
	template: require('../../templates/appView.hbs'),

	regions: {
		menu: ".menu",
		stats: ".content"
	},

	onRender: function() {
		// possibly add a headerView here?

	    // render the app's menu	
        var menuView = new MenuView();
        this.menu.show(menuView);

        // render the app's content	
        var statsiew = new StatsView({ collection: window.App.data.teams });
        this.stats.show(statsiew);
    }
});