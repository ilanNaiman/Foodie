let server = require('../app');
let mongoose = require("mongoose");
const config = require("config");
const logger = require("../common/logger").winstonLogger;

require('../models/review');
require('../models/user');
require('../models/restaurant');
const Restaurant = mongoose.model('Restaurant');
const User = mongoose.model('User');
const Review = mongoose.model('Review');

let chai = require('chai');
let chaiHttp = require('chai-http');
const MongoDBHelper = require("../helpers/MongoDBHelper");
let should = chai.should();
chai.use(chaiHttp);

describe('Reviews', () => {
    let review;
    let user;
    let restaurant;

    before((done) => {
        user = new User({"username": "tomer", "email": "t@gmail.com", "location": "Israel"});
        restaurant = new Restaurant({"name": "MyRest", "location": "Israel"});
        user.save((err, user) => {
            restaurant.save((err, rest) => {
                review = new Review({"user_id": user._id, "restaurant_id": rest._id,
                    "bathroom_quality": 5, "creation_date": new Date()});
                done();
            });
        });
    });

    /**
     * Empty the collection before each test
     */
    after((done) => {
        // MongoDBHelper.asyncEmptyCollections([Review, User, Restaurant.js]);
        Review.deleteMany({}, (err) => {
            if (err) {
                console.log(err);
            } else {
                User.deleteMany({}, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        Restaurant.deleteMany({}, (err) => {
                            done();
                        })
                    }
                })
            }
        });

    });

    describe('/GET Reviews', () => {
        it('it should GET a review by the given id', (done) => {
            review.save((err, review) => {
                should.not.exist(err);
                chai.request(server)
                    .get('/api/review/' + review._id)
                    .send(review)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe('/POST review', () => {
        it('it should POST a review', (done) => {
            chai.request(server)
                .post('/api/reviews')
                .send(review)
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/PUT/:id review', () => {
        it('it should UPDATE a review by the given id', (done) => {
            review.save((err, review) => {
                should.not.exist(err);
                chai.request(server)
                    .put('/api/review/' + review._id)
                    .send({bathroom_quality: 2})
                    .end((err, res) => {
                        should.not.exist(err);
                        res.body.should.have.property('bathroom_quality').eql(2);
                        res.should.have.status(200);
                        done();
                    });
            });
        })
    });

    describe('/DELETE/:id review', () => {
        it('it should DELETE a review by the given id', (done) => {
            review.save((err, review) => {
                should.not.exist(err);
                chai.request(server)
                    .delete('/api/review/' + review._id)
                    .send(review)
                    .end((err, res) => {
                        should.not.exist(err);
                        res.should.have.status(200);
                        done();
                    });
            });
        })
    });
});