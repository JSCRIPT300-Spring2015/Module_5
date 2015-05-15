/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_5
 * by Diane Zevenbergen
 */

var express = require('express'); 
var app = express();  
var bodyParser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/trucks', truckRoutes);

app.listen(port, function() {
    console.log('listening on port 3000');
});
