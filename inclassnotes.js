//move routes to routes file
//use mongo db instead of json file
//put mongoose connection in app.js not truckRoutes as notes said to

//install express, body-parser, mongoose

//build truckRoutes.js file

var express = require('express);
var mongoose = require('mongoose);
var Truck = require('../models/truckModel');

var router = express.Router();

router.route('/') // this points to /trucks route cause its relative
	.get(function(request,response){//get all records back from truckapi
		Truck.find(function(error,trucks){
			if(error){
				response.status(500).send(error);
			}else{
				response.send(trucks);
			}			
		})		
	})
	.post(function(request,response){
		var newTruck = new Truck(request.body); //body-parser is called in app.js
		newTruck.save(function(error,truck){
			if(error){
				response.status(500).send(error);
			}else{
				repsonse.status(201).send(truck);
			}						
		})		
	});
	
	router.route('/:id')
		.get(function(request, response){
			var id = request.params.id;
			Truck.findById(id, function(eror,truck){
				if(error){
					response.status(500).send(error);
				}else{
					response.send(truck);
				}
			}			
		})
		.delete(function(request, response){
			var id = request.params.id;
			Truck.findById(id, function(error, truck){
				if(error){
					response.status(500).send(error);
				}else if (truck){
					truck.remove(function(error){
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
		
		/*
		inside the router.rout('/:id') section could do this
		to replace all the findById calls in the various routes - listen to lecture
		on how to implement this, around 50 minutes in
		.all(function(request, response, next){
			var foundId;
			Truck.findById(request.params.id, function(error,truck){
				if(error){
					response.status(500).send(error);
				}else{
					request.foundTruck = truck;
					next();
				}
			}
		}
		*/
		
		
		
		
		/*TruckModel.js */
		
		var mongoose = require('mongoose');
		var Schema = mongoose.Schema;
		
		var goodTruckSchema = new Schema({
			//see example for schema
		}
		
		module.exports = mongoose.model('Truck', foodTruckSchema);
		
		
		/*app.js*/
		
		var express = require('express);
		var app = express();
		var bodyParser = require('body-parser');
		var truckRouter = require('./routes/truckRoutes');
		var mongoose = require('mongoose');
		
		app.use(express.static('public'));
		app.use(bodyParser.urlencoded({extended:true}));
		app.use('/trucks',truckRouter); //this has to be last in the use list
		
		
		
		
		
		
		
		