let mongoose = require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

let userSchema = mongoose.model('user', {

    name: {

        type: String,
        required: true

    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password too short'],
        max: [20, 'Password too long']


    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profilepic: String,
    profilelink: String

});

//encrypting the password before saving 
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



module.exports = { userSchema };
//module.exports = mongoose.model('user', userSchema);