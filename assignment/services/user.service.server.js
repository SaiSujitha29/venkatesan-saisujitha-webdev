var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig, FacebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/login', passport.authenticate('local') , login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/register', register);
app.post('/api/logout', logout);


app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/user',
        failureRedirect: '/#/login'
    }));

app.get('/api/user/:userId', findUserById);
// findUserByCredentials and findUserByUsername are combined
// as a single function findUser since they have the same URL pattern
app.get('/api/user', findUser);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);



function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {return done(err); }
            }
        );
}

function FacebookStrategy() {
    
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    } else {
        res.send('0');
    }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    return userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

//-------------------------------------------------------------------------------------
function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    //to check if the url is /api/user?username=username&password=password
    if(typeof password === 'undefined'){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user !== null){
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
    else {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404);
            });
    }
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        });
}