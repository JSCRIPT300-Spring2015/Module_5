var express = require('express');
var mongoose = require('mongoose');
var Truck = require('../models/truckModel');

var db = mongoose.createConnection('mongodb://localhost/foodTruckAPI');
var router = express.Router();

router.route('/')
    .get(function(request, response) {
        Truck.find(function (error, trucks) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.send(trucks);
            }
        });
    })
    .post(function (request, response) {
        var newTruck = new Truck(request.body);
        newTruck.save(function (error, newTruck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(201).send(newTruck);
            }
        });
    })

router.route('/:truckId')
    .all(function (request, response, next) {
        var foundId;
        Truck.findById(request.param.truckId, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.foundTruck = truck;
                next();
            }
        });
    })
    .get(function (request, response) {
        if (request.foundTruck) {
            response.send(request.foundTruck);
        } else {
            response.send({});
        }
    })
    .delete(function (request, response) {            
        delTruck = request.foundTruck;
        if (delTruck) {
            delTruck.remove(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).send('truck removed');
                }
            });
        } else {
            response.status(200).send('no truck removed');
        }
    });

module.exports = router;