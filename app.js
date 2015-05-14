var express = require('express');
var app = express();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var bodyParser = require('body-parser');
var Truck = require('./models/truckModel');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/trucks', function(request, response) {
    Truck.find(function(error, trucks) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.json(trucks);
        }
    });
});

app.get('/trucks/:id', function(request, response) {
    Truck.findById(request.params.id, function(error, truck) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.json(truck);
        }
    });
});

app.post('/trucks', function (request, response) {
    var newTruck = new Truck(request.body);

    console.log(newTruck);

    newTruck.save(function(error, savedTruck) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(201).json(savedTruck);
        }
    });
});

app.delete('/trucks/:id', function (request, response) {
    var id = request.params.id;

    Truck.findByIdAndRemove(id, function(error, truck) {
        if (error) {
            console.log(err);
            response.status(500).send(error);
        } else {
            response.sendStatus(200);
        }
    })
});

app.listen(3000, function () {
    console.log('listening on port 3000 by dennis the foodTruck');
});
