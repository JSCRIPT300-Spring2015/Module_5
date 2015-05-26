// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var Truck = require('../models/truckModel');

var router = express.Router();

function truckRouter(Truck){
router.route('/')
  .get(function (request, response){
    Truck.find(function(error, trucks){
        if(error){
          response.status(500).send(error);
        }else {
          response.send(trucks);
          next();
        }


    });
  })

  .post(function (request, response){
      var newTruck = request.body;
      var truck = new Truck(newTruck);
      truck.save(function (error, truck){
        if(error){
          response.status(500).send(error);
        }else{
          response.status(201).send(truck);
        }
      });
  });

  router.route('/:id')

    .all(function (request, response, next){

      Truck.findById(request.params.id, function(error, truck){
        if (error) {
          response.status(500).sen(error);
        } else {
          request.foundTruck = truck;
        }
      });
    })
    .get(function (request, response){
      var retTruck = {};


    if (request.foundTruck){
      retTruck = request.foundTruck;
      response.send(request.foundTruck);
    }else{
      response.send(truck);
    }
  })

    .delete(function(request,response){
      var id = request.params.id;


      if (request.foundTruck){
        request.foundTruck.remove(function (error){
          if (error){
            response.status(500).send(error);
          } else {
            response.sendStatus(200);
          }
        });
      }
    });
}
    module.exports = truckRouter;
