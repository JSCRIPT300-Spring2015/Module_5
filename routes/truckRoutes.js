var express = require('express');

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/foodTruckAPI');

var Truck = require('../models/truckModel');
var router = express.Router();

router.route('/')
	.get(function(request, response) {
		Truck.find(function (error, trucks) {
			if (error) {
				response.status(400).send(error);
			} else {
				response.json(trucks);
			}
		});
	})
	.post(function(request, response) {
		var newTruck = new Truck(request.body);
		if (newTruck) {
			newTruck.save();
			response.status(200).send(newTruck);
		} else {
			response.status(400).send('unable to create truck');
		}
	});

router.route('/:truckId')
	.get(function(request, response) {
		Truck.findById(request.params.truckId, function (error, truck) {
			if (error) {
				response.status(400).send(error);
			} else {
				response.json(truck);
			}
		});
	})
	.delete(function(request, response) {
		Truck.findById(request.params.truckId, function (error, truck) {
			if (error) {
				response.status(400).send(error);
			} else {
				truck.remove(function (error) {
					if (error) {
						response.status(400).send(error);
					} else {
						response.status(200).send('removed');
					}
				});
			}
		});
	});

module.exports = router;