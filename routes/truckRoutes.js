// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');
//var app = express();
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/foodTruckAPI');
var Truck = require('../models/truckModel');
var router = express.Router();
router.route('/')
.get(function(request, response) {
Truck.find(function (error, trucks) {
if (error) {
response.status(500).send(error);
} else {
response.json(trucks);
}
});
});
router.route('/:truckId')
.get(function(request, response) {
Truck.findById(request.params.truckId, function (error, truck) {
if (error) {
response.status(500).send(error);
} else {
response.json(truck);
}
});
})
module.exports = router;