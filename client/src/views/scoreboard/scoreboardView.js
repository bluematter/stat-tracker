var Marionette = require('backbone.marionette'),
    TeamsCollection = require('../../collections/teams');

var ScoresView = Backbone.Marionette.ItemView.extend({
    className: 'score-data-circle',
    template: require('../../../templates/scoreboard/scores.hbs'),
    events: {
        'focusout .editable': 'saveEdit'
    },
    initialize: function(){
        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);
    },
    onRender: function(){
    },
    saveEdit: function(e) {

        //get the editable element
        var editElem = $(e.currentTarget);

        //get the edited element content
        var userVersion = editElem.html();

        //save the edited model
        this.model.set('points', userVersion);
        this.model.save();

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
            },
            onstop  : function() {
            },
            onend   : function() {
            }
        });

    },
    startClock: function() {
        myTimer.start(1200);
    }
});



