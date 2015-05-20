var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var Truck = require('./routes/truckRoutes') (Truck);
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/trucks', truckRouter);

app.listen(3000, function () {
	console.log('listening on port', port);
});
