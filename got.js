'use strict';
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const encryptedPassword = '4a50e5ee3ce2d73b';

var tarnsporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'german.isaev@gmail.com',
        pass: crypt.decrypt(encryptedPassword)
    }
});

var mailOptions = {
    from: 'german.isaev@gmail.com', // sender address
    to: 'german.isaev@gmail.com', // list of receivers i.e [sneder1, sender2, sender3, ....]
    subject: 'NodeJS Email Tutorial', // Subject line
    text: 'Hello world !', // plain text body
    html: '<b>Hello world !</b>' // html body
};

tarnsporter.sendMail(mailOptions, function (err, info) {
    if (err) {
        console.log('error : ' + err);
        return;
    }
    console.log('mail sent successfully');
});
/*
nodemailer.createTestAccount((err, account) => {

    //Step: 1 Create transporter
    let smtpConfig = {
        //service: 'gmail',
        //host: 'smtp.ethereal.email',
        //port: 587,
        //secure: false, // true for 465, false for other ports. For TLS use port 465
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: ENV.CLIENTID,
            clientSecret: ENV.CLIENTSECRET
            //user: 'german.isaev@gmail.com',
            //pass: '5A3Cbd44'
            //user: account.user, // generated ethereal user
            //pass: account.pass // generated ethereal password
        }
    };

    let transporter = nodemailer.createTransport(smtpConfig);

    //Step: 2 Setup message options
    let mailOptions = {
        from: '"Fred Foo ??" <foo@example.com>', // sender address
        to: 'german.isaev@gmail.com', // list of receivers i.e [sneder1, sender2, sender3, ....]
        subject: 'NodeJS Email Tutorial', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
        auth: {
            user: 'german/isaev@gmail.com',
            refreshToken: ENV.REFRESHTOKEN,
            accessToken: ENV.ACCESSTOKEN
        }
    };

    //Step: 3 Send mail using created transport
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
*/
/*
function sendMail(to, subject, message) {
    var smtpConfig = {
        //service: 'Gmail', 108.177.15.109
        host: '108.177.15.109',//'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'german.isaev@gmail.com',
            pass: '5A3Cbd44'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var mailOptions = {
        from: '"Sender Name" <sender@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: 'NodeJS Email Tutorial', // plaintext body
        html: message // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        else {
            return console.log(info.response);
        }
    });
}

var message = '<p>This is HTML content</p>';
sendMail('german.isaev@gmail.com', 'Welcome to ExpertPHP.in', message);
*/
