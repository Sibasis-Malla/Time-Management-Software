function generateStats(data,Employee){
  var result=[]
  for( var i=0;i<Employee.length;i++){
    result.push({empID:Employee[i],WorkHours:0,meetingNum:0})
  }
  console.log(data.length)
 data.map(appt=>{
  var temp = appt.involvedExecs 
  // console.log(temp)
  for(var j=0;j<temp.length;j++){
    var index = result.findIndex(emp=>emp.empID===temp[j])
    // console.log(index)
    if(index>-1){
      // console.log(index)
      //  console.log(result[index])
      result[index].WorkHours = result[index].WorkHours+appt.slot_duration;
      result[index].meetingNum = result[index].meetingNum +1;
    }
  }
 
 })
 return {result}
  console.log(Employee)
     

}
module.exports = {generateStats}