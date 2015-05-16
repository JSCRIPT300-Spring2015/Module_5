// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var bodyParser = require('body-parser');

var Truck = require('../models/truckModel');

var router = express.Router();

router.route('/')

    .get(function (request, response) {
        Truck.find(function(error, trucks) {
        	if (error) {
        		response.status(500).send(error);
        	} else {
        		response.json(trucks);
        	}
        });

    })

    .post( function (request, response){
        var newTruck = request.body;
        if (newTruck) {
            newTruck.read = false;
            trucks.addTruck(newTruck);
            response.status(201).json(newTruck);
        } else {
            response.status(400).json('New truck not loaded.')
        }

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

        var truck = trucks.getTruck(request.params.id);
        if(!truck) {
    	    response.status(404).json('Sorry, cannot find the truck called ' +
    		    request.params.name);
        } else {
    	    response.json(truck);
        }
    })

    .delete( function (request, response) {
        var truckName = request.params.id;
        trucks.removeTruck(truckName);
        response.sendStatus(200);
    })

    .put(function (request, response) {
        var truckId = request.params.id;
        trucks.updateTruck(truckName);
        response.sendstatus(200);
    });



module.export = router;