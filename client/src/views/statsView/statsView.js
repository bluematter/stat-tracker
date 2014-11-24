var Marionette   = require('backbone.marionette'),
    Snap         = require('snapjs'),
    TeamsView    = require('../teams/teams'),
    DataView     = require('../data/teamData'),
    ChartView     = require('../chartView/chartView'),
    TeamsCollection = require('../../collections/teams');

/*
|--------------------------------------------------------------------------
| Layout for the home route that contains the main apps purpose.
| This layout shows the two teams byPlaying().
|--------------------------------------------------------------------------
*/

module.exports = statsView = Marionette.Layout.extend({
    className: 'statsView',
    template: require('../../../templates/statsView.hbs'),

    regions: {
        teams: ".teams-box",
        data: '.app',
        chart: '.chart'
    },
    
    initialize: function() {

        // statsView needs a height for the slimscroll to work.. this is beta could be better
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());

    },
    onRender: function() {
        
        // initialize subviews for statsView
        window.App.views.teamsView = new TeamsView({ collection: this.collection.byPlaying() });
        //window.App.views.dataView  = new DataView({ collection: App.data.players });
        window.App.views.chartView = new ChartView({ collection: this.collection.byPlaying() });
        
        this.teams.show(App.views.teamsView);
        //this.data.show(App.views.dataView);
        this.chart.show(App.views.chartView);

    }
});
