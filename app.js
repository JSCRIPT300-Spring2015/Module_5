var express = require('express');
var app = express();
var truckRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));

// the truckRoutes is now a middle-ware callback
app.use('/trucks', truckRoutes);

app.listen(3000, function () {
	console.log('listening on port 3000');
});