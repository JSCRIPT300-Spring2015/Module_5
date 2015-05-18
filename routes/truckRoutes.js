// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module

var express = require('express');

// the Router method returns an instance which can be mounted as middle-ware
var router = express.Router();

// '/trucks' routes
app.route('/trucks')

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
app.route('/trucks/truckId')

	// Retrieve a truck object
	.post(function (request, response) {
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
