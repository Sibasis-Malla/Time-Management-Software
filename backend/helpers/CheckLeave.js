const {Calender} = require('../database/models/user')
const moment = require('moment')
function markLeave(startDate,endDate,empID){
    for (var m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
      // console.log(startDate)
        // console.log(new Date(m.valueOf()));
        const date = m.format('YYYY-MM-DDTHH:mm:ss[Z]')
        // date.setHours(0,0,0,0)
         console.log(date)
        console.log(date)
        Calender.findOne({date:date}).then(res=>{
          if(res){
            for(var i=10;i<18;i++){
              Calender.findOneAndUpdate({date:date},{
    
                  $push: { [`a${i}`]: empID.id },
                
              }).then().catch(err=>console.log(err))
          
            }
          }
          else{
            const newCalender = new Calender({
              date: date,
            });
            newCalender.save().then((res) => {
              for (var i = 10; i < 18 ; i++) {
                  Calender.findOneAndUpdate(
                    { date: date},
                    {
                      $push: { [`a${i}`]: empID.id },
                    }
                  ).then(res).catch(err=>console.log(err));
              
              }
   
            });
          }
        }).then().catch(err=>console.log(err))
  
      }
    
      return
}
module.exports= {markLeave}