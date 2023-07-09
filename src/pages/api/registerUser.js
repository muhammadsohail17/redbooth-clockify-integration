import { registerUser } from "../../data/dataModel";
import connectDB from "../../data/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const sgMail = require('@sendgrid/mail');
const dns = require('dns');


export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (err) {
        console.log(err);
    }
    try {
        const { fullname, email, password, confirmpassword } = req.body;

        const domain = email.split('@')[1];
        dns.resolveMx(domain, async (err, addresses) => {
            if (err || addresses.length === 0) {
                return res.status(400).json({
                    error: "Invalid email address.",
                });
            }


            if (password !== confirmpassword) {
                return res.status(400).json({
                    error: "Password and confirm password do not match.",
                });
            }


            const existingUser = await registerUser.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    error: "You already have an account!",
                });
            }


            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate a verification token using UUID
            const verificationToken = uuidv4();


            // Save the user's details and verification token to the database
            const newUser = new registerUser({
                fullname,
                email,
                password: hashedPassword,
                verificationToken,
                isVerified: false,
            });


            // Send the verification email with the verification link
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
            const msg = {
                to: email,
                from: 'turbosohaib1234@gmail.com',
                subject: 'Verify Your Account',
                text: `Click the button below to verify your account: ${verificationLink}`,
                html: `<div 
            style="background-color: #E5E7E9;
            text-align: center;
            width: 50%;
            margin-left: 23%;
            margin-top: 5%;  
            border-radius: 8px; 
            padding: 20px;   
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
            <h2 style="margin-bottom: 10px;">Redbooth and clockify integration</h2>
            <p style="font-size: 18px; margin-bottom: 20px;">Click the button below to verify your account and proceed to login:</p>
            <div style="cursor: pointer;"><a href="${verificationLink}" style="text-decoration: none;">
            <button style="background-color: blueviolet; color: white; padding: 12px 24px; border: none; border-radius: 4px; font-size: 16px; font-weight: bold; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.3s ease;">
                Verify
            </button>
        </a></div>
        </div>`};

            await sgMail
                .send(msg)
                .then(async (response) => {
                    await newUser.save();
                    res.json({
                        message: "Registration Successful! Please check your email to verify your account.",
                    });
                })
                .catch(error => {
                    console.log("error", error);
                    if (error) {
                        return res.status(400).json({
                            error: "Invalid email address.",
                        });
                    }
                });

        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
