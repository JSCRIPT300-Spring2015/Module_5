/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_5
 * by Diane Zevenbergen
 */

var express = require('express'); 
var app = express();    
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var bodyParser = require('body-parser');


app.use(express.static('public'));

// Defining a model for Mongoose to use ('Truck' is instance of truckModel)
var Truck = require('./models/truckModel');

// Retrieve data from database
app.get('/trucks', function (request, response) {
    Truck.find(function (error, trucks) {    
        if (error) {
            response.status(500).send(error);
        } else {
            response.json(trucks);
        }
    });
});


// Retrieving a single truck
app.get('/trucks/:truckId', function (request, response) {
    Truck.findById(request.params.truckId, function (error, truck) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.json(truck);
        }
    });
});

// Adding a new truck
app.post('/trucks', function (request, response) {
    // the request.body is the new truck object
    var truck = new Truck(request.body);
    truck.save();
    response.status(201).send(truck);
});


// Deleting a truck
app.delete('/trucks/:truckId', function (request, response) {

    // like the GET route, use the findById method on the mongoose model
    Truck.findById(request.params.truckId, function (error, truck) {
        if (error) {
            response.status(500).send(error);
        } else {
            truck.remove();
            response.status(204).send('removed');
        }
    });
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
