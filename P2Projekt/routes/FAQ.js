var express = require('express');
var router = express.Router();

/* GET FAQ listing. */
router.get('/', function(req, res, next) {
  res.render('FAQ', {title: "FAQ Page"})
});

module.exports = router;
