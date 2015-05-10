// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
'use strict'
var express = require('express');
var router = express.Router();

router.route('/')
  .get(function (request, response) {
    response.json({hello: 'myspace'})
  // response.json(trucks.getTrucks());
  })
  .post(function (request, response){
    var newTruck = request.body;
    /*var foodTrucks = trucks.getTruck();
    console.log(newTruck);
    if (newTruck) {
      var truckNames = _.pluck(foodTrucks, 'name')
      var contains = _.contains(truckNames, newTruck.name)
      if (!contains) {
        trucks.addTruck(newTruck)
        response.status(201).json('Truck added');
      } else {
        response.status(400).json('Truck already exists');
      }
    }else {
      response.status(400).json('Truck not added');
    }*/
  })
  .put(function (request, response) {
    var newTruck = request.body;
    /*var foodTrucks = trucks.getTrucks();
    if (newTruck) {
      trucks.removeTruck(newTruck.name)
      trucks.addTruck(newTruck)
      response.status(200).json('truck updated')
    } else {
      response.status(400).json('no truck to update')
    }*/
  });

router.route('/:name')
  .get(function (request, response) {
    response.json({facebook: "jone"})
    /*
    var truck = trucks.getTruck(request.params.name);
    if (truck) {
      response.json(trucks.getTruck(request.params.name));
    } else {
      response.status(404).json('truck not found');
    }*/
  })
  .delete(function (request, response) {
    var truckName  = request.params.name;
    /*var foodTrucks = trucks.getTrucks();
    if (truckName) {
      var truckNames = _.pluck(foodTrucks, 'name')
      var contains = _.contains(truckNames, truckName)
      if (contains) {
        trucks.removeTruck(truckName);
        response.status(200).json('truck removed');
      } else {
        response.status(400).json('truck does not exist');
      }
    }else {
      response.status(400).json('truck not removed');
    }*/
  });







module.exports = router;