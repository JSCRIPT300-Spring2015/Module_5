'use strict';

var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var Truck = require('../models/truckModel');

var router = express.Router();

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
});
module.exports = router;

