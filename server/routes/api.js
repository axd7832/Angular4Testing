const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongojs = require('mongojs');
const ObjectID = require('mongodb').ObjectID;
const db = mongojs("mean", ["use"]);
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

passport.use(new LocalStrategy( (username, password, done) => {
    db.users.findOne({
      username:username
    }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        console.log("Not Verified");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(user){
        bcrypt.compare(password, user.password, function(err, res) {
          if(res == false){
            console.log("Verified");
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      }
      return done(null, user);
    });
  }
));

//TODO User Login
// Figure out how to create a session (JWT?)
// Figure out how to hash password on both ends
router.post('/login', function(req, res, next) {
  passport.authenticate('local',{successRedirect:"/",failureRedirect:"/login",flashMessage:false});
});
//TODO User Logout

// Get All Users
router.get('/users', (req, res, next) => {
  db.users.find((err, users) => {
    if (err) return next(err);
    response.data = users;
    res.json(response);
  });
});
// Gets One User
router.get('/users/:username', (req, res, next) => {
  db.users.findOne({
    username:req.params.username
  }, (err, users) => {
    if (err) return next(err);
    response.data = users;
    res.json(response);
  });
});
// Adds One User
router.post('/register', function(req, res, next) {
  var user = req.body;
  // More Validation Here
  if (!user.name || !user.password || !user.username) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    })
  } else {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        user.salt = salt;
        db.users.save(user, (err, user) => {
          if (err) {
            console.log(err);
          }
          res.json(user);
        })
      });
    });
  }
});
// Deletes one user
router.delete('/users/:id', (req, res, next) => {
  db.users.deleteOne({
    _id: mongojs.ObjectId(req.params.id)
  }, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});
// Updates one user
router.put('/users/:id', (req, res, next) => {
  var user = req.body;
  var updUser = {};
  if (user.name && user.password) {
    updUser = user;
  }
  if (!updUser) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.users.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updUser, {}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }
});

module.exports = router;
