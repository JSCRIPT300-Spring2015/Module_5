'use strict';
var express = require('express');
var _ = require('underscore')
var bodyParser = require('body-parser')
var truckRoutes= require('./routes/truckRoutes');
var app = express();
var webport = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/trucks', truckRoutes);

app.listen(webport, function () {
  console.log('web server started on port ' + webport);
});