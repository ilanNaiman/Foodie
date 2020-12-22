const mongoose = require('mongoose');
let GeoPoint = require('./point');

let locationSchema = new mongoose.Schema({
    LocationId: {
        type: String,
        required: "location ID cannot be empty!"
    },
    LocationType: {
        type: String
    },
    DisplayPosition: {
        Latitude: {type: Number},
        Longitude: {type: Number}
    },
    MapView: {
        TopLeft: {
            Latitude: {type: Number},
            Longitude: {type: Number}
        },
        BottomRight: {
            Latitude: {type: Number},
            Longitude: {type: Number}
        }
    },
    Address: {
        Label: {type: String},
        Country: {type: String},
        State: {type: String},
        County: {type: String},
        City: {type: String},
        PostalCode: {type: String},
    },
    GeoPoint: GeoPoint.schema,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

locationSchema.pre('save', function(next) {
    // Note that longitude comes first in a GeoJSON coordinate array, not latitude
    this['GeoPoint'] = new GeoPoint({type: 'Point', coordinates: [this['DisplayPosition']['Longitude'],
            this['DisplayPosition']['Latitude']]});
    next();
});

// locationSchema.pre('findOneAndUpdate', async function(next) {
//     // Note that longitude comes first in a GeoJSON coordinate array, not latitude
//     const docToUpdate = await this.model.findOne(this.getQuery());
//     console.log(docToUpdate);
//     docToUpdate['GeoPoint'] = new GeoPoint({type: 'Point', coordinates: [docToUpdate['DisplayPosition']['Longitude'],
//             docToUpdate['DisplayPosition']['Latitude']]});
//     next();
// });

let Location = mongoose.model('Location', locationSchema);
module.exports = Location;