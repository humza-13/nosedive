var express = require('express');
var router = express.Router();
var { user } = require('./../db_ models/user');

router.get('/', (req, res) => {
    if (req.session.email) {
        let name = req.query.searchfield;
        if (name == '') {
            res.render('search.hbs', {
                users: null
            });
            return;
        }
        user.find({
            name: new RegExp(name, 'i')
        }).then((users) => {
            if (users) {
                res.render('search.hbs', {
                    users: users
                });
            } else {
                console.log('no users found');
            }
        });
    } else {
        res.redirect('/login?session=expired');
    }

});

module.exports = router;