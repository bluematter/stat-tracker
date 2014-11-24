var Marionette = require('backbone.marionette'),
    TeamsCollection = require('../../collections/teams');

var ScoresView = Backbone.Marionette.ItemView.extend({
    className: 'score-data-circle',
    template: require('../../../templates/scoreboard/scores.hbs'),
    initialize: function(){
        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);
    },
    onRender: function(){
    }
});

var ScoreboardScoreView = Backbone.Marionette.CollectionView.extend({
    className: 'scores',
    initialize: function(){
        this.listenTo(this.collection, 'change', this.render);
    },
    onRender: function(){
    },
    itemView: ScoresView
});

// USE LAYOUT VIEW??
module.exports = ScoreboardView = Backbone.Marionette.Layout.extend({
    template: require('../../../templates/scoreboard/scoreboard.hbs'),
    events: {
        'click .scoreboard-time': 'startClock'
    },
    regions: {
        scores: '.scores'
    },
    initialize: function(){
        this.listenTo(App.data.teams, 'change', this.render);

        var self = this;
        
        // as of now the only way we can update playingTeam collection??
        App.vent.on('home-team-change', function(data){ self.render() });
        App.vent.on('away-team-change', function(data){ self.render() });

    },
    onRender: function(){

        var scoreboardScoreView = new ScoreboardScoreView({collection: App.data.teams.byPlaying() });
        this.scores.show(scoreboardScoreView);
        
        $timer = this.$el.find('.timer');

        window.myTimer = new Timer({
            onstart : function(sec) {
                var minutes = Math.floor(sec / 60);
                var seconds = sec - minutes * 60;
                $timer.text(minutes +':'+ seconds);
            },
            ontick  : function(sec) {
                var minutes = Math.floor(sec / 60);
                var seconds = sec - minutes * 60;
                $timer.text(minutes +':'+ seconds);
            },
            onpause : function() {
                //$timer.text('pause');
            },
            onstop  : function() {
                //$timer.text('stop');
            },
            onend   : function() {
                //$timer.text('end');
            }
        });

    },
    startClock: function() {
        myTimer.start(1200);
    }
});



