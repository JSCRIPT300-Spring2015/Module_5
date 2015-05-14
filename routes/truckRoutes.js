// connect to mongodb in this module as this is where you'll be making creat/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');
var router = express.Router();
var Truck = require('../models/truckModel');

router.route('/trucks')
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
        var newTruck = new Truck(request.body);

        console.log(newTruck);

        newTruck.save(function (error, savedTruck) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(201).json(savedTruck);
            }
        });
    });

router.route('/trucks/:id')
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
        var id = request.params.id;

        Truck.findByIdAndRemove(id, function (error, truck) {
            if (error) {
                console.log(err);
                response.status(500).send(error);
            } else {
                response.sendStatus(200);
            }
        })
    });

//router.route('/food-types')
//    .get(function (request, response) {
//        var allFoodTypes = trucks.getFoodTypes();
//        response.send(allFoodTypes);
//    });
//
//router.route('/food-types/:type')
//    .get(function (request, response) {
//        var type = request.params.type;
//        var truckWithFoodType = trucks.filterByFoodType(type);
//        if (truckWithFoodType) {
//            response.send(truckWithFoodType);
//        } else {
//            response.status(404).send('Truck with food type ' + name + ' not found');
//        }
//    });

module.exports = router;