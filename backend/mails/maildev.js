const nodemailer = require('nodemailer');
const asyncHandler =require('express-async-handler');

const mailConfig = asyncHandler( async (mailto,subject ,code)=>{
    const mailOptions = {
        from: process.env.MAIL_SENDER,
        to: mailto, // Change to the recipient's email address
        subject: subject,
        text: `Your code is ${code}. It will expire in 10 minutes.`,
    };

     let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
    });
    transporter.sendMail(mailOptions);
})


 module.exports={
    mailConfig
 };