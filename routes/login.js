var express = require('express');
var router = express.Router();
var { mongoose } = require('./../db_ models/mongoose');
var { user } = require('./../db_ models/user');

router.get('/', (req, res) => {
    res.render('login.hbs');

});

router.post('/', (req, res) => {


    console.log(req.body.email),
        console.log(req.body.password)
        //validation
    req.check('password', 'Minimum length of user should be 8').isLength({ min: 8 });

    // gettting any errors
    var errors = req.validationErrors();

    if (errors) res.redirect('/login?password_format=invalid&user_format=invalid');

    else {
        user.findOne({
                email: req.body.email,
                password: req.body.password
            })
            .then((user) => {
                if (!user) res.redirect('login?login_failed_username_or_password_incorrect');

                else {
                    req.session.email = user.email;
                    req.session.profilepic = user.profilepic;
                    req.session.name = user.name;
                    req.session.profilelink = user.profilelink,
                        req.session.dob = user.dob,
                        req.session.gender = user.gender

                    res.redirect('chat');
                }
            });
    }



});
module.exports = router;