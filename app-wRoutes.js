var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var bodyParser = require('body-parser');
var Truck = require('./models/truckModel');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// List all trucks
app.get('/trucks', function (request, response) {
	Truck.find(function (error, trucks) {
		if (error) {
			response.status(500).send(error);
		} else {
			response.json(trucks);
		}
	});
});

// Retrieve a truck object
app.get('/trucks/:truckId', function (request, response) {
	Truck.findById(request.params.truckId, function (error, truck) {
		if (error) {
			response.status(500).send(error);
		} else {
			response.json(truck);
		}
	})
});

// Add new truck
app.post('/trucks', function (request, response) {
	var truck = new Truck(request.body);

	truck.save(function (error) {
		if (error) {
			response.status(500).send(error);
		} else {
			response.status(201).send(truck);
		}
	});
});

// Update trucks list -- NOT FOR THIS ASSIGNMENT
app.put('/trucks/:truckId', function (request, response) {
	var truck = trucks.getTruck(request.params.truckId);
	var updatedTrucks;

	if (truck && request.body) {
		updatedTrucks = trucks.updatedTrucks(request.body);
		response.send(updatedTrucks);
	} else {
		response.status(404).json('Could not locate truck for update');
	}
});

// Delete truck from list
app.delete('/trucks/:truckId', function (request, response) {

	Truck.findById(request.params.truckId, function (error, truck) {
		if (error) {
			response.status(500).send(error);
		} else {
			truck.remove(function (error) {
				if (error) {
					response.status(500).send(error);
				} else {
					response.status(204).send('removed');
				}
			});
		}
	});
});

app.listen(3000, function () {
	console.log('listening on port 3000');
});
