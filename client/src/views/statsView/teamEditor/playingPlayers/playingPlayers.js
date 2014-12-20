var Marionette = require('backbone.marionette');

/* Players who are playing */
var playingPlayerView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../../../templates/statsView/teamEditor/playerSettings.hbs'),
    events: {
        'click': 'putBench'
    },

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    },
    putBench:function() {
        this.model.set({bench:true});
        this.model.save();
        App.vent.trigger('subbed');
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});

module.exports = PlayingPlayersView = Marionette.CollectionView.extend({
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, "reset", this.render, this);
    },
    onRender: function() {
        this.setScroll(); 
    },
    setScroll: function() {
        var self = this;
        this.$el.height($('.editor').height() - 48 - $('.roster-side').height());
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.editor').height() - 48 - $('.roster-side').height(),
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    },
    itemView: playingPlayerView
});
/* end players who are playing */