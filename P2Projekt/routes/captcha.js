var express = require('express');
var router = express.Router();

/* GET captcha page. */
router.get('/', function (req, res, next) {
    res.render('captcha', { title: 'Human verification' });
});

module.exports = router;