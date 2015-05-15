var express = require('express');
var app = express();
var truckRouter = require('./routes/truckRoutes');
var port = process.env.PORT || 3020;

// Serve home directory using static pages
app.use(express.static('public'));

app.use('/trucks', truckRouter);

app.listen(port, function () {
	console.log('Listening on port ' + port);
	console.log('Go to http://localhost:' + port + ' to view');
});