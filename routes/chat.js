var express = require('express');
var router = express.Router();
const { mongoose } = require('./../db_ models/mongoose');
var { user } = require('./../db_ models/user');


router.get('/', (req, res) => {
    if (req.session.email) {

        res.render('chat.hbs', {
            myUsername: req.session.name,
            myProfilepic: req.session.profilepic,
            myEmail: req.session.email,


        });



    } else {
        res.redirect('/login?session=expired');
    }


});
module.exports = router;