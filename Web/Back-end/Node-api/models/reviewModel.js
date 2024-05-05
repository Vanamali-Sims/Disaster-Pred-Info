const mongoose = require('mongoose');
const validator = require('validator');

const reviewSchema = new mongoose.Schema({
    review : {
        type : String,
        required : [true,'Review cannot be empty']
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true, 'Review must belong to a user']
    }
},
{
    toJSON : { virtuals : true },
    toObject : { virtuals : true }
})

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path : 'user',
        select : 'name'
    })
    next();
})

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;