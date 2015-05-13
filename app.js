'use strict';
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));
// the bookRoutes is now a middle-ware callback
app.use('/trucks', truckRoutes);
  
app.listen(3000, function () {
  console.log('listening on port 3000');
});