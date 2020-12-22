const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')();
const locationSchema = require('./location').schema;
// let GeoPoint = require('./point');

let restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Restaurant.js name cannot be empty'
    },
    location: locationSchema,
    restaurant_photos: [{
        data: Buffer,
        contentType: String
    }],
    reviews_number: {
        type: Number
    },
    about: {
        type: String
    },
    average_rating: {
        type: Number
    },
    main_image: {
        type: String
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

restaurantSchema.virtual('Reviews', {
    ref: 'Review',
    localField: 'reviews_ids',
    foreignField: '_id',
    justOne: false,
});

restaurantSchema.plugin(mongooseHidden, { virtuals: { reviews_ids: 'hideJSON' }});

// restaurantSchema.pre('findOneAndUpdate', async function(next) {
//     // Note that longitude comes first in a GeoJSON coordinate array, not latitude
//     const docToUpdate = await this.model.findOne(this.getQuery());
//     const po = new GeoPoint({type: 'Point', coordinates: [docToUpdate['location']['DisplayPosition']['Longitude'],
//             docToUpdate['location']['DisplayPosition']['Latitude']]});
//     // docToUpdate['location']['GeoPoint'] = new GeoPoint({type: 'Point', coordinates: [docToUpdate['location']['DisplayPosition']['Longitude'],
//     //         docToUpdate['location']['DisplayPosition']['Latitude']]});
//     console.log(po);
//     next();
// });


let Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;