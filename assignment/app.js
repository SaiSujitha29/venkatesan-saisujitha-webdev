var app = require('../express');


app.get('/goodbye', sayHello);

function  sayHello(req, res) {
    res.send("hello");
}
