
var express = require('express');
var app = express();  

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//detecting json data
app.use(bodyParser.json());//will look for json data in the request.

var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var Truck = require("../models/truckModel");



router.route('/')
	.get( function (request, response) {
		Truck.find(function (error, trucks) {
		if (error) {
			response.status(500).send(error);
		} else {
			response.json(trucks);
		}
		});
	})

	.post(function(request, response){
		    // the request.body is the new truck object
	    var truck = new Truck(request.body);
	    console.log(truck);
	    console.log(request.body);


	    truck.save(function (error) {
	        if (error) {
	        	console.log("error");
	            response.status(500).send(error);
	        } else {
	        	console.log("no error");
	            response.status(201).send(truck);
	        }
	    });   
	});

router.route('/:truckId')
	.get(function(request,response) {
		// use the findById method available on the mongoose model
		Truck.findById(request.params.truckId, function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.json(truck);
			}		
		});
	})
	.delete(function(request,response) {
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