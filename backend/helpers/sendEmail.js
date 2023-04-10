// const emailjs = require("emailjs");
const axios = require("axios")
const moment = require('moment')
const { User } = require("../database/models/user");

function sendEmail(data) {
   
    const arr = [... new Set(data.involvedExecs)]
    for(let i=0;i<arr.length;i++){
        User.findOne({empID:arr[i]}).then(res=>{
            if(res)
        {    const templateParams={
                send_to : res.email,
                reply_to: "mallasibasis@gmail.com",
                message:JSON.stringify({
                   " Date":moment(data.slot_date).format("MMM Do YY"),
                    "purpose":data.title,
                    "Start Time":data.slot_time,
                    "Duration":`${data.slot_duration} hrs`,
                })
        
            }
            axios.post("https://api.emailjs.com/api/v1.0/email/send",{
                service_id:"service_mrd913t",
                template_id:"template_2o3mnrh",
                template_params:templateParams,
                user_id:"PVBW8JV1pYON2LcGI"
             })
                .then((res) => console.log("Email Sent")).catch(err=>console.log(err));
            
  }
            
        })
    }

}
module.exports = { sendEmail };
