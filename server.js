// server.js

/*
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xxx@xx.com',
            pass: 'xxxx'
        }
    });

    let mailOptions = {
        from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});

app.listen(port, function () {
    console.log('Server is running at port: ', port);
});
*/

var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
app.options('*', cors());
var http = require("http");
var bodyParser = require("body-parser");
var PORT = 5000;
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//files configure
app.use(express.static(__dirname + "/views"));
//body parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
// parse application/json
app.use(bodyParser.json({ limit: "50mb", extended: true }))
// custom routes
const api = require("./server/routes/api");
// Set our api routes
app.use("/api", api);
// Handle 404
app.use(function (req, res) {
    //res.send("404: Page not Found", 404);
    res.status(404).send({ status: 404, message: "404 Not Found", type: "client" });
});
// Handle 500
app.use(function (error, req, res, next) {
    res.status(500).send({ status: 500, message: "internal error", type: "internal" });
});
//listen
var httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));

require('./router/index')(app);