var app = require('../../express');

app.get('/api/user/:userId', findUserById);
// findUserByCredentials and findUserByUsername are combined
// as a single function findUser since they have the same URL pattern
app.get('/api/user', findUser);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.json(user);
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    //to check if the url is /api/user?username=username&password=password
    if(typeof password === 'undefined'){
        for(var u in users) {
            var user = users[u];
            if( user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }
    else {
        for (var u in users) {
            var user = users[u];
            if(user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }
}

function createUser(req, res) {
    var user = req.body;
    user._id  = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    for(var u in users){
        if (users[u]._id == userId){
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}