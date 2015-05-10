// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
'use strict';
var express = require('express');
var mongoose = require('mongoose');
// connect to the bookAPI database, creating it if it doesn't exist
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
// Truck is the Mongoose model we'll use for our data
var Truck = require('../models/truckModel');
// the Router method returns an instance which can be mounted as middle-ware
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
  .post(function (request, response) {
    // the request.body is the new truck object
    var truck = new Truck(request.body);
    truck.save(function (error) {
      if (error) {
        response.status(500).send(error);
      }
      else {
        response.status(201).send(truck);
      }
    });
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
  .delete(function(request,response){
    // like the GET route, use the findById method on the mongoose model
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