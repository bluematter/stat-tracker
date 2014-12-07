// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '446186442184074', // your App ID
        'clientSecret'  : 'bcd77abd0fade8e9fb4da85b01bfdedf', // your App Secret
        'callbackURL'   : 'http://localhost:4568/auth/facebook/callback' // local
        //'callbackURL'   : 'http://stats.bluematter.io/auth/facebook/callback' // production
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback' // local
        //'callbackURL'       : 'http://localhost:8080/auth/twitter/callback' // production
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback' // local
        //'callbackURL'   : 'http://localhost:8080/auth/google/callback' // production
    }

};