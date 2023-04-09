//const moment = require("moment");
function checkAppointment(NewTime,NewDuration, res,involvedExecs,id) {
    const temp = NewTime.split(":")
    const res2 = involvedExecs.split(",")
    res2.push(id)

    // console.log(temp[0]);
            for(var i=0;i<=Number(NewDuration);i++){
                const temp2 = Number(temp[0])+i
                // console.log(temp2)
                // console.log("hehehe",res.a10)
                const temp3 = String(`a${temp2}`)
                if(res[temp3].some(r=> res2.indexOf(r) >= 0)){
                    return false
                }
                
            
}
   
 return true
}

function findSlot(involvedExecs,id,NewDuration,NewTime,res){
    const temp = NewTime.split(":")
    const res2 = involvedExecs.split(",")
    const dur = Number(NewDuration);
    store = [];
    res2.push(id)
    for(var i=10;i<18;i++){
        var temp2  = String(`a${i}`);
        if(!res[temp2].some(r=>res2.indexOf(r)>=0)){
            store.push(i);
        }
    }
  // console.log(store)

    for(var i=0;i<store.length;i++){
        var count = 0;
        for(var j=i;j<store.length;j++){
            if(j+1<store.length && store[j]+1===store[j+1]){
                count++;
                
            }
            else{
                break;
            }
            if(count=== dur+1){
                return {start :store[i],end:store[j]}
            }
        }
     
    }




}
module.exports = {checkAppointment,findSlot}
