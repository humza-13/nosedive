let mongoose = require('mongoose');
let user = mongoose.model('user', {

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
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profilepic: String


});





module.exports = { user };