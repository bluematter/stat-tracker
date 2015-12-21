var Marionette = require('backbone.marionette'),
    PlayersCollection = require('../collections/players'),
    MenuView = require('./menu/menu'),
    StatsView = require('./statsView/statsView'),
    ScoreboardView = require('./scoreboard/scoreboardView');

module.exports = AppLayoutView = Backbone.Marionette.Layout.extend({
	template: require('../../templates/appView.hbs'),

	regions: {
		menu: ".menu",
		stats: ".content",
        scoreboard: ".scoreboard"
	}, 

	onRender: function() {

        /*
        |--------------------------------------------------------------------------
        | Render main app region views
        |--------------------------------------------------------------------------
        */

		// possibly add a headerView here?

	    // render the app's menu (always render the menu)	
        var menuView = new MenuView();
        this.menu.show(menuView);

        // stats view renders inside the controller because its dynamic

        // render the app's scoreboard (always render the scoreboard, for now??)
        var scoreboardView = new ScoreboardView();
        this.scoreboard.show(scoreboardView);
        
        /*
        |--------------------------------------------------------------------------
        | Initalize third party stuff
        |--------------------------------------------------------------------------
        */

        this.snapper();
        this.facebook(function (response) {
            var testCollection = new PlayersCollection(response);
            window.App.data.facebookPlayers = testCollection;
        }); // builds a backbone collection from facebook API

    },
    snapper: function() {
        setTimeout(function() {
            console.log(document.getElementById('stats'));  
        
            /* beta menu open */
            var snapper = new Snap({ element: document.getElementById('stats') });
            snapper.settings({
                resistance: 0.5,
                disable: 'right',
                flickThreshold: 50,
                transitionSpeed: 0.3,
                easing: 'ease',
                tapToClose: true,
                maxPosition: 200
            });
            $('.custom-toggle').click(function(){
                if( snapper.state().state=="left" ){
                    snapper.close();
                    $(this).removeClass('close-menu');
                } else {
                    snapper.open('left');
                    $(this).addClass('close-menu'); 
                }
            });
            snapper.on('animated', function(){
                if(snapper.state().state != 'closed') {
                    $('.custom-toggle').addClass('close-menu');
                } else {
                    $('.custom-toggle').removeClass('close-menu');
                }
            });
        },0);
    },
    facebook: function(callback) {
        // Build object from facebook suitable for playersCollection
        $(document).on('fbStatusChange', function (event, data) {
            if (data.status === 'connected') {
                console.log('facebook api connected')
                
                var facebookPlayers = [];

                FB.api('/554870764588961?fields=members{id,name,picture.type(large)}', function (response) {
                    for (i = 0; i < response.members.data.length; i++) { 
                        facebookPlayers.push({
                            player_name:response.members.data[i].name ,
                            player_picture:response.members.data[i].picture.data.url
                        });
                    }
                    callback(facebookPlayers);
                });

            } else {
                console.log('facebook api not connected')
            }
        });
    }
});