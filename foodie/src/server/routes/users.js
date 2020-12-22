var express = require('express');
var router = express.Router();
const User = require('../models/user');
const logger = require("../common/logger").winstonLogger;
const passport = require('passport');
const jwtHelper = require('../helpers/jwtHelper');

function verifyUserResourceAccess(req, res, next) {
    console.log(req.params.user_id);
    User.findById(req.params.user_id).exec((err, user) => {
        if (String(user.id) !== String(req.user_id)) {
            return res.status(403).send({auth: false, message: 'Unauthorized to change this resource'});
        }
        next();
    });
}

/* GET users listing.
*  PUT user change name/location */
// TODO: maybe checking inside server if user name already exist (upon put request)

router.route('/user/is_name_exists=:user_name')
    .get(function (req, res, next) {
        User.findOne({username: req.params.user_name}).exec((err, user) => {
            if (err) {
                logger.error(err);
                res.send({err: err})
            }
            if (user) {
                res.send(true)
            } else {
                res.send(false)
            }
        })
    });

router.route('/user/login')
    .post(function (req, res, next) {
        passport.authenticate('local', {session: false}, function(err, user, info) {
            if(err){
                return next(err);
            }
            if(user){
                return res.send({user: user, token: user.generateJWT()});
            } else {
                return res.status(422).json(info);
            }
        })(req,res,next)
    });

router.route('/users/:user_id')
    .get(function (req, res, next) {
      User.findById(req.params.user_id).populate('Reviews').exec((err, user) => {
        if (err) {
          console.log(err)
        } else {
          return res.send(user)
        }
      });
    }).
    put(jwtHelper.verifyJwtToken, verifyUserResourceAccess, function (req, res, next) {
        User.findByIdAndUpdate(req.params.user_id, req.body,{new: true}, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            return res.send(user)
        }
    });
});

router.route('/users/:user_id/reviews')
    .get(function (req, res, next) {
        User.findById(req.params.user_id).
        populate('Reviews').exec(function (err, review) {
            if (err) {
                console.log(err);
            }
            else {
                return res.send(review.Reviews)
            }
        })
    });

router.route('/users')
    .get(function (req, res, next) {
        let findQuery = {};
        let skip = parseInt(req.query.skip) || 0;
        let sort_by = {username: -1};

        if (req.query.username) {
            findQuery["username"] = { $eq: req.query.username };
        }
        if (req.query.location) {
            findQuery["location"] = {$eq: req.query.location};
            // TODO: add location radius search
        }

        User.find(findQuery).sort(sort_by).skip(skip).limit(10).exec((err, doc) => {
            if (err) {
                logger.error(err);
                res.send({err: err})
            }
            console.log(doc);
            res.send(doc);
        });
    })
    .post(function (req, res, next) {
        let user = new User(req.body);
        user.setPassword(req.body.password);
        user.save((err, doc) => {
            if (err) {
                logger.error(err);
                res.status('400');
                res.send({err: err})
            } else {
                res.send({user: doc, token: user.generateJWT()});
            }
        })
    });

module.exports = router;
