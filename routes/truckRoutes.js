// connect to mongodb in this module as this is where you'll be making create/read/delete calls to your database
// use 'mongodb://localhost/foodTruckAPI' for your mongoose connection string
// remember this is a Node module
var express = require('express');
var app = express.router();

// mongoose is just another node module
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/trucksAPI');
var bodyParser = require('body-parser');

var Truck = require('./models/truckModel');
var idManager = require('./idManager');

idManager.setIds(trucks.getTrucks());
var serveStatic = express.static('public');
app.use(serveStatic);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//A GET route for '/trucks' that sends to the response the list of all food-truck objects in JSON format.
app.get('/trucks', function (request, response){
    
    var query = request.query;
    
    if (request.query.name) {
      query.name = request.query.name;
    }
    if (request.query.foodType) {
      query.foodType = request.query.foodType;
    }
    if (request.query.schedule) {
      query.schedule = request.query.schedule;
    }
  
    Truck.find(function(error, books){
      if (error) {
          response.status(500).send(error);
      }else{
        response.json(trucks);
      }
});

//A GET route for '/trucks/:name' that sends to the response the matching food-truck object in JSON format.
app.get('/trucks/:name', function (request, response) {
//        var id = request.params.id;
//        var truck = trucks.getTruck(id);
        Truck.findByID(request.params.name, function(error, truck){
        if (error) {
                response.status(500).send(error);     
        } else {
                response.json(truck);
        }
  });
});



//A POST route for '/trucks' that posts a new food-truck object consisting of (if they exist) the following values. After creating a new food truck object, add it to the foodTrucks array, then send it to the response: name food type schedule of days payment types accepted website url Facebook page url Twitter url
app.post('/trucks', function (request, response){
    var truck = new Truck(request.body);
    truck.save(function (error) {
      if (error) {
          response.status(500).send(error);
      } else {
          response.status(201).send(truck);  
      }
    });
});

app.put('/trucks/:name', function (request, response) {
    Truck.findById(request.params.name, function(error, book) {
      if (error){
        response.status(500).send(error);
      } else {
          truck.name = request.body.name;
          truck.foodType = request.body.foodType;
          truck.schedule = request.body.schedule;
          truck.payment = request.body.payment;
          truck.description = request.body.description;
          truck.website = request.body.website;
          truck.Facebook = request.body.Facebook;
          truck.Twitter = request.body.Twitter;
          truck.save(function (error) {
                if(error) {
                  response.status(500).send(error);
                } else {
                    response.send(truck);
                }
          });
        }
    });
});


//A DELETE route for '/trucks/:name' that sends a delete request that will delete the corresponding food-truck object from the foodTrucks array.
app.delete('/trucks/:name', function (request, response) {
    Truck.findById(request.params.name, function(error, book) {
      if (error){
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

app.listen(8000, function () {
    console.log('listening on port 8000');
});
  
module.exports = mongoose.model('Routes', truckRoutes);