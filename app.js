'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const exphds = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//view engine setup
app.engine('handlebars', exphds);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'views'))); 
 
//app.use('/api', api); // Set our api routes 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
}); //Catch all other routes and return the index file

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/myaction', function(req, res) {
    //res.send('You sent the name "' + req.body.name + '".');
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);

    var html = "<h3>Thank you for signing up for HTS Active Alert app. </h3><p>Your username and temporary password are:<p>"+"<p style='margin-left:8px;'>Email:" + email + "</p><p style='margin-left:8px;'>Password:" + password 
      + "</p><p>Please change your password at your earliest convenience for security purposes. You can do this by selecting 'Forgot Password' from the sign in screen and entering your email into the recovery field.</p><br>"
      + "Thanks.";
   
   const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
      to: email,
      from: 'no-reply@htsactivealertsystems.com',
      fromname:'noreply',
      subject: 'Thank you for signing up.',
      text:'here',
      html: html
    };
    sgMail.send(msg, (error, info)=>{
      if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', 'Success');
    });

  });
app.listen(process.env.PORT || 8000,() =>{ console.log('just listening in anyport........')});
