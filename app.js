var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var bodyParser = require('body-parser');
var Truck = require('./models/truckModel');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/trucks', truckRoutes);

app.listen(3000, function () {
	console.log('listening on port 3000');
});