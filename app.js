var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var truckRouter = require('./routes/truckRoutes');

var app = express();
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.use('/trucks', truckRouter);

//var Truck = require('./models/truckModel');

//app.get('/trucks', function (request, response) {
//    Truck.find(function (error, trucks) {
//        if (error) {
//            resposne.status(500).send(error);
//        } else {
//            response.json(trucks);
//        }
//    });
//});
//
//app.get('/trucks/:name', function (request, response) {
//    Truck.findById(request.params.name, function (error, truck) {
//        if (error) {
//            response.status(500).send(error);
//        } else {
//            response.json(truck);
//        }
//    });
//});


app.listen(port, function() {
    console.log('listening on port', port);
});