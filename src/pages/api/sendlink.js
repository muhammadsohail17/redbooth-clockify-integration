const sgMail = require('@sendgrid/mail');
const dns = require('dns');
import { v4 as uuidv4 } from "uuid";
import { registerUser } from "../../data/dataModel";
import connectDB from "../../data/db";



export default async function handler(req, res) {
  try {
    connectDB();
    const email = req.body.email;

    const user = await registerUser.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "Please use the registered email address!",
      });
    }

    const domain = email.split("@")[1];
    const addresses = await dns.promises.resolveMx(domain);

    if (addresses.length === 0) {
      return res.status(400).json({
        error: "Invalid email address.",
      });
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const verificationLink = `http://localhost:3000/forgot-password?email=${email}&reset=1&token=${user.verificationToken}`;
    const msg = {
      to: email,
      from: "turbosohaib1234@gmail.com",
      subject: "Password retrieval for Redbooth and clockify integration",
      text: `Log in with the link below: ${verificationLink}`,
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
          <h2 style="margin-bottom: 10px; font-size: x-large;">Hey, ${user.fullname}!</h2>
          <p style="font-size: 15px; margin-bottom: 20px;">
            In order to <strong>set a new password</strong> for Redbooth and clockify integration, we need you to log in with the following link:
          </p>
          <div style="cursor: pointer;">
            <a href="${verificationLink}" style="text-decoration: none;">
              <button
                style="color: white;
                text-decoration: none;
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
                Login link
              </button>
            </a>
          </div>
        </div>`,
    };

    await sgMail.send(msg)
      .then(response => {
        console.log(response)
        return res.json({
          message: "Email sent!",
        });
      })
      .catch(error => console.log(error))


    // res.json({
    //   message: "Email sent!",
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while sending the email.",
    });
  }
}



