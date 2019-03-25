// local strategy setup is based off of Brad T's guide: https://github.com/bradtraversy/nodekb
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // setup local strategy
  passport.use(new LocalStrategy(function(username, password, done){

    // compare queried username with db username
    let query = {username:username};
    User.findOne(query, function(err, user){
      if(err) throw err;
      // if user does not exist in db, render alert
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // if user, compare password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  })); // end passport use

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}