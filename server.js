// var express = require('express');
// var app = express();
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// //// configure a public directory to host static content
// app.use(express.static(__dirname + '/public'));
//
// require ("./test/app.js")(app);
//
 var port = process.env.PORT || 3000;
//
// app.listen(port);
var express = require('express');
var app = express();

// app.get('/hello', function (req, res) {
//     res.send({message: 'hello from server'});
// });
app.use(express.static(__dirname + '/public'));

app.listen(3000);
