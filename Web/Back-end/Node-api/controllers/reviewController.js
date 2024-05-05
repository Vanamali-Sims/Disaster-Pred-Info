const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {

    const reviews = await Review.find().sort({ createdAt: -1 });


    res.status(200).json({
        status : 'success',
        results : reviews.length,
        data : {
            reviews
        }
    })
});


exports.createReview = catchAsync(async (req, res, next) => {

    const newReview = await Review.create({
        review : req.body.review,
        rating : req.body.rating,
        user : req.body.user
    })

    res.status(201).json({
        status : 'sucess',
        data : {
            newReview
        }
    })
});

