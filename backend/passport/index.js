//This module describes use of Passport for storing sessions 
//Sessions helps to stay logged in even if we refresh or reload our browser
const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const { User } = require("../database/models/user");
var mongoose = require("mongoose");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  //console.log(user) // the whole raw user object!
  console.log("---------");
  done(null, { empID: user.empID });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called");

  User.findOne({ empID: String(id.empID) }).then((user) => {
    console.log("*** Deserialize user, user:");

    console.log("--------------");
    done(null, user);
  });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
