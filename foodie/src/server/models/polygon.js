const mongoose = require('mongoose');

const geoPolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true
    }
});

let GeoPolygon = mongoose.model('GeoPolygon', geoPolygonSchema);
module.exports = GeoPolygon;