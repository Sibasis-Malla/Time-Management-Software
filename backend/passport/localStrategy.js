const {User} = require('../database/models/user')
const LocalStrategy = require('passport-local').Strategy


const strategy = new LocalStrategy(
	{
		usernameField: 'empID',
		passwordField:'password' // not necessary, DEFAULT
	},
	function(empID, password, done) {
		//console.log("We are in LocalStrategy")
		User.findOne({ empID: String(empID) }).then((user) => {
			console.log(user)
			return done(null,user)
			// if (err) {
			// 	// console.log("err1")
			// 	// console.log(err)
			// 	return done(err)
			// }
			// if (!user) {
			// 	return done(null, false, { message: 'Incorrect empID' })
			// }
			// if (!user.checkPassword(password)) {
			// 	return done(null, false, { message: 'Incorrect password' })
			// }
			// return done(null, user)
		}).catch(err=>{
			return done(err)
		})
	}
)

module.exports = strategy