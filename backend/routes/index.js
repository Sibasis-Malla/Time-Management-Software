const express = require("express");
const router = express.Router();
const { User, Appointment,Calender } = require("../database/models/user");
const {checkAppointment,findSlot} = require("../checks/checkIfValid")
// const Appointment = require('../database/models/user')
const passport = require("../passport");
const checkIfValid = require("../checks/checkIfValid")

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
   const { name, email, phone, date, time, duration, venue, id, title,involvedExecs } =   req.body;
//     involvedExecs.map(res=>{
//         Appointment.find({empID:res}).then(data=>data.map(appt=>{
//             return checkIfValid(appt,req.body)
//         }))
//     })
    Calender.findOne({date:date}).then(res=>{
        console.log(res)
     if(res ){
       
        if (checkAppointment(time,duration,res,involvedExecs,id)){
            const temp = time.split(":")
            const res2 = involvedExecs.split(",")
            for(var i=0;i<=Number(duration);i++){
                const temp2 = Number(temp[0])+i
                Calender.findOneAndUpdate({date:date},{
                    $push: {[`a${temp2}`]:id}
                    //map1.set(Number(res[0]),true);
                    
                     
                }, {new:true}).then(res=>{

                    for(var i=0;i<res2.length;i++){
                        Calender.findOneAndUpdate({date:date},{
                            $push: {[`a${temp2}`]:res2[i]}
                            //map1.set(Number(res[0]),true);
                             
                        }).then(
                            res
                            )
                    }
                    res2.push(id)
                    const newAppointment = new Appointment({
                        name: name,
                        email: email,
                        phone: phone,
                        slot_date: date,
                        slot_time: time,
                        slot_duration: duration,
                        venue: venue,
                        title: title,
                        empID:id,
                        isApproved:true,
                        involvedExecs:res2
                      });
                      newAppointment.save().then(( savedUser) => {
                        console.log(savedUser)
                        User.findOne({ empID: id })
                        .then((res) => {
                          //console.log(res);
                          res.appointments.push(savedUser._id);
                          res.save()
                            .then((res) => {
                              resp.send({message:" Added Successfully"});
                            })
                            .catch((err) => console.log(err));
                    
                          // Appointment.findOneAndUpdate(res.appointments)
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                    
                      });
                }
                    )
             
            }
 
        resp.send({data:res,bool:true,message:" Added Successfully"})}
            else
           {
            const result = findSlot(involvedExecs,id,duration,time,res)
             resp.send({data:result,bool: false,message:"NotPossible"})
        }
        }
    
      else{
        const newCalender = new Calender({
            date:date,

        })
        newCalender.save().then(res=>{
            const temp = time.split(":")
            const res2 = involvedExecs.split(",")
            for(var i=0;i<=Number(duration);i++){
                const temp2 = Number(temp[0])+i
                Calender.findOneAndUpdate({date:date},{
                    $push: {[`a${temp2}`]:id}
                    //map1.set(Number(res[0]),true);
                    
                     
                })
            }
            for(var i=0;i<=Number(duration);i++){
                const temp2 = Number(temp[0])+i
                Calender.findOneAndUpdate({date:date},{
                    $push: {[`a${temp2}`]:id}
                    //map1.set(Number(res[0]),true);
                    
                     
                },{new:true}).then(res=>{

                    for(var i=0;i<res2.length;i++){
                        Calender.findOneAndUpdate({date:date},{
                            $push: {[`a${temp2}`]:res2[i]}
                            //map1.set(Number(res[0]),true);
                             
                        }).then(
                            res
                            )
                    }
                }
                    )
            }
            res2.push(id)
            const newAppointment = new Appointment({
                name: name,
                email: email,
                phone: phone,
                slot_date: date,
                slot_time: time,
                slot_duration: duration,
                venue: venue,
                title: title,
                empID:id,
                isApproved:true,
                involvedExecs:res2
              });
              newAppointment.save().then(( savedUser) => {
                console.log(savedUser)
                User.findOne({ empID: id })
                .then((res) => {
                  //console.log(res);
                  res.appointments.push(savedUser._id);
                  res.save()
                    .then((res) => {
                      resp.send({message:" Added Successfully"});
                    })
                    .catch((err) => console.log(err));
            
                  // Appointment.findOneAndUpdate(res.appointments)
                })
                .catch((err) => {
                  console.log(err);
                })
            
              });
        })
   
              
                }
            

    })
})


  



router.get("/", (req, res, next) => {
    console.log("===== user!!======");

    if (req.user) {
        if(req.user.empID.slice(0,1)==='E')
         {  res.json({ user: req.user,bossData:null,sec:false })}
           else{
                User.findOne({secID:req.user.empID}).then(data=>{
                        res.json({user:req.user, bossData:data, sec:true})
                })
           }
    } else {
      res.json({ user: null });
    }
  });
  router.post("/:id/reschedule",(req,res)=>{
    const {date, time, duration, venue} = req.body 
    //console.log("hahahaha")
    //console.log();
    
    Appointment.findOneAndUpdate({_id:req.params.id},req.user.empID.slice(0,1)==='E'?{
    
        slot_date: date,
        slot_time: time,
        slot_duration: duration,
        venue: venue,
    }:{slot_date: date,
        slot_time: time,
        slot_duration: duration,
        venue: venue,
        isApproved:false}).then(data=>{
        //console.log(req.params.id)
        console.log("reschedule")
        //console.log(data);
        res.json(data.empID)
    }
  )})
 router.post("/:id/approve",(req,resp)=>{
    Appointment.findOneAndUpdate({_id:req.params.id},{
        isApproved:true
    }).then(res=>{
        resp.send(res)
    }).catch(err=>console.log(err))
 })
  router.get("/:id/getAppointments",(req,resp)=>{
    Appointment.find({involvedExecs:{"$in" : [`${req.params.id}`]}}).then((res)=>{
        
        resp.send({data:res,currUser:req.user.empID});
    }).catch(err=>{
        resp.send(err)
    })
  })

module.exports = router;
