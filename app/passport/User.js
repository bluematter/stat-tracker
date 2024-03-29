var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    
    admin           : Boolean,
    connected       : Boolean,

    local : {
        name        : String,
        email       : String,
        username    : String,
        gravatar    : String,
        password    : String,
    },
    facebook : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    twitter : {
        id          : String,
        token       : String,
        displayName : String,
        username    : String
    },
    google : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    }

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);
