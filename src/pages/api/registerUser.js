import { registerUser } from "../../data/dataModel";
import connectDB from "../../data/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
const nodemailer = require('nodemailer')
const dns = require('dns');


export default async function handler(req, res) {
    try {
        await connectDB();

        // Create a transporter for sending emails using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER, // Gmail account username from environment variables
                pass: process.env.SMTP_PASSWORD // Gmail account password from environment variables
            }
        });
        transporter.verify().then(console.log).catch(console.error);

        // Extract request body data
        const { fullname, email, password, confirmpassword } = req.body;

        // Extract domain from email address
        const domain = email.split('@')[1];

        // Resolve MX records of the domain to validate email address
        dns.resolveMx(domain, async (err, addresses) => {
            if (err || addresses.length === 0) {
                return res.status(400).json({
                    error: "Invalid email address.",
                });
            }

            // Check if the provided password and confirm password match
            if (password !== confirmpassword) {
                return res.status(400).json({
                    error: "Password and confirm password do not match.",
                });
            }

            // Check if a user with the same email already exists
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

            // Create the verification link for the email
            const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

            // Send the verification email
            transporter.sendMail({
                to: email, // Recipient's email address
                subject: "Verify Your Account, Redbooth and Clockify Integration", // Email subject
                text: `Click the button below to verify your account: ${verificationLink}`, // Plain text body
                html: `<div
                       style="background-color: white;
                       text-align: center;
                       width: 50%;
                       margin-left: 23%;
                       margin-top: 5%;
                       border-radius: 8px;
                       padding: 20px;
                       box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
                     >
                       <h2 style="margin-bottom: 10px; font-size: x-large;">Hey, ${fullname}!</h2>
                       <p style="font-size: 15px; margin-bottom: 20px;">
                       Click the button below to <strong>verify</strong> your account and proceed to login:
                       </p>
                       <div>
                         <a href="${verificationLink}" style="text-decoration: none;">
                           <button
                             style="color: white;
                             text-decoration: none;
                             cursor: pointer;
                             width: 70%;
                             height: 64px;
                             background-color: #6579e3;
                             border-radius: 8px;
                             display: inline-block;
                             font-family: Helvetica, sans-serif;
                             font-size: 16px;
                             line-height: 64px;
                             text-align: center;
                             border: 1px solid #6579e3;"
                           >
                             Verify
                           </button>
                         </a>
                       </div>
                     </div>`, // HTML body
            }).then(async (info) => {
                console.log({ info });
                await newUser.save(); // Save the user's details to the database
                res.json({
                    message: "Registration Successful! Please check your email to verify your account.",
                });
            }).catch(error => {
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

