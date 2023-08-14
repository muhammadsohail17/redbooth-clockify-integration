// import connectDB from "@/data/db";
// import { registerUser } from "@/data/dataModel";
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//     try {
//         // await connectDB(); // Connect to the database

//         const { password, confirmPassword, emailForReset } = req.body; // Extract password, confirmPassword, and emailForReset from the request body
//         console.log(password, confirmPassword);

//         if (password != confirmPassword) { // Check if the password and confirmPassword match
//             return res.status(200).json({
//                 status: 0,
//                 message: "Password and confirm password do not match!"
//             });
//         } else {
//             // Generate a salt and hash the password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             const user = await registerUser.findOne({ email: emailForReset }); // Find the user with the given email

//             user.password = hashedPassword; // Set the user's password to the hashed password
//             await user.save(); // Save the updated user details

//             return res.status(200).json({
//                 status: 1,
//                 message: "Password reset successful!"
//             });
//         }
//     } catch (error) {
//         console.log(error); // Log any errors that occur
//     }
// }
