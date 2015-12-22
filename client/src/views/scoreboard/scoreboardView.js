var Marionette = require('backbone.marionette');

var ScoresView = Backbone.Marionette.ItemView.extend({
    className: 'score-data-circle',
    template: require('../../../templates/scoreboard/scores.hbs'),
    events: {
        'click .timeout-circle': 'teamTimeout',
        'focusout .editable': 'saveEdit'
    },
    initialize: function(){
        // anytime something within this specific team changes, render
        this.listenTo(this.model, 'change', this.render);
    },
    teamTimeout: function() {
        
        if(this.model.get('half') === 1) {
            this.model.set('firstHalf_timeout', true);
            this.model.save();
        } else {
            this.model.set('secondHalf_timeout', true);
            this.model.save();
        }

    },
    saveEdit: function(e) {

        //get the edited element content
        var userVersion = $(e.currentTarget).html();

        //save the edited model
        this.model.set('points', userVersion);
        this.model.save();

    },
    templateHelpers:function(){

        // evaluate fouls by half
        if(this.model.get('half') === 1) {

            // is first half timeout used?
            var timeout = this.model.get('firstHalf_timeout');
            
            // evaluate first half fouls
            var fouls = this.model.get('firstHalf_fouls');
            var bonus = fouls >= 7 && fouls < 10;
            var dblbonus = fouls >= 10;

        } else {

            // is second half timeout used?
            var timeout = this.model.get('secondHalf_timeout');

            // evaluate second half fouls
            var fouls = this.model.get('secondHalf_fouls');
            var bonus = fouls >= 7 && fouls < 10;
            var dblbonus = fouls >= 10;

        }

        return {
            fouls: fouls,
            bonus: bonus,
            dblbonus: dblbonus,
            timeout: timeout
        }

    }
});

var ScoreboardScoreView = Backbone.Marionette.CompositeView.extend({
    className: 'scores',
    template: require('../../../templates/scoreboard/halfs.hbs'),
    events: {
        'click .half-button': 'changeHalf',
    },
    initialize: function(){
        this.listenTo(this.collection, 'change', this.render);
    },
    changeHalf: function() {
        
        // change half by listening to changes to global filtered collexction
        this.collection.each(function(team) {
            if(team.get('half') === 1) {
                team.set('half', 2);
                team.save();
            } else {
                team.set('half', 1);
                team.save();
            }
        });

    },
    templateHelpers:function(){
        
        // get current half by listening to changes to global filtered collexction
        var half = ''
        this.collection.each(function(team) {
            half = team.get('half');
        });

        return {
            half: half
        }

    },
    itemView: ScoresView
});

module.exports = ScoreboardView = Backbone.Marionette.Layout.extend({
    template: require('../../../templates/scoreboard/scoreboard.hbs'),
    regions: {
        scores: '.scores'
    },
    initialize: function(){

        // listen to when a new team is playing
        this.listenTo(App.data.teams, 'change:playing', this.render);

    },
    onRender: function(){
        
        // listen to global collection of playing teams
        var scoreboardScoreView = new ScoreboardScoreView({collection: App.data.teams.byWeekPlaying(App.state.week) });
        this.scores.show(scoreboardScoreView);

    }
});






