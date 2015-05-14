
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var truckRoutes= require('./routes/truckRoutes');

var app = express();
var port = process.env.PORT || 3000;

app.set('json spaces', 4);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/trucks', truckRoutes);

app.listen(port, function () { console.log('listening on port ' + port); });