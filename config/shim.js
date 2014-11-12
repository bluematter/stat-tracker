module.exports = {
    "jquery": "$",
    "bootstrap": {
        "exports": "bootstrap",
        "depends": {
            "jquery": 'jQuery'
        }
    },
    '../bower_components/slimScroll/jquery.slimscroll.js' :  { 'exports': 'slimscroll', 'depends': { '../bower_components/jquery/jquery.js': '$' } },
    "jquery.stellar": "Stellar",
    "snapjs": "Snap",
    "jscrollpane": {
        "exports": "jscrollpane",
        "depends": {
            "jquery": "$"
        } 
    },
    "mousewheel": {
        "exports": "mousewheel",
        "depends": {
            "jscrollpane": 'jscrollpane'
        } 
    },
    "underscore": "_",
    "backbone": {
        "exports": "Backbone",
        "depends": {
            "jquery":"$",
            "underscore":"underscore"
        }
    },
    "backbone.babysitter": {
        "exports": "Backbone.BabySitter",
        "depends": {
            "backbone":"Backbone"
        }
    },
    "backbone.wreqr": {
        "exports": "Backbone.Wreqr",
        "depends": {
            "backbone":"Backbone",
            "underscore":"_"
        }
    },
    "backbone.marionette": {
        "exports": "Marionette",
        "depends": {
            "backbone":"Backbone",
            "backbone.wreqr":"Backbone.Wreqr",
            "backbone.babysitter":"Backbone.BabySitter"
        }
    }
};
