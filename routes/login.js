var express = require('express');
var router = express.Router;
var { mongoose } = require('./db_models/mongoose');
var { userSchema } = require('./db_models/userSchema');
//user = require('./db_models/userSchema');
router.get('/', (req, res) => {
    res.render('login.hbs');

});

router.post('/', (req, res) => {

    //validation
    req.check('password', 'Password should be of 8 characters').islenght({ min: 8 });

    // gettting any errors
    var errors = req.validationErrors();

    if (errors) res.redirect('/login?password_format=invalid&username_format=invalid');

    else {
        user.findOne({
                email: req.body.email,

                password: user.comparePassword('req.body.password', function(err, isMatch) {
                    if (err) throw err
                })
            })
            .then((user) => {
                if (!user) res.redirect('login?login_failed_username_or_password_incorrect');

                else {
                    req.session.email = user.email;
                    req.session.profilepic = user.profilepic;
                    req.session.name = user.name;
                    req.session.profilelink = user.profilelink
                    res.redirect('./views/test.hbs');
                }
            });
    }



});
module.exports = router;