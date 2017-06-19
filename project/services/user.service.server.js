var app = require('../../express');
var userProjectModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

var LocalStrategy1 = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy1(localStrategy1));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/project/login', passport.authenticate('local') , login);
app.get('/api/project/checkLoggedIn', checkLoggedIn);
app.post('/api/project/register', register);
app.post('/api/project/logout', logout);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get('/api/project/user/:userId', findUserById);
// findUserByCredentials and findUserByUsername are combined
// as a single function findUser since they have the same URL pattern
app.get('/api/project/user', findUser);
app.post('/api/project/user', createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);



function localStrategy1(username, password, done) {
    userProjectModel
        .findUserByUsername(username)
        .then(function(user) {
            if (bcrypt.compareSync (password, user.password)) {
               // return userProjectModel
               //    .findUserByCredentials(username, user.password)
                   // .then(function (user) {
                        console.log(user);
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                   // });
            }
        });
}

function facebookStrategy(token, refreshToken, profile, done) {
    userProjectModel
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

                return userProjectModel
                    .createUser(newUser)
                    .then(function (response) {
                        return done(null, response);
                    })
            } else {
                console.log(profile);
                return userProjectModel
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
    console.log(user);
    user.password = bcrypt.hashSync(user.password);
    userProjectModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userProjectModel
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
    userProjectModel
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
        userProjectModel
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
        userProjectModel
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
    userProjectModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userProjectModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userProjectModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        });
}