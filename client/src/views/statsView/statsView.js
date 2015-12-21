var Marionette   = require('backbone.marionette'),
    Snap         = require('snapjs'),
    TeamsView    = require('./teams'),
    ChartView     = require('../chartView/chartView'),
    TeamsCollection = require('../../collections/teams');

/*
|--------------------------------------------------------------------------
| Layout for the home route that contains the main purpose for the app.
| This layout shows the two teams byPlaying().
|--------------------------------------------------------------------------
*/

module.exports = statsView = Marionette.Layout.extend({
    className: 'statsView',
    template: require('../../../templates/statsView/statsView.hbs'),

    regions: {
        teams: ".teams-box",
        data: '.app',
        chart: '.chart'
    },
    
    initialize: function() {
        
        var $statsView = this.$el;
        
        // statsView needs a height for the slimscroll to work.. this is beta could be better?
        $statsView.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
        $(window).resize(function() {
            $statsView.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
        });

        // initialize subviews for statsView
        window.App.views.teamsView = new TeamsView({ collection: this.collection.byPlaying() });
        window.App.views.chartView = new ChartView({ collection: this.collection.byPlaying() });

    },
    onRender: function() {
        
        // render the sub views in the regions
        this.teams.show(App.views.teamsView);
        this.chart.show(App.views.chartView);

    }
});
