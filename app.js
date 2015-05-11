//Brian Forcum Module_5 Homework


'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/trucks', truckRoutes);


app.listen(3000, function() {
	console.log('Listening on port 3000');
});
