// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module


var express = require('express');
var mongoose = require('mongoose');
var Truck = require('../models/truckModel');

var router = express.Router();


router.route('/')
	.get(function(request, response) {
		Truck.find(function(error, trucks) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.send(trucks);
			}
		});
	})
	.post(function(request, response) {
		var newTruck = request.body;
		var truck = new Truck(newTruck);

		truck.save(function(error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.status(201).send(truck);
			}
		});
	});

router.route('/:id')
	.get(function(request, response) {
		var id = request.params.id;

		Truck.findById(id, function(error, truck){
			if (error) {
				response.status(500).send(error);
			} else {
				response.send(truck);
			}
		});
	})
	.delete(function(request, response) {
		var id = request.params.id;

		Truck.findById(id, function(error, truck) {
			if (error) {
				response.status(500).send(error);
			} else if (truck) {
				truck.remove(function(error) {
					if (error) {
						response.status(500).send(error);
					} else {
						response.sendStatus(200);
					}
				});
			}
		});
	});


module.exports = router;


