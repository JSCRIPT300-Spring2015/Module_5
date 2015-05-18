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

    .get(function(request, response) {
        
        Truck.find(function(error, trucks) {
        	if (error) {
        		response.status(500).send(error);
        	} else {
        		response.json(trucks);
        	}
        });

    })

    .post(function(request, response){
        var newTruck = new Truck(request.body);

        newTruck.save(function (error) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(201).send(newTruck);
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

    .delete(function(request, response) {

        Truck.findById(request.params.id, function (error, truck) {
            if (error) {
                response.status(500).send(error);
            } else {
                Truck.remove(function (error) {
                    if (error) {
                        response.status(500).send(error);
                    } else {
                        response.status(200).send('Truck removed');
                    }
                });
            }
        });
    })

    .put(function(request, response) {

    // like the GET route, use the findById method on the mongoose model     
        Truck.findById(request.params.id, function (error, truck) {         
            if (error) {            
                 response.status(500).send(error);         
            } else {             
                Truck.name = request.body.name;             
                Truck.foodType = request.body.type;            
                Truck.schedule = request.body.schedule;             
                Truck.payment = request.body.payment;
                Truck.description = request.body.description;             
                Truck.website = request.body.website;            
                Truck.Facebook = request.body.Facebook;             
                Truck.Twitter = request.body.Twitter;

                Truck.save(function (error) {                
                    if (error) {                     
                        response.status(500).send(error);                
                    } else {                     
                        response.send(Truck);                 
                    }            
                });         
            }    
    }); 

});

module.exports = router;