var express = require('express');
var app = express();
var mongoose = require('mongoose');
var truckRoutes = require('./routes/truckRoutes');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var bodyParser = require('body-parser');
//var Truck = require('./models/truckModel');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/trucks', truckRoutes);
var port = process.env.PORT || 3000;
// app.get('/trucks', function (request, response) {
// //var query = request.query;
// Truck.find(function (error, trucks) {
// if (error) {
// response.status(500).send(error);
// } else {
// response.json(trucks);
// }
// })
// })
app.listen(3000, function () {
console.log('listening on port 3000');
});