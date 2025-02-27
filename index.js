const express = require('express');
const app = express();
const path = require("path")
const PORT = process.env.PORT || 3000;
var nodemailer = require('nodemailer');
var http = require('http');
var url = require('url');
require('dotenv').config()


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname,"public", './index.html'));
})

app.post("/sendemail", (req, res)=>{

    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'4005311@gmail.com',
            pass: process.env.EMAILPASSWORD
       }
    });

    var mailOptionsInternal = {
        from:'Collapse Data Backup',
        to: 'sales@collapsedata.com',
        subject: req.body.email,
        text:'Just subscribed'
    }

    // var mailOptionsExternal = {
    //     from:'Collapse Data Backup',
    //     to: req.body.email,
    //     subject: 'Collapse Data Backup',
    //     text:'Thanks for subscribing, one of our team members will get back to you shortly\
    //     Thanks\
    //     Collapse Data Team'
    // }

    transporter.sendMail(mailOptionsInternal, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })

    // transporter.sendMail(mailOptionsExternal, function(error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response)
    //     }
    // })
    
    res.redirect('/#top');
})

// app.get("/comingsoon", (req, res)=>{
//     res.sendFile(path.join(__dirname,'./public/pages/index.html'));
// })

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!!!!!`);
    console.log(`App running on port ${PORT}!!!!!`);
});