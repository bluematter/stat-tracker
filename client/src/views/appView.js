var Marionette = require('backbone.marionette'),
    MenuView = require('./menu/menu'),
    StatsView = require('./statsView/statsView');

module.exports = AppLayoutView = Backbone.Marionette.Layout.extend({
	template: require('../../templates/appView.hbs'),

	regions: {
		menu: ".menu",
		stats: ".content"
	},

	onRender: function() {
		// possibly add a headerView here?

	    // render the app's menu (always render the menu)	
        var menuView = new MenuView();
        this.menu.show(menuView);

        this.snapper();
    },
    snapper: function() {
        setTimeout(function() {
            console.log(document.getElementById('stats'));  
        
            /* beta menu open */
            var snapper = new Snap({ element: document.getElementById('stats') });
            snapper.settings({
                resistance: 0.5,
                flickThreshold: 50,
                transitionSpeed: 0.3,
                easing: 'ease',
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
    }
});