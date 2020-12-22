const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User id cannot be empty'
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: 'Restaurant id cannot be empty'
    },
    creation_date: {
        type: Date,
        required: 'Creation date cannot be empty'
    },
    bathroom_quality: {
      type: Number
    },
    staff_kindness: {
        type: Number
    },
    cleanliness: {
        type: Number
    },
    drive_thru_quality: {
        type: Number
    },
    delivery_speed: {
        type: Number
    },
    food_quality: {
        type: Number
    },
    average: {
        type: Number
    },
    photos: [{
        type: String
    }],
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

reviewSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true,
});

let Review = mongoose.model('Review', reviewSchema);
module.exports = Review;