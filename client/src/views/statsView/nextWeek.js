var Marionette = require('backbone.marionette');

module.exports = NextWeekView = Marionette.ItemView.extend({
    className: 'newWeek',
    template: require('../../../templates/statsView/nextWeek.hbs'),
    events: {
        'click .start-week': 'startWeek'
    },
    startWeek: function() {
        alert('Go to the server and tell it a new week is beginning');
        
        // controller call new week and render new StatsView
        // App.core.vent.trigger('app:log', 'StartWeek: Starting new week '+ wid);
        // window.App.views.appView.stats.show(new StatsView({ collection: window.App.data.teams, week: wid }));
        // window.App.router.navigate('#/week/'+wid);
        $.post('/api/newWeek', { wid: this.options.wid}, function(data) {
            console.log(data);
        });

    }
});
