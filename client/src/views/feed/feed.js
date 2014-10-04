var Marionette = require('backbone.marionette'),
    PlayersCollection = require('../../collections/players');

var FeedItemView = Marionette.ItemView.extend({
    className: 'feeds',
    template: require('../../../templates/feed/feeds.hbs'),
    initialize:function() {
        this.listenTo(this.model, 'change', this.render);
    }
});

module.exports = FeedView = Marionette.CompositeView.extend({
    template: require('../../../templates/feed/feed.hbs'),
    initialize:function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    onRender: function() {
        var feedItems = this.$el.find('#feed-items');
        setTimeout(function() {
            //feedItems.stellar();
        },1000);
        
        setTimeout(function() {
            feedItems.append('<div class="stellar" style="transform: translate3d(0px, 0px, 0px); z-index: -4;"> <div class="left-box" style="background-color: #fff;"><div data-stellar-ratio="0.4" class="base"><h1>Kirk Steal</h1><div style="background-image: url(&quot;http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/kirk_hinrich.png&quot;); width: 100%; background-repeat: no-repeat; height: 185px; position: relative;"></div></div></div></div>');
            feedItems.animate({ scrollTop: 620 }, 800);
        }, 8000);
    },
    itemView: FeedItemView
});
