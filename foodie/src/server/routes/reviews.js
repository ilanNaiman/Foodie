const express = require('express');
const router = express.Router();
const moment = require('moment');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
const logger = require("../common/logger").winstonLogger;

const jwtHelper = require('../helpers/jwtHelper');


function verifyUserReviewAccess(req, res, next) {
    Review.findById(req.params.review_id).exec((err, review) => {
        console.log(review);
        if (String(review.user_id) !== String(req.user_id)) {
            return res.status(403).send({auth: false, message: 'Unauthorized to change this resource'});
        }
        next();
    });
}

router.route('/review/:review_id')
    .get(function (req, res, next) {
        Review.findById(req.params.review_id).populate('user').exec((err, review) => {
            if (err) {
                logger.error(err);
                res.send({err: err});
            }
            res.send(review);
        });
    })
    .put(jwtHelper.verifyJwtToken, verifyUserReviewAccess, function (req, res, next) {
        // find the original review, take its average and decrease it from the restaurants average to update it with
        // new average.
        Review.findById(req.params.review_id).exec((err, review) => {
            if (err) {
                logger.error(err);
                res.send({err: err});
            }
            Restaurant.findById(review.restaurant_id).exec((err, rest) => {
                if (err) {
                    logger.error(err);
                    res.send({err: err});
                }
                rest.reviews_number < 1 ?  rest.average_rating = review.average :
                    rest.average_rating = (rest.average_rating - (review.average / rest.reviews_number)) * (rest.reviews_number / (rest.reviews_number - 1));
                Review.findByIdAndUpdate(req.params.review_id, req.body,
                    {new: true}, (err, doc) => {
                        if (err) {
                            logger.error(err);
                            res.send({err: err})
                        }
                        console.log(doc);
                        const new_avg = ((rest.average_rating * (rest.reviews_number - 1)) + req.body.average) / rest.reviews_number;
                        Restaurant.findByIdAndUpdate(review.restaurant_id, {
                                $set: {
                                    average_rating: new_avg,
                                }
                            },
                            {new: true}).exec((err, restaurant) => {
                            if (err) {
                                logger.error(err);
                                res.send({err: err});
                            }
                            res.send(restaurant);
                        });
                    });
            });
        });
    })
    .delete(jwtHelper.verifyJwtToken, verifyUserReviewAccess, function (req, res, next) {
        Review.findByIdAndRemove(req.params.review_id, {}).exec((err, doc) => {
            console.log(doc);
            if (err) {
                logger.error(err);
                res.send({err: err})

            }
            Restaurant.findById(doc.restaurant_id).exec((err, rest) => {
                console.log(rest);
                if (err) {
                    logger.error(err);
                    res.send({err: err});
                }
                const new_reviews_num = rest.reviews_number - 1;
                let new_avg = 0;
                new_reviews_num === 0 ? new_avg = 0 : new_avg = (rest.average_rating - (doc.average/rest.reviews_number)) * (rest.reviews_number/ (new_reviews_num));
                Restaurant.findByIdAndUpdate(doc.restaurant_id, {
                        $set: {
                            average_rating: new_avg,
                            reviews_number: new_reviews_num
                        }
                    },
                    {new: true}).exec((err, restaurant) => {
                    if (err) {
                        logger.error(err);
                        res.send({err: err});
                    }
                    res.send(restaurant)
                });
            });
        });
    });

router.route('/reviews/')
    .get(function (req, res, next) {
        let findQuery = {};
        let skip = parseInt(req.query.skip) || 0;
        let sort_by = {creation_date: -1};

        if (req.query.user_id) {
            findQuery["user_id"] = { $eq: req.query.user_id };
        }
        if (req.query.restaurant_id) {
            findQuery["restaurant_id"] = { $eq: req.query.restaurant_id };
        }
        if (req.query.creation_date) {
            const gte_date = moment().subtract(req.query.creation_date, 'days').format();
            findQuery["creation_date"] = { $gte: gte_date };
        }
        if (req.query.bathroom_quality) {
            findQuery["bathroom_quality"] = { $gte: req.query.bathroom_quality };
            sort_by = {bathroom_quality: -1}
        }
        if (req.query.staff_kindness) {
            findQuery["staff_kindness"] = { $gte: req.query.staff_kindness };
            sort_by = {staff_kindness: -1}
        }
        if (req.query.cleanliness) {
            findQuery["cleanliness"] = {$gte: req.query.cleanliness};
            sort_by = {cleanliness: -1}
        }
        if (req.query.drive_thru_quality) {
            findQuery["drive_thru_quality"] = { $gte: req.query.drive_thru_quality };
            sort_by = {drive_thru_quality: -1}
        }
        if (req.query.delivery_speed) {
            findQuery["delivery_speed"] = { $gte: req.query.delivery_speed };
            sort_by = {delivery_speed: -1}
        }
        if (req.query.food_quality) {
            findQuery["food_quality"] = { $gte: req.query.food_quality };
            sort_by = {food_quality: -1}
        }
        Review.find(findQuery).populate('user').sort(sort_by).skip(skip).limit(10).exec((err, doc) => {
            if (err) {
                logger.error(err);
                res.send({err: err})
            }
            res.send(doc);
        });
    })
    .post(function (req, res, next) {
        let review = new Review(req.body);
        review.average = (review.bathroom_quality + review.staff_kindness + review.cleanliness + review.drive_thru_quality +
            review.delivery_speed + review.food_quality) / 6;
        review.save((err, doc) => {
            if (err) {
                logger.error(err);
                res.send({err: err})

            }
            Restaurant.findById(review.restaurant_id).exec((err, restaurant) => {
                if (err) {
                    logger.error(err);
                    res.send({err: err});
                }
                const new_avg = ((restaurant.average_rating * restaurant.reviews_number) + review.average) / (restaurant.reviews_number + 1);
                const new_reviews_num = restaurant.reviews_number + 1;
                Restaurant.findByIdAndUpdate(review.restaurant_id, {
                        $set: {
                            average_rating: new_avg,
                            reviews_number: new_reviews_num
                        }
                    },
                    {new: true}).exec((err, restaurant) => {
                    if (err) {
                        logger.error(err);
                        res.send({err: err});
                    }
                });
                // const avg_rating = review.average +
                // Restaurant.findByIdAndUpdate(review.restaurant_id,  { $set: { average_rating:  }})
                console.log(doc);
                res.send(doc);
            })
        });
    });

// get the sorted by rank reviews from the db
router.get('/reviews/sort-by-time/', function (req, res, next) {
    let findQuery = {};

    if (req.query.user_id) {
        findQuery["user_id"] = { $eq: req.query.user_id };
    }
    if (req.query.restaurant_id) {
        findQuery["restaurant_id"] = { $eq: req.query.restaurant_id };
    }


    Review.find(findQuery).populate('user').exec((err, doc) => {
        if (err) {
            logger.error(err);
            res.send({err: err})
        }
        res.send(doc);
    });
});


module.exports = router;
