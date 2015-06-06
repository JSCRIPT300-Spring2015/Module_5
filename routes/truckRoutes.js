// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module

var express = require('express');
var mongoose = require('mongoose');
//var bodyParser = require('body-parser');
//var trucks = require('./trucks');
var Truck = require('../models/truckModel');

var router = express.Router();

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

//app.use(serveStatic);

//var truckObject = trucks();

//var db = mongoose.connect('mongodb://localhost/foodTruckAPI');


/*
// we can now retrieve data from our database
app.get('/trucks', function (request, response) {
  Truck.find(function (error, trucks) {
    if (error) {   
        response.status(500).send(error);
    } else {
        response.json(trucks);
    }
});

*/

router.route('/') //added to enable Routeing
	.get(function (request, response){
		Truck.find(function(error, trucks){
			if(error){
			  response.status(500).send(error);
		  }else{
			  response.status(201).send(trucks);
		  }
		})
	})
	.post(function(request,response){
		var newTruck = new Truck(request.body);
		newTruck.save(function(error,truck){
			if(error){
			  response.status(500).send(error);
		  }else{
			  response.status(201).send(truck);
		  }
		})
	});

	
router.route('/:id')
	.get(function(request,response){
	  var foodTruckId = request.params.id;
	  Truck.findById(foodTruckId, function(error,truck){
		  if(error){
			  response.status(500).send(error);
		  }else{
			  response.status(201).send(truck);
		  }
	  })  
	})
	.delete(function(request,response){
		var id = request.params.id; //get the truck id
		Truck.findById(id,function(error,truck){
			if(error){
				response.status(500).send(error);
			}else if(truck){
				truck.remove(function(error,truck){
					if(error){
						response.status(500).send(error);
					}else{
					  response.sendStatus(200);
					}
				})
			}
		})
	});


module.exports = router;
