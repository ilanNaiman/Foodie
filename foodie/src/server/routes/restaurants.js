var express = require('express');
var router = express.Router();
const Restaurant = require('../models/restaurant');
const GeoPolygon = require('../models/polygon');
const geo_utils = require('geolocation-utils');
/* GET all restaurants */

router.get("/restaurants", function(req, res, next) {
    let findQuery = {};
    if (req.query.name) {
        findQuery["name"] = { $eq: req.query.name };
    }
    if (req.query.average_rating) {
        findQuery["average_rating"] = { $gte: req.query.average_rating };
    }
    if (req.query.restaurant_id) {
        findQuery["_id"] = { $eq: req.query.restaurant_id };
    }
    if (!req.query.prox && req.query.locationid) {
        findQuery["location.LocationId"] = { $eq: req.query.locationid };
    }
    if (req.query.prox) {
        let [latitude, longitude, radius] = req.query['prox'].split(",").map(x => parseFloat(x));
        let location = {lat: latitude, lon: longitude};
        const polygon = new GeoPolygon({type: 'Polygon', coordinates: [[
                Object.values(geo_utils.moveTo(location, {heading: 90, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 45, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 0, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 315, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 270, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 225, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 180, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 135, distance: radius})).reverse(),
                Object.values(geo_utils.moveTo(location, {heading: 90, distance: radius})).reverse()
            ]]});
        Restaurant.find(findQuery).where('location.GeoPoint').within(polygon).
        exec(function (err, rests) {
            if (err) {
                console.log(err);
            } else {
                return res.send(rests)
            }
        })
    } else {
        Restaurant.find(findQuery).exec((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        });
    }
});

/* GET simple get Search by name only */

router.get("/restaurants/:name", function(req, res, next) {
    Restaurant.find({ name: req.params.name}).
    populate('Reviews').
    exec(function (err, restaurant_and_reviews) {
        if (err) {
            console.log(err);
        } else {
            return res.send(restaurant_and_reviews)
        }
    })
});

router.get("/restaurants/prox/:prox", function(req, res, next) {
    // prox=Latitude,Longitude,Radius
    let [latitude, longitude, radius] = req.params['prox'].split(",").map(x => parseFloat(x));
    let location = {lat: latitude, lon: longitude};
    const polygon = new GeoPolygon({type: 'Polygon', coordinates: [[
            Object.values(geo_utils.moveTo(location, {heading: 90, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 45, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 0, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 315, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 270, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 225, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 180, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 135, distance: radius})).reverse(),
            Object.values(geo_utils.moveTo(location, {heading: 90, distance: radius})).reverse()
        ]]});
    Restaurant.find({}).where('location.GeoPoint').within(polygon).
    exec(function (err, rests) {
        if (err) {
            console.log(err);
        } else {
            return res.send(rests)
        }
    })
});

/* GET simple get Search by location only */

router.get("/restaurants/location/:location", function(req, res, next) {
    Restaurant.find({ location: req.params.location}).
    populate('Reviews').
    exec(function (err, restaurant_and_reviews) {
        if (err) {
            console.log(err);
        } else {
            return res.send(restaurant_and_reviews)
        }
    })
});

/* GET simple get Search by location and name */

router.get("/restaurants/:name/:location", function(req, res, next) {
    Restaurant.find({ name: req.params.name, location: req.params.location}).
    populate('Reviews').
    exec(function (err, restaurant_and_reviews) {
        if (err) {
            console.log(err);
        } else {
            return res.send(restaurant_and_reviews)
        }
    })
});

/* GET specific restaurant by id */

router.route('/restaurants/:restaurant_id')
    .get(function (req, res, next) {
        Restaurant.findById(req.params.restaurant_id).
        populate('Reviews').
        exec(function (err, restaurant_and_reviews) {
            if (err) {
                console.log(err);
            }
            else {
                return res.send(restaurant_and_reviews)
            }
        })
    })
    .put(function (req, res, next) {
        Restaurant.findOneAndUpdate({_id: req.params.restaurant_id}, req.body, {new: true}, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                return res.send(user)
            }
        });
    });

// Search by name, that have average score of (>4 >3 >2 >1). Sort by score.
// Search by location, that have average score of (>4 >3 >2 >1). Sort by score.


module.exports = router;


