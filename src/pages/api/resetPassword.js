import connectDB from "@/data/db";
import { registerUser } from "@/data/dataModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    const { password, confirmPassword, emailForReset } = req.body;

    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 0,
        message: "Password and confirm password do not match!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Find the user with the given email
      const user = await registerUser.findOne({ email: emailForReset });

      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found.",
        });
      }

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        status: 1,
        message: "Password reset successful!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "An error occurred.",
    });
  }
}
