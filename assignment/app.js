var app = require('../express');

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');

app.get('/goodbye', sayHello);
app.get('/websites', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name: "Facebook"},
        {name: "Twitter"},
        {name: "Instagram"},
        ];
    res.send(websites);
}

function  sayHello(req, res) {
    res.send("hello");
}
