function generateStats(res){
    for (const data in res) {
        console.log(`${data}: ${object[data]}`);
      }

}
module.exports = {generateStats}