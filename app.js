/*##Module_5 assignment	

There are two parts to this assignment.

__Part 1__: import the foodTrucksJSON.js data into your instance of mongodb by following the instructions in the dataImport.txt file in the Module_5 repository. In your express application, refactor the following routes (remove the /food-types and /food-types/:name routes for this assignment) to use a Mongoose model to retrieve, update, or delete the relevant data. You're going to define your truckModel module in a file called models/truckModel.js. The database you'll connect to is foodTruckAPI (this will be part of the connection string you use to connect in the [mongoose.connect()](http://slides.com/kinakuta/deck-10?token=mIjyUCbk#/14) call)

__GET__ /trucks

__GET__ /trucks/:id (was /:name, but now make this /:id)

__POST__ /trucks

__DELETE__ /trucks/:id (was /:name but now make this /:id)


__Part 2__: refactor these same routes  by moving them from app.js into a new route files: routes/truckRoutes.js 

In your new route file you will use the express.router() method to create a router object, onto which you will chain the relevant routes. This route file will be made into a Node module by using module.exports to export the router object you create. The paths you mount those routes on in your routes module will be relative to the path specified in app.js when you app.use() to mount the route modules. In app.js, for example, you're going to require in your routes module, then use them, passing the route you want to use it for as the first argument:

`app.use(path, routing-middleware-function);`

Use the existing files in the Module_5 assignment repository. Additionally, make sure you've created the package.json file and added any necessary dependencies to it (e.g. express, body-parser, mongoose). Additionally, be sure to include a .gitignore file that excludes the node_modules directory from your own repository.

Use the slides from [Module_4b](http://slides.com/kinakuta/deck-9?token=7P79fPdp#/) and [Module_5](http://slides.com/kinakuta/deck-10?token=mIjyUCbk#/) to see how to complete the two parts of this assignment.

This assignment is due by Thursday, May 14th by 7pm. Once grading has been completed, a :+1: comment will be added to the pull request and the pull request will be closed.
*/

// express.js module
var express = require('express');
var app = express();

// bodyParser module, takes the request object and parses the data putting it in key value pairs
var bodyParser = require('body-parser');


// mongoose module, this is the database and takes place of the JSON file
var mongoose = require('mongoose');
// this is what is created when we ran 'mongo foodTruckAPI < foodTrucksJSON.js' in the command prompt while mongoDB is running in another command prompt
// this is where we connect to the database
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

// mount routes/truckRoutes
var truckRouter = require('./routes/truckRoutes');

// middleware modules
var serveStatic = express.static('public');
app.use(serveStatic);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// do this last
app.use('/trucks', truckRouter);


app.listen(3000, function () {
    console.log('...listening on port 3000...');
});