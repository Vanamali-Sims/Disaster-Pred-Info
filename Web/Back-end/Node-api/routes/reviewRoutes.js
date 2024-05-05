const express = require('express');
const router = express.Router();
const { getAllReviews, createReview } = require("../controllers/reviewController");
const { protect } = require('../controllers/authController')


router.route('/')
    .get(getAllReviews)
    .post(createReview);

/*router.route('/:id')
    .get(getSpecificReview)
    .delete(deleteReview) */

module.exports = router;