var express = require('express');
var app = express();

var router = require('./routes/truckRoutes');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.listen(3000, function () {
    console.log('listening on port 3000 by dennis the foodTruck');
});
