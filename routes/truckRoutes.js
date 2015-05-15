/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_5
 * by Diane Zevenbergen
 */

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var bodyParser = require('body-parser');

// Defining a model for Mongoose to use ('Truck' is instance of truckModel)
var Truck = require('../models/truckModel');

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
        truck.save();
        response.status(201).send(truck);
    });

router.route('/:truckId')
    .get(function (request, response) {
        Truck.findById(request.params.truckId, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.json(truck);
            }
        });
    })
    .delete(function (request, response) {
        Truck.findById(request.params.truckId, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                truck.remove();
                response.status(204).send('removed');
            }
        });
    });

module.exports = router;
