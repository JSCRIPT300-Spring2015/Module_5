// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var truckRoutes = app.route('./models/truckModel');

// '/trucks' routes
router.route('/')

	// List all trucks
	.get(function (request, response) {
		truckRoutes.find(function (error, trucks) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(trucks);
			}
		});
	})

	// Add new truck
	.post(function (request, response) {
		var truck = new truckRoutes(request.body);

		truck.save(function (error) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.status(201).send(truck);
			}
		});
	});


// '/trucks/truckId' routes
router.route('/:truckId')

	// Retrieve a truck object
	.get(function (request, response) {
		truckRoutes.findById(request.params.truckId, function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(truck);
			}
		});
	})

	// Delete truck from list
	.delete(function (request, response) {

		truckRoutes.findById(request.params.truckId, function (error, truck) {
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

module.exports = router;
