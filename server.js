var app = require('./express');
var express = app.express;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: "localhost"}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session/', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    req.session[name] = value;
    console.log(req.session);
    res.send(req.session);
});

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

//require("./assignment/app");
require("./project/app");

app.listen(port);