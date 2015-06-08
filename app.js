var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParse = require('body-parser');
var truckRouter = require('./routes/truckRoutes');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParse.urlencoded({ extended: true }));

app.use('/trucks', truckRouter);

app.listen(port, function() {
	console.log('listening on port ', port);
});
