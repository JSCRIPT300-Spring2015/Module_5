// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module

var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(serveStatic);

var trucks = require('./trucks');
var truckObject = trucks();


var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var Truck = require('./models/truckModel');


// we can now retrieve data from our database
app.get('/trucks', function (request, response) {
  Truck.find(function (error, trucks) {
    if (error) {   
        response.status(500).send(error);
    } else {
        response.json(trucks);
    }
});



router.route('/') //added to enable Route ing
	.get(function (request, response){
		var truckList = truckObject.getTrucks();
		response.send(truckList);
	})
	.post(function(request,response){
		var newTruck = request.body;
		if(newTruck){
			newTruck.read = false;
			//newTruck._id = idManager.getId(); //module to go get new id
			truckObject.addTruck(newTruck);
			response.status(201).json(newTruck);
		}else{
			response.status(400).json('problem adding the truck');
		}
	});

	
router.route('/:name')
	.get(function(request,response){
	  var foodTruckName = request.params.name;
	  var foodTruck = truckObject.getTruck(foodTruckName);
	  var truckHTML = '';
	  var truckName = foodTruck.name; //string
	  
	  var foodType = foodTruck.type; //array
	  var foodString = '';
	  if(foodType){
		// build the foodString - taking into account if blank, one entry, or many
		if(foodType.length===0){
			foodString = 'no entry found';
		}else if(foodType.length>0){
			foodString = foodType.join(', ');
		//	foodString = foodType[0];
		//	if(foodType.length>1){
		//		for(i=1;i<foodType.length;i++){
		//			foodString = foodString + ', ' + foodType[i];
		//		}
		//	}
		}
	  }else{
		foodString = 'no foodtypes listed';
	  }
	  
	  var payMethod = foodTruck.payment;  //array
	  var payString = '';
	  if(payMethod){
			// build the payString - taking into account if blank, one entry, or many
			payString = payMethod.join(', ');
			//payString = payMethod[0];
			//if(payMethod.length>1){
			//	for(i=1;i<payMethod.length;i++){
			//		payString = payString + ', ' + payMethod[i];
			//	}
			//}
	  }else{
		  payString = 'No payment methods listed.';
	  }
	 
	  var truckDesc = foodTruck.description; //string
	  if(truckDesc === undefined){
		  truckDesc = 'No description available.';
	  }
	  var truckSite = foodTruck.website; //string
	  if(truckSite === undefined){
		truckSite = 'No website available.';
	  }
	  var truckSchedule = foodTruck.schedule; //array
	  var schedString = '';
	  if(truckSchedule){
		  // build the payString - taking into account if blank, one entry, or many
		schedString = truckSchedule.join(', ');
		//schedString = truckSchedule[0];
		//if(truckSchedule.length>1){
		//	for(i=1;i<truckSchedule.length;i++){
		//		schedString = schedString + ', ' + truckSchedule[i];
		//	}
		//}
	  }else{
		  schedString = 'No schedule available for this truck.';
	  }
	  
	  truckHTML = '<ul><li>Truck Name: ' + foodTruckName + '</li><li>Foods: ' + foodString + '</li><li>Payments: ' + payString + '</li><li>Description: ' + truckDesc + '</li><li>Website: ' + truckSite + '</li><li>Schedule: ' + schedString + '</li>';
	  
	  response.send(truckHTML);  
	})


	.delete(function(request,response){
		var name = request.params.name; //get the name
		truckObject.removeTruck(name);
		response.sendStatus(200); //sends back ok in the body
	});

router.route('../food-types')
	.get(function(request,response){
		var foodTypes = truckObject.getFoodTypes();
		response.send(foodTypes);
	});

router.route('../food-types/:name')
	.get(function(request,response){
		var foodName = request.params.name;
		var filteredTrucks = truckObject.filterByFoodType(foodName);
		var nameString = '';
		for(i=0;i<filteredTrucks.length;i++){
			nameString = nameString + filteredTrucks[i].name + '<br>';
		}
		response.send(nameString);
	});


module.exports = router;
