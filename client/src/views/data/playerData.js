var Marionette = require('backbone.marionette');

module.exports = playerData = Marionette.ItemView.extend({
    className: 'player-data',
    template: require('../../../templates/data/playerData.hbs'),
    events: {
        'mouseenter .player-image': 'imageHover',
        'mouseleave .player-image': 'imageLeave'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.$el.attr('data-player', this.model.get('player_name').replace(/\s+/g,"_").toLowerCase());
    },
    imageHover: function() {
        this.$el.find('.player-image').addClass('image-hover');
    },
    imageLeave: function() {
        this.$el.find('.player-image').removeClass('image-hover');
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});
