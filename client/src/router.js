var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''      : 'home',
        'week/:week' : 'week',
        'teams' : 'teams',
        'players' : 'players',
        'settings' : 'settings'
    }
});
