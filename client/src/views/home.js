var Marionette   = require('backbone.marionette');

module.exports = homeView = Marionette.ItemView.extend({
    className: 'homeView',
    template: require('../../templates/home.hbs'),
    initialize: function() {
        this.snapMenu();
        this.facebook();
    },
    facebook: function() {
        $(document).on('fbStatusChange', function (event, data) {
            if (data.status === 'connected') {
                console.log('connected')
                FB.api('/554870764588961/members/', function (response) {
                    console.log(response);
                });
            } else {
                console.log('not connected')
            }
        });
    }, 
    snapMenu: function() {
        var snapper = new Snap({ element: document.getElementById('wrap') });
        $('.custom-toggle').click(function(){
            if( snapper.state().state=="left" ){
                snapper.close();
                $(this).removeClass('close-menu');
            } else {
                snapper.open('left');
                $(this).addClass('close-menu');
            }
        });
    }
});
