var express = require('express');
var router = express.Router();
var { user } = require('./../db_ models/user');

router.get('/:name', (req, res) => {
    if (req.session.email) {
        var person = req.params.name;
        user.findOne({
            name: person
        }).then(user => {
            if (user) {
                res.render('chat.hbs', {
                    // my data
                    myUsername: req.session.name,
                    myProfilepic: req.session.profilepic,
                    myProfilelink: req.session.profilelink,
                    myEmail: req.session.email,
                    myGender: req.session.gender,
                    myDob: req.session.dob,
                    // data of user that is opened
                    user: user
                });
            } else {

            }
        });

    } else {
        res.redirect('/login?session=expired');
    }
});

module.exports = router;