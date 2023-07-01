import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";


const userSchema = new Schema({
  name: String,
  email: String,
});
const projectSchema = new Schema({
  name: String,
  rbProjectId: Number,
});

const loggingSchema = new Schema({
  rbCommentId: Number,
  rbUserId: Number,
  rbTaskId: Number,
  minutes: Number,
  timeTrackingOn: String,
  createdAt: Number,
});

const registerUserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
})


// Register Users!
const registerUser = mongoose.models.registerUsers || mongoose.model('registerUsers', registerUserSchema);

// Create the User model
const User = models.User || model("User", userSchema);

// Create the Projects model
const Project = models.Project || model("Project", projectSchema);

// Create the Logging model
const Logging = models.Logging || model("Logging", loggingSchema);

export { User, Project, Logging, registerUser };
