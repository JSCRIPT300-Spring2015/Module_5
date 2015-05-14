// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');

var bodyparser = require('body-parser');
var router = express.Router();

var Truck = require('../models/truckModel');

router.use(bodyparser.urlencoded({ extended: true}));
router.use(bodyparser.json());
router.use('/:id', function (req, res, next) {

	Truck.findById(req.params.id, function (error, truck) {
		if (error) {
			res.status(500).send(error);
		} else if (truck) {
			req.truck = truck;
			next();
		} else {
			res.status(404).send('truck not found');
		}
	});
});

router.route('/')
	.get(function (req, res) {
		
		Truck.find(function (error, trucks) {
			if (error) {
				res.status(500).send(error);
			} else {
				res.json(trucks);
			}
		});
	})
	.post(function (req, res) {

		var truck = new Truck(req.body);
		if (truck) {
			truck.save();
			res.status(201).send(truck);
		} else {
			res.status(400).send('unable to add new truck');
		}
	});

router.route('/:id')
	.get(function (req, res) {

		res.json(req.truck);
	})
	.put(function (req, res) {

		var truck = req.truck;

		if (req.body) {
			truck.name = req.body.name;
 			truck.foodType = req.body.foodType;
 			truck.schedule = req.body.schedule;
 			truck.payment = req.body.payment;
 			truck.description = req.body.description;
 			truck.website = req.body.website;
 			truck.Facebook = req.body.Facebook;
 			truck.Twitter = req.body.Twitter;
 			truck.save();
			res.send(truck);
		}
	})
	.delete(function (req, res) {
		
		req.truck.remove();
		res.status(204).send('removed');
	});

module.exports = router;
