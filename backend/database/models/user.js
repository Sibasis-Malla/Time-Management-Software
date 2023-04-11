//This module represents the database Schema for storing data into MongoDB

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

// Appointment Schema is used to Store various Appointments scheduled by the execs
const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slot_time: String,
  slot_date: Date,
  slot_duration: Number,
  venue: String,
  title: String,
  empID: String,
  created_at: Date,
  isApproved: { type: Boolean, default: false },
  involvedExecs: [{ type: String }],
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);
// Define userSchema
//User schema stores the data about the Executives and Secreatires
const userSchema = new Schema({
  name: { type: String, unique: false, required: false },
  email: { type: String, unique: false, required: false },
  empID: { type: String, unique: true, required: false },
  secID: { type: String, unique: true, required: false },
  password: { type: String, unique: false, required: false },
  appointments: [appointmentSchema],
});

//Calender Schema helps in storing status of the executives across the office Hours on a certain Date
const calenderSchema = new Schema({
  id: ObjectId,
  date: { type: Date },
  a10: [{ type: String }],
  a11: [{ type: String }],
  a12: [{ type: String }],
  a13: [{ type: String }],
  a14: [{ type: String }],
  a15: [{ type: String }],
  a16: [{ type: String }],
  a17: [{ type: String }],
});

const Calender = new mongoose.model("Calender", calenderSchema);

// Helps in checking validity and hashing passwords
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre("save", function (next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = { User, Appointment, Calender };
