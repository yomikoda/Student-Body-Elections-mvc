var app = {};

app.drivers = {};
app.drivers.express = require('./drivers/express');
app.drivers.express.init();

app.drivers.mysql = require('./drivers/mysql');



app.models = {};
app.models.user = require('./models/user');
app.models.candidates = require('./models/candidates');
app.models.vote = require('./models/vote');



app.controllers = {};
app.controllers.routes = require('./controllers/routes')(app);