'use strict';
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const encryptedPassword = '4a50e5ee3ce2d73b';

//const encryptedPassword = crypt.encrypt('5A3Cbd44'); 'SMTP',
const transporter = nodemailer.createTransport({
    //service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'german.isaev@gmail.com',
        pass: crypt.decrypt(encryptedPassword),
    },
});

module.exports = function sendEmail(to, subject, message) {

    var a = Math.floor(100000 + Math.random() * 900000);
    a = String(a);
    a = a.substring(0, 4);
    //localStorage.setItem('CODE', a);

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <h3>Code: ${a}</h3>
        <p>${message}</p>
    `;

    const mailOptions = {
        from: 'thisdavejdemo@gmail.com',
        to: to,
        subject: subject,
        html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Message sent: ${info.response}`);
        }
    });
};