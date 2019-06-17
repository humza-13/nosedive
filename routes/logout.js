var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.session.email) {
        req.session.destroy();
    }
    res.redirect('/login');
});

module.exports = router;