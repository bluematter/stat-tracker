var Marionette   = require('backbone.marionette'),
    Snap         = require('snapjs'),
    TeamsView    = require('../teams/teams'),
    DataView     = require('../data/teamData'),
    ChartView     = require('../chartView/chartView'),
    TeamsCollection = require('../../collections/teams');

// Turn this into a Layout!!!!!
module.exports = statsView = Marionette.Layout.extend({
    className: 'statsView',
    template: require('../../../templates/statsView.hbs'),

    regions: {
        teams: ".teams-box",
        data: '.app',
        chart: '.chart'
    },
    
    initialize: function() {

        // temp height
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

        // append the view's to the DOM (turn into LayoutView??)
        // this.$el.find('.app .teams-box').prepend(App.views.teamsView.render().el); // teams/players view
        // this.$el.find('.app').prepend(App.views.dataView.render().el); // data view
        // this.$el.find('.app .chart').prepend(App.views.chartView.render().el); // chart view
        
    }
});
