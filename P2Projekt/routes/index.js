var express = require('express');
var router = express.Router();
const review_controller = require('../controllers/reviewController');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Electronic Health Record Translaton' });
});

// POST request for creating review.
router.post('', review_controller.review_create_post);




module.exports = router;


