var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/login', passport.authenticate('local') , login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/register', register);
app.post('/api/logout', logout);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/user',
        failureRedirect: '/assignment/index.html#!/login'
    }));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get('/api/user/:userId', findUserById);
// findUserByCredentials and findUserByUsername are combined
// as a single function findUser since they have the same URL pattern
app.get('/api/user', findUser);
app.post('/api/user', createUser);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);



function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if (bcrypt.compareSync (password, user.password)) {
                return userModel
                    .findUserByCredentials(username, user.password)
                    .then(function (user) {
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
            }
        });
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (!user) {
                var newUser = {
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };

                return userModel
                    .createUser(newUser)
                    .then(function (response) {
                        return done(null, response);
                    })
            } else {
                return userModel
                    .updateFacebookToken(user._id, profile.id, token)
                    .then(function (response) {
                        return done(null, user);
                    })
            }
        })
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
    userModel
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