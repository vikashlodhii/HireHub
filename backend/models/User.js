const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["jobseeker", "recruiter"],
    required: true
  },

  // Job Seeker Fields
  skills: String,
  education: String,
  experience: String,
  resume: String,

  // Recruiter Fields
  companyName: String,
  companyDescription: String,
  location: String,
  website: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
