import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String
});
const projectSchema = new Schema({
    name: String,
    rbProjectId: Number,
});


// Create the User model
const User = models.User || model('User', userSchema);

// Create the Projects model
const Project = models.Project || model("Project", projectSchema);

export { User, Project };