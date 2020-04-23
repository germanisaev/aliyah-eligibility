'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
//const path = require('path');
const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const encryptedPassword = '4a50e5ee3ce2d73b';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//app.use('/public', express.static(path.join(__dirname, 'public')));

const port = 3000;
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(
        '<h1 style="text-align:center">Welcome to Contact</h1>'
    );
});

/*
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
*/

app.post('/sendmail', (req, res) => {
    console.log(req.body);
    var a = Math.floor(100000 + Math.random() * 900000);
    a = String(a);
    a = a.substring(0, 4);
    localStorage.setItem('CODE', a);

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <h3>Code: ${a}</h3>
        <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'german.isaev@gmail.com',
            pass: crypt.decrypt(encryptedPassword)
        }/*, 
        tls: {
            rejectUnauthorized: false
        }*/
    });

    let mailOptions = {
        from: '"German Isaev" <german.isaev@gmail.com>',
        to: 'german.isaev@gmail.com', //req.body.to,
        subject: 'NodeJS Email Tutorial',
        text: 'That was easy!',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } 
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        //res.render('index', {msg: 'Email has been sent'});
    });
});

app.listen(port, () => console.log(`Server is running at port ${port}!`));