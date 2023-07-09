import connectDB from "@/data/db";
import { registerUser } from "@/data/dataModel";
import bcrypt from "bcrypt";


export default async function handler(req, res) {
    try {
        await connectDB()

        const { password, confirmPassword, emailForReset } = req.body;
        console.log(password, confirmPassword)

        if (password != confirmPassword) {
            return res.status(200).json({
                status: 0,
                message: "Password and confirm password do not match!"
            });
        } else {

            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await registerUser.findOne({ email: emailForReset })

            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({
                status: 1,
                message: "Password reset successful!"
            })
        }
    } catch (error) {
        console.log(error);

    }
}