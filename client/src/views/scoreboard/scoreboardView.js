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

        var scoreboardScoreView = new ScoreboardScoreView({collection: this.playingTeam()});
        this.scores.show(scoreboardScoreView);

    },
    playingTeam: function (value) {
        // get playing team from backbone.collection.extend filter??

        // determine who is playing by looking for the team models
        // that have "playing" set to true
        var models = App.data.teams.where({playing: true});
        return new TeamsCollection(models);

    },
});