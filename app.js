var express = require('express');
var app = express();
var truckRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));
app.use('/trucks', truckRoutes);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('listiening on port ', port);
});
