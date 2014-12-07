var Marionette   = require('backbone.marionette'),
    TeamsCollection = require('../../collections/teams');

module.exports = statsView = Marionette.ItemView.extend({
    className: 'chartView',
    template: require('../../../templates/chartView/chartView.hbs'),

    events: {
        'click .post-stats': 'postStatsFacebook'
    },
    
    initialize: function() {
        this.listenTo(App.data.teams, 'change', this.render);
        this.$el.height($(window).height() - $('.navbar').outerHeight() - $('.scoreboard').height());
    },
    onRender: function() {
        this.buildChart();        
    },
    postStatsFacebook: function() {

        this.collection.each(function(team) {
            
            var playersMessage = [];
            var players = App.data.players.byTeam(team.id);
            players.each(function(player) {
                var playerMessage = "\n "+ player.get('player_name')+": "+ player.get('points') +" pts " + player.get('rebounds') +" rbs " + player.get('steals') +" stls " + player.get('blocks') +" blks "
                playersMessage.push(playerMessage);
            });
            
            var playersStatsMessage = playersMessage.join();

            var message = "Stats for: "+team.get('team_name')+ playersStatsMessage

            FB.api("/554870764588961/feed/", "POST",
                {
                    "message": message
                },
                function (response) {
                  if (response.error) {
                    alert(response.error)
                  }
                  if (response && !response.error) {
                    console.log(response);
                    alert('Stats posted to facebook!');
                  }
                }
            );
        });
    },
    buildChart: function() {
        var teamsData = [];

        this.collection.each(function(team) {
            teamsData.push ({
                fillColor : this.convertHex(team.get('team_color'),80),
                strokeColor : this.convertHex(team.get('team_color'),0),
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : [team.get('points'),team.get('rebounds'),team.get('steals'),team.get('blocks')]
            });
        }, this);

        var lineChartData = {
           labels : ["","","",""],
           datasets : teamsData  
        }
        
        var c = $('#canvas', this.el)[0];
        var ctx = c.getContext("2d");
        
        var self = this;
        setTimeout(function() {
            c.width = 350;
            c.height = self.$el.find('.chart-wrapper').height();
            var myLineChart = new Chart(ctx).Line(lineChartData, settings);
        },0);
    },
    convertHex: function(hex,opacity) {
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    },
    templateHelpers:function(){

        // needs to be only playing teams, for now its all teams
        var players = [];
        App.data.players.each(function(player) {
            players.push(player);
        });
        var maxPoints = _.max(players, function(player){ return player.attributes.points });
        
        var teams = [];
        this.collection.each(function(team) {
            teams.push(team);
        });

        return {
            maxPoints: maxPoints,
            homeTeam: teams[0],
            awayTeam: teams[1]
        }
    }
});

var settings = {
                    
     // GLOBAL //

     // Boolean - Whether to animate the chart
     animation: true,

     // Number - Number of animation steps
     animationSteps: 60,

     // String - Animation easing effect
     animationEasing: "easeOutQuart",

     // Boolean - If we should show the scale at all
     showScale: false,

     // Boolean - If we want to override with a hard coded scale
     scaleOverride: false,

     // ** Required if scaleOverride is true **
     // Number - The number of steps in a hard coded scale
     scaleSteps: null,
     // Number - The value jump in the hard coded scale
     scaleStepWidth: null,
     // Number - The scale starting value
     scaleStartValue: null,

     // String - Colour of the scale line
     scaleLineColor: "rgba(0,0,0,.1)",

     // Number - Pixel width of the scale line
     scaleLineWidth: 1,

     // Boolean - Whether to show labels on the scale
     scaleShowLabels: false,

     // Interpolated JS string - can access value
     scaleLabel: "<%=value%>",

     // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
     scaleIntegersOnly: true,

     // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
     scaleBeginAtZero: false,

     // String - Scale label font declaration for the scale label
     scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

     // Number - Scale label font size in pixels
     scaleFontSize: 12,

     // String - Scale label font weight style
     scaleFontStyle: "normal",

     // String - Scale label font colour
     scaleFontColor: "#666",

     // Boolean - whether or not the chart should be responsive and resize when the browser does.
     responsive: false,

     // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
     maintainAspectRatio: true,

     // Boolean - Determines whether to draw tooltips on the canvas or not
     showTooltips: true,

     // Array - Array of string names to attach tooltip events
     tooltipEvents: ["mousemove", "touchstart", "touchmove"],

     // String - Tooltip background colour
     tooltipFillColor: "rgba(0,0,0,0.8)",

     // String - Tooltip label font declaration for the scale label
     tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

     // Number - Tooltip label font size in pixels
     tooltipFontSize: 14,

     // String - Tooltip font weight style
     tooltipFontStyle: "normal",

     // String - Tooltip label font colour
     tooltipFontColor: "#fff",

     // String - Tooltip title font declaration for the scale label
     tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

     // Number - Tooltip title font size in pixels
     tooltipTitleFontSize: 14,

     // String - Tooltip title font weight style
     tooltipTitleFontStyle: "bold",

     // String - Tooltip title font colour
     tooltipTitleFontColor: "#fff",

     // Number - pixel width of padding around tooltip text
     tooltipYPadding: 6,

     // Number - pixel width of padding around tooltip text
     tooltipXPadding: 6,

     // Number - Size of the caret on the tooltip
     tooltipCaretSize: 8,

     // Number - Pixel radius of the tooltip border
     tooltipCornerRadius: 6,

     // Number - Pixel offset from point x to tooltip edge
     tooltipXOffset: 10,

     // String - Template string for single tooltips
     tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

     // String - Template string for single tooltips
     multiTooltipTemplate: "<%= value %>",

     // Function - Will fire on animation progression.
     onAnimationProgress: function(){},

     // Function - Will fire on animation completion.
     onAnimationComplete: function(){},


     // SPECIFIC FOR LINE CHARTS //

     ///Boolean - Whether grid lines are shown across the chart
     scaleShowGridLines : false,

     //String - Colour of the grid lines
     scaleGridLineColor : "rgba(0,0,0,0.0)",

     //Number - Width of the grid lines
     scaleGridLineWidth : 0,

     //Boolean - Whether the line is curved between points
     bezierCurve : false,

     //Number - Tension of the bezier curve between points
     bezierCurveTension : 0.4,

     //Boolean - Whether to show a dot for each point
     pointDot : false,

     //Number - Radius of each point dot in pixels
     pointDotRadius : 4,

     //Number - Pixel width of point dot stroke
     pointDotStrokeWidth : 1,

     //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
     pointHitDetectionRadius : 20,

     //Boolean - Whether to show a stroke for datasets
     datasetStroke : true,

     //Number - Pixel width of dataset stroke
     datasetStrokeWidth : 2,

     //Boolean - Whether to fill the dataset with a colour
     datasetFill : true,

     //String - A legend template
     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

 }