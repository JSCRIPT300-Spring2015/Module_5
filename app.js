var express = require('express');
var app = express();

// mongoose is just another node module
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/trucksAPI');
var bodyParser = require('body-parser');

var Truck = require('./models/truckModel');
var idManager = require('./idManager');

idManager.setIds(trucks.getTrucks());

app.use(express.router('Routes', truckRoutes));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//A GET route for '/food-types' that sends to the response the unique list of food types associated with the food trucks in the foodTrucks list.
// Removed for Module 5
//app.get('/food-types', function (request, response) {
//        var types = trucks.getFoodTypes();
//        
//        response.send(types);
//});        
//
//app.get('/food-types/:name', function (request, response){
//        var name = request.params.name;
//        var foodTrucks = trucks.filterByFoodType(name);
//        if (foodTrucks) {
//            response.send(foodTrucks);
//        } else {
//                response.status(404).json('No ' + name + 
//' type food trucks found.' );
//        }
//});


app.listen(8000, function () {
    console.log('listening on port 8000');
});
