const express = require("express");
const router = express.Router();
const { User, Appointment } = require("../database/models/user");
// const Appointment = require('../database/models/user')
const passport = require("../passport");

router.post("/signup", (req, res) => {
  console.log("user signup");

  const { name, email, empID, secID, password } = req.body;
  // ADD VALIDATION
  User.findOne({ empID: empID }).then((err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${empID}`,
      });
    } else {
      const newUser = new User({
        name: name,
        email: email,
        empID: empID,
        secID: secID,
        password: password,
      });
      newUser.save().then((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post(
  "/login",
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      empID: req.user.empID,
    };
    res.send(userInfo);
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log("Logging out");
    });
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});
router.post("/addAppt", (req, resp) => {
  console.log("adding appt....");
  const { name, email, phone, date, time, duration, venue, id, title } =
    req.body;
  var data = {
    name: name,
    email: email,
    phone: phone,
    slot_date: date,
    slot_time: time,
    slot_duration: duration,
    venue: venue,
    title: title,
  };
  User.findOne({ empID: id })
    .then((res) => {
      console.log(res);
      res.appointments.push(data);
      res
        .save()
        .then((res) => {
          resp.json("Appointment Added successfully");
        })
        .catch((err) => res.send(err));

      // Appointment.findOneAndUpdate(res.appointments)
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/", (req, res, next) => {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  });

  router.get("/:id/getAppointments",(req,resp)=>{
    User.findOne({empID:req.params.id}).then((res)=>{
        console.log(res)
        resp.send(res.appointments);
    }).catch(err=>{
        resp.send(err)
    })
  })

module.exports = router;
