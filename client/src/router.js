var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''      : 'home',
        'teams' : 'teams'
    }
});
