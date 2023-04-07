const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slot_time: String,
  slot_date: Date,
  slot_duration: String,
  venue: String,
  title: String,
  created_at: Date,

});

const Appointment = new mongoose.model('Appointment', appointmentSchema);
// Define userSchema
const userSchema = new Schema({

	name: { type: String, unique: false, required: false },
	email: { type: String, unique: false, required: false },
	empID: { type: String, unique: true, required: false },
	secID:{ type: String, unique: true, required: false },
	password: { type: String, unique: false, required: false },
	appointments: [appointmentSchema]

})


// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User  = new mongoose.model("User", userSchema);

module.exports = {User, Appointment}