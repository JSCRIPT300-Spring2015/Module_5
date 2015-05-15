var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var Truck = require('../models/truckModel');
var bodyParser = require('body-parser');
// the Router method returns an instance which 
// can be mounted as middle-ware
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/')
	.get(function (request, response) {
		Truck.find(function (error, trucks) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(trucks);
			}
		});
	})
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

router.route('/:id')
	.get(function (request, response) {
		Truck.findById(request.params.id, function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(truck);
			}
		});
	})
	.delete(function (request, response) {
		Truck.findById(request.params.id, function (error, truck) {
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
	})
	.put(function (request, response) {
		Truck.findById(request.params.id, function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				truck.name = request.body.title;
				truck.foodType = request.body.foodType;
				truck.schedule = request.body.schedule;
				truck.payment = request.body.payment;
				truck.description = request.body.description;
				truck.website = request.body.website;
				truck.Facebook = request.body.Facebook;
				truck.Twitter = request.body.read;
				truck.save(function (error) {
					if (error) {
						response.status(500).send(error);
					} else {
						response.send(book);
					}
				});
			}
		});
	});


module.exports = router;