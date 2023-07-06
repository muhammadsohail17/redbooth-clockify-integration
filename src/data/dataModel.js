import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = models.User || model("User", userSchema);

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

const taskSchema = new Schema({
  rbTaskId: Number,
  rbProjectId: Number,
  name: String,
  updatedAt: Number
});

// Create the User model

// Create the Projects model
const Task = models.Task || model("Task", taskSchema);

// Create the Tasks model
const Project = models.Project || model("Project", projectSchema);

// Create the Logging model
const Logging = models.Logging || model("Logging", loggingSchema);
export { User, Task, Project, Logging };
