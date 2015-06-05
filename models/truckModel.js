var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// below you'll find the schema you need to export your truckModel
var foodTruckSchema = new Schema({
    name: String,
 	foodType: [String],
 	schedule: [String],
 	payment: [String],
 	description: String,
 	website: String,
 	Facebook: String,
 	Twitter: String
});

module.exports = mongoose.model('Truck', foodTruckSchema);