const mongoose = require('mongoose');

const geoPointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

let GeoPoint = mongoose.model('GeoPoint', geoPointSchema);
module.exports = GeoPoint;