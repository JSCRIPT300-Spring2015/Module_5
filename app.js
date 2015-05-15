var express = require('express');
var truckRoutes= require('./routes/truckRoutes');
var bodyParser = require('body-parser');
var app = express();


app.use('/trucks', truckRoutes);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function () {
	console.log('listening on port 3000');
});