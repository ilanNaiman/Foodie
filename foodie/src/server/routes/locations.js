var express = require('express');
var router = express.Router();
const config = require("config");
const axios = require('axios');

router.get("/location_by_id", function(req, res, next) {
    req.query['apiKey'] = config.get("here.apiKey");
    req.query['gen'] = 8;
    axios({
        method: 'get',
        url: config.get('here.geocode_endpoint_url'),
        params: req.query
    }).then((result) => {
        res.json(result["data"]["Response"]["View"][0]["Result"][0]["Location"]);
    }).catch((err) => {
        res.send({'err': err});
    });
});

router.get("/locations", function(req, res, next) {
    req.query['apiKey'] = config.get("here.apiKey");
    axios({
        method: 'get',
        url: config.get('here.geolocation_endpoint_url'),
        params: req.query
    }).then((doc) => {
        res.json(doc.data);
    }).catch((err) => {
        console.log(err);
        res.send({'err': err});
    })});

module.exports = router;