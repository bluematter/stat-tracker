var Marionette = require('backbone.marionette');

/* Players who are on the bench */
var benchPlayerSettingsView = Marionette.ItemView.extend({
    className: 'player',
    template: require('../../../../../templates/statsView/teamEditor/playerSettings.hbs'),
    events: {
        'click': 'putGame'
    },

    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    },
    putGame:function() {
        this.model.set({bench:false});
        this.model.save();
        App.vent.trigger('subbed');
    },
    templateHelpers:function(){
        return {
            name_format: this.model.get('player_name').replace(/\s+/g, '_').toLowerCase()
        }
    }
});

module.exports = BenchPlayersSettingsView = Marionette.CompositeView.extend({
    template: require('../../../../../templates/statsView/teamEditor/benchPlayersSettings.hbs'),
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    onRender: function() {
        var self = this;
        setTimeout(function() {
            $(self.$el).slimScroll({
                height: $('.editor').height(),
                size: '5px',
                railOpacity: 0.1
            });
        },0);
    },
    itemView: benchPlayerSettingsView
});
/* end players who are on the bench */