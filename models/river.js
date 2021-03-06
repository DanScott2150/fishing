//Create database schema for 'River' objects

var mongoose = require('mongoose');

//Schema setup
var riverSchema = new mongoose.Schema({
    name: String,
    location: String,
    lat: Number,
    lng: Number,
    usgsID: String,     //Even though this is a numeric ID, need to save it as a string since USGS site ID's frequently begin with a 0. Mongoose apparently can't handle Number types for values that begin with 0
    journals: [         //Journal entries associated with a given River
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Journal"
        }
    ],
    mapMarkers: [         //Map markers on given map: used to mark fishing spots, parking spots, etc.
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MapMarker"
        }
    ]
});

module.exports = mongoose.model("River", riverSchema);