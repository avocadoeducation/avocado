var express = require("express"),
    http    = require("http"),
    server  = http.createServer(app),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose');
	
var app = express();


//habilita los archivos secundarios de resources y js necesarios de /web
//app.use(express.static('web'));
app.use(express.static('www'));

//de momento redirige a wall, a la espera de login
app.get('/', function(req, res) {
    res.sendfile('./www/index.html');});

routes = require('./routes/users')(app);

mongoose.connect('mongodb://localhost:27017/Avocado', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});
	
app.listen(8080, function(){
  console.log ('Servidor escuchando en puerto 8080');
});

