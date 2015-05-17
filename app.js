
var express = require('express');
var app = express();

// var trucks = require('./trucks');

var bodyParser = require('body-parser');
//request.body below
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json());

var serveStatic = express.static('public') 
app.use(serveStatic);

var Truck = require('./models/truckModel');

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var truckRouter = require('./routes/truckRoutes');

app.use('/trucks', truckRouter);

app.listen(port, function() {
	console.log('Listening on port ', port);
});

