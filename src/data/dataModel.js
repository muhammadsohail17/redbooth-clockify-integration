import { Schema, model, models } from "mongoose";

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

// Create the User model
const User = models.User || model("User", userSchema);

// Create the Projects model
const Project = models.Project || model("Project", projectSchema);

// Create the Logging model
const Logging = models.Logging || model("Logging", loggingSchema);

export { User, Project, Logging };
