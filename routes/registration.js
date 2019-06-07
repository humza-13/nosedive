var express = require('express');
var router = express.Router();
var { mongoose } = require('./../db_ models/mongoose');
var { user } = require('./../db_ models/user');
var { upload } = require('./../modified_multer/multer');

router.get('/', (req, res) => {
    res.render('registration.hbs');
});

router.post('/', upload.single('profilepic'), (req, res) => {

    // validation of form
    req.check('name', 'Minimum name length should be 4').isLength({ min: 4 });
    req.check('password', 'Minimum password length should be 4').isLength({ min: 8 });

    //if email is already taken then dont register the new user
    req.check('email')
        .isEmail().withMessage('Please enter a valid email address')
        .trim()
        .normalizeEmail()
        .custom(value => {
            return finduserByEmail(value).then(user => {
                //if user email already exists throw an error
            })
        });
    req.check('dob', 'Date of birth is required');
    req.check('gender', 'Required');

    var errors = req.validationErrors();

    if (errors) res.redirect('/login?password_format=invalid&user_format=invalid');
    //creat new user 
    else {
        var newuser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender,
            profilepic: req.file.filename
        });

        //saving in database 
        newuser.save()
            .then((doc) => {
                user.findOne({
                        email: req.body.email,
                        password: req.body.password
                    })
                    .then((user) => {
                        req.session.email = user.email,
                            req.session.name = user.name,
                            req.session.profilepic = user.profilepic,
                            req.session.gender = user.gender,
                            res.redirect('./../views/test.hbs');
                    });


            }, (e) => {
                console.log('Unable to signup');
            });
    }
});


function finduserByEmail(email) {
    if (email) {
        return new Promise((resolve, reject) => {
            user.findOne({ email: email })
                .exec((err, doc) => {
                    if (err) return reject(err)
                    if (doc) return reject(new Error('This email already exists. Please enter another email.'))
                    else return resolve(email)
                });
        });
    }
}
module.exports = router;