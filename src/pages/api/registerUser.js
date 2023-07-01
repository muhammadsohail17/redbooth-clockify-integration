import { registerUser } from "../../data/dataModel"
import connectDB from "../../data/db"
import bcrypt from "bcrypt";



export default async function handler(req, res) {

    try {
        await connectDB()
    } catch (err) {
        console.log(err)
    }
    try {

        const { fullname, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({
                error: "Password and confirm password do not match.",
            });

        }


        const existingUser = await registerUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "You already have an account!"
            })

        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        var newUser = new registerUser({
            fullname,
            email,
            password: hashedPassword
        });
        const result = await newUser.save();
        res.json({
            user: newUser,
            message: "Registered Successfully!"
        });

    } catch (err) {
        console.log(err);
        return err;
    }

}