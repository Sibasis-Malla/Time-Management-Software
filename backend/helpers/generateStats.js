//used to generate statistics
function generateStats(data,Employee){
  var result=[]
  for( var i=0;i<Employee.length;i++){
    result.push({empID:Employee[i],WorkHours:0,meetingNum:0})
  }
  console.log(data.length)
 data.map(appt=>{
  var temp = appt.involvedExecs 

  for(var j=0;j<temp.length;j++){
    var index = result.findIndex(emp=>emp.empID===temp[j])
    
    if(index>-1){
      result[index].WorkHours = result[index].WorkHours+appt.slot_duration;
      result[index].meetingNum = result[index].meetingNum +1;
    }
  }
 
 })
 return {result}
  console.log(Employee)
     

}
module.exports = {generateStats}