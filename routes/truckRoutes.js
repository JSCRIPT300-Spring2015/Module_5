// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// remember this is a Node module

var express = require('express');
var mongoose = require('mongoose');

// this is the Mongoose model we'll use, truckModel.js
var Truck = require('../models/truckModel');

// Express Router
var router = express.Router();

router.route('/')
    .get(function (request, response) {
        // .find is a MongooseDB function
        // this is equal to 'var trucks = foodTrucks.getTrucks();'
        Truck.find(function (error, trucks) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.json(trucks);
            }   
        });
    })

    .post(function (request, response) {
        // create a new instance of the Truck model with request.body
        var newTruck = new Truck(request.body);
        // .save is a MongooseDB function
        // return the data that we created with new id
        newTruck.save(function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(201).send(truck);
            }
        });
    });

router.route('/:id')
    // instead of calling request.params.id, we can call the '.all function'
    .get(function (request, response) {
        // .findById is a MongooseDB function
        // this is equal to 'var truck = foodTrucks.getTruck(request.params.name);'
        Truck.findById(request.params.id, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.send(truck);
            }
        });
    })

    .delete(function (request, response) {
        // like the GET route, use the findById method on the mongoose model
        Truck.findById(request.params.id, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                // .remove is a mongooseDB function
                // provide a callback just in case
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
             