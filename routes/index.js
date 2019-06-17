var express = require('express');
var router = express.Router();
var { mongoose } = require('./../db_ models/mongoose');
var { user } = require('./../db_ models/user');


router.get("/", (req, res) => {
    if (req.session.email) {

        res.render('index.pug', {
            myUsername: req.session.name,
            myProfilepic: req.session.profilepic,
            myEmail: req.session.email,

            getUsername: function() {
                return req.myUsername;
            }
        });



    } else {
        res.redirect('/login?session=expired');
    }




});
module.exports = router;