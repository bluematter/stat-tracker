var Marionette = require('backbone.marionette');

module.exports = leaderView = Marionette.ItemView.extend({
	className: 'leader',
    template: require('../../../templates/leaders/leader.hbs'), 
    initialize: function() {
    	this.listenTo(this.model, 'change', this.render);
    }
});
