//This module serves all the core functionalities of the applications
//It handles all  Post and get requests 
//Returns the required data  and also updates database states
const express = require("express");
const router = express.Router();
const { User, Appointment, Calender } = require("../database/models/user");
const { checkAppointment, findSlot } = require("../helpers/checkIfValid");
const { generateStats } = require("../helpers/generateStats");
const {sendEmail} = require("../helpers/sendEmail")

const passport = require("../passport");
//This function handles & serves the signup requests
//Creates a new user using the Database' User Schema and stores it 
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
//This function handles & serves the login requests and authenticates user
//Incase of wrong credentials notifies user
router.post("/login",
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

//This function handles logOut requests and logouts user from the session
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

//This function allows Execs to add Appointments
//Checks if the current Appointment is schedulable
//Returns a new Slot if available
router.post("/addAppt", (req, resp) => {
  console.log("adding appt....");
  const {
    name,
    email,
    phone,
    date,
    time,
    duration,
    venue,
    id,
    title,
    involvedExecs,
  } = req.body;
  Calender.findOne({ date: date }).then((res) => {
    console.log(res);
    if (res) {
      if (checkAppointment(time, duration, res, involvedExecs, id)) {
        const temp = time.split(":");
        const res2 = involvedExecs.split(",");
        var temp2 = Number(temp[0]);

        res2.push(id);

        for (var i = 0; i < Number(duration) + 1; i++) {
          var temp2 = Number(temp[0]) + i;
          for (var j = 0; j < res2.length; j++) {
            Calender.findOneAndUpdate(
              { date: date },
              {
                $push: { [`a${temp2}`]: res2[j] },
              }
            ).then(res);
          }
          temp2++;
        }

        const newAppointment = new Appointment({
          name: name,
          email: email,
          phone: phone,
          slot_date: date,
          slot_time: time,
          slot_duration: duration,
          venue: venue,
          title: title,
          empID: id,
          isApproved: true,
          involvedExecs: [...new Set(res2)],
        });
        newAppointment.save().then((savedUser) => {
          sendEmail(savedUser)
          const temp = savedUser._id;
          User.findOne({ empID: id })
            .then((res) => {
              res.appointments.push(temp);
              res
                .save()
                .then((res) => {})
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        });

        resp.send({
          data: { start: 0, end: 0 },
          bool: true,
          message: " Added Successfully",
        });
       
      } else {
        const result = findSlot(involvedExecs, id, duration, time, res);
        resp.send({ data: result, bool: false, message: "NotPossible" });
      }
    } else {
      const newCalender = new Calender({
        date: date,
      });
      newCalender.save().then((res) => {
        const temp = time.split(":");
        const res2 = involvedExecs.split(",");
        var temp2 = Number(temp[0]);
        res2.push(id);
        for (var i = 0; i < Number(duration) + 1; i++) {
          for (var j = 0; j < res2.length; j++) {
            Calender.findOneAndUpdate(
              { date: date },
              {
                $push: { [`a${temp2}`]: res2[j] },
              }
            ).then(res);
          }
          temp2++;
        }
        res2.push(id);
        const newAppointment = new Appointment({
          name: name,
          email: email,
          phone: phone,
          slot_date: date,
          slot_time: time,
          slot_duration: duration,
          venue: venue,
          title: title,
          empID: id,
          isApproved: true,
          involvedExecs: [...new Set(res2)],
        });
        newAppointment.save().then((savedUser) => {
          const temp = savedUser._id;
          sendEmail(savedUser)
          User.findOne({ empID: id })
            .then((res) => {
              res.appointments.push(temp);
              res
                .save()
                .then((res) => {
                  resp.send({
                    data: { start: 1, end: 1 },
                    bool: true,
                    message: " Added Successfully",
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  });
});

//This function allows Execs and Secreatry to reschedule Appointments
//Checks if the current Appointment is re-schedulable to the new date
//Returns a new Slot if available
//If Secretary updates sends for approval
router.post("/:id/reschedule", (req, resp) => {
  const apptId = req.params.id;
  const { date, time, duration, venue } = req.body;
  Appointment.findOne({ _id: apptId }).then((result) => {

    const involvedExecs  = [...new Set(result.involvedExecs)];
    const id = result.empID;
    const oldTime = result.slot_time;
    const oldDate = result.slot_date;
    const oldDuration = result.slot_duration;
    Calender.findOne({ date: date })
      .then((res) => {
        if (res) {
          if (checkAppointment(time, duration, res, involvedExecs, id)) {
            const res2  = [...new Set(involvedExecs)];
            const oldTime2 = oldTime.split(":");
            var oldtemp2 = Number(oldTime2[0]);
            
            for (var j = 0; j < res2.length; j++) {
              var temp2 = Number(oldtemp2) ;
              for (var i = 0; i < Number(oldDuration) + 1; i++) {
               
                Calender.findOneAndUpdate(
                  { date: oldDate },
                  {
                    $pull: { [`a${temp2}`]: res2[j] },
                  }
                ).then((res) => {});
                temp2++;
              }
             
            }


            const temp = time.split(":");
            // console.log("Lenght",res2.length)
            for (var j = 0; j < res2.length; j++) {
              
              var temp2 = Number(temp[0]) ;
              for (var i = 0; i < Number(duration) + 1; i++) {
                Calender.findOneAndUpdate(
                  { date: date},
                  {

                    $push: { [`a${temp2}`]: res2[j] },
                  }
                ).then(res);
                temp2++;
              }
           
            }

            Appointment.findOneAndUpdate(
              { _id: req.params.id },
              req.user.empID.slice(0, 1) === "E"
                ? {
                    slot_date: date,
                    slot_time: time,
                    slot_duration: duration,
                    venue: venue,
                  }
                : {
                    slot_date: date,
                    slot_time: time,
                    slot_duration: duration,
                    venue: venue,
                    isApproved: false,
                  }
            ).then((data) => { sendEmail(data)});

            resp.send({
              data: { start: 0, end: 0 },
              bool: true,
              message: " Added Successfully",
            });
          } else {
            const result = findSlot(involvedExecs, id, duration, time, res);
            resp.send({ data: result, bool: false, message: "NotPossible" });
          }
        } else {
          const oldTime2 = oldTime.split(":");
          var oldtemp2 = Number(oldTime2[0]);

          const res2 = [...new Set(involvedExecs)];
          
          for (var j = 0; j < res2.length; j++) {
            var temp2 = Number(oldtemp2) ;
            for (var i = 0; i < Number(oldDuration) + 1; i++) {
            
              Calender.findOneAndUpdate(
                { date: oldDate },
                {
                  $pull: { [`a${temp2}`]: res2[j] },
                }
              ).then((res) => {});
              temp2++;
            }
          
          }
          const newCalender = new Calender({
            date: date,
          });
          newCalender.save().then((res) => {
            const temp = time.split(":");
            const res2 = [...new Set(involvedExecs)];
           
           
            for ( var j = 0; j < res2.length; j++) {
              var temp2 = Number(temp[0]);
              for (var i = 0; i < Number(duration) + 1; i++) {
                
             
                Calender.findOneAndUpdate(
                  { date: date },
                  {
                    $push: { [`a${temp2}`]: res2[j] },
                  }
                ).then(res);
                temp2++;
              }
              
            }
            res2.push(id);
            Appointment.findOneAndUpdate(
              { _id: req.params.id },
              req.user.empID.slice(0, 1) === "E"
                ? {
                    slot_date: date,
                    slot_time: time,
                    slot_duration: duration,
                    venue: venue,
                  }
                : {
                    slot_date: date,
                    slot_time: time,
                    slot_duration: duration,
                    venue: venue,
                    isApproved: false,
                  }
            ).then((data) => {
              resp.send({
                data: { start: 0, end: 0 },
                bool: true,
                message: " Added Successfully",
              })
              sendEmail(data);
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
//This function allows Execs to approve the reschedule Appointments
// Approved Appointments are added to the current Dairy
router.post("/:id/approve", (req, resp) => {
  Appointment.findOneAndUpdate(
    { _id: req.params.id },
    {
      isApproved: true,
    }
  )
    .then((res) => {
      resp.send(res);
    })
    .catch((err) => console.log(err));
});
//Serves the current user
router.get("/", (req, res, next) => {
  console.log("===== user!!======");

  if (req.user) {
    if (req.user.empID.slice(0, 1) === "E") {
      res.json({ user: req.user, bossData: null, sec: false });
    } else {
      User.findOne({ secID: req.user.empID }).then((data) => {
        res.json({ user: req.user, bossData: data, sec: true });
      });
    }
  } else {
    res.json({ user: null });
  }
});
//Serves the specific Appointments
router.get("/:id/getAppointments", (req, resp) => {
  Appointment.find({ involvedExecs: { $in: [`${req.params.id}`] } })
    .then((res) => {
      resp.send({ data: res, currUser: req.user.empID });
    })
    .catch((err) => {
      resp.send(err);
    });
});
//Serves stats
router.get("/getStatistics", (req, resp) => {
  var Employee = [];
  User.find().then((res) => {
    res.map((data) => {
      if (data.empID.slice(0, 1) === "E") Employee.push(data.empID);
    });
  });
  Appointment.find().then((res) => {
    const data = generateStats(res, Employee);
    resp.send({ data });
  });
});

module.exports = router;
