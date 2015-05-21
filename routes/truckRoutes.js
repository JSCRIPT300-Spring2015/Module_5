var express = require('express');
var mongoose = require('mongoose');
var Truck = require('../models/truckModel');

var router = express.Router();

// '/trucks' routes
router.route('/')

	// List all trucks
	.get(function (request, response) {
		Truck.find(function (error, trucks) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(trucks);
			}
		});
	})

	// Add new truck
	.post(function (request, response) {
		var truck = new Truck(request.body);

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
		Truck.findById(request.params.truckId, function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(truck);
			}
		});
	})

	// Delete truck from list
	.delete(function (request, response) {

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

module.exports = router;
