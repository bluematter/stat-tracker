module.exports = {
    "jquery": "$",
    "bootstrap": {
        "exports": "bootstrap",
        "depends": {
            "jquery": 'jQuery'
        }
    },
    "jquery.stellar": "Stellar",
    "snapjs": "Snap",
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
    "backbone.nested": {
        "exports": "Backbone.Nested",
        "depends": {
            "backbone":"Backbone",
            "underscore":"_"
        }
    },
    "backbone.dualStorage": {
        "exports": "Backbone.DualStorage",
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
            "backbone.babysitter":"Backbone.BabySitter",
            "backbone.nested":"Backbone.Nested"
        }
    }
};
