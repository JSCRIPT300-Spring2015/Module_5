// below you'll find the schema you need to export your truckModel
// when exporting the mongoose model you will create using this schema, 
// name your model 'Truck' (see the example in the slide deck for 'Book')
// this is to match the name of the collection the data was imported into

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var foodTruckSchema = new Schema({
 	name: {type: String},
 	foodType: {type: String},
 	schedule: {type: String},
 	payment: {type: String},
 	description: {type: String},
 	website: {type: String},
 	Facebook: {type: String},
 	Twitter: {type: String}
 });

module.exports = mongoose.model('Truck', truckModel);
