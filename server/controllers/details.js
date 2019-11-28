var Visitor = require('../models/models').Visitor;
var nodemailer = require('nodemailer');
//enter your accountsid and authtoken from your twilio account
const accountSid = 'ACxxxxxxx';
const authToken = 'Your auth token from twilio account here';
var from_number = 'Your number from which message has to be sent along with + followed by country code here';
var your_email = 'Your email id here';
var your_password = 'Your password here';

const client = require('twilio')(accountSid, authToken);


//enter email and password from which email has to be sent here
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: your_email,
      pass: your_password
    }
});



module.exports = {
    logIn: async(req, res, next) => {
        try{
            var newVisitor = null;
            var { name, email, phone, hostname, hostemail, hostphone, checkintime } = req.body;
            newVisitor = new Visitor({ name, email, phone, hostname, hostemail, hostphone, checkintime });
            await newVisitor.save();
              
            res.json(newVisitor);
            
            const text = `Hello ${hostname},

You have a visitor.
Name: ${name}
Email id: ${email}
Contact no: ${phone}
Check In Time: ${checkintime}
                            
Have a good day!
Regards.`

            var mailOptions = {
                from: your_email,
                to: hostemail,
                subject: 'You have a visitor!',
                text: text
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                }
                 else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
            var host_contact = hostphone;
            //host_contact = String(host_contact);
            host_contact = '+91' + host_contact;
            
            
            client.messages.create({
              to: host_contact,
              from: from_number,
              body: text
            }).then((message) => (console.log(message.sid)));
            
              
        }
        catch(error){
            next(error);
        }
    },
    logOut: async(req, res, next) => {
      try{
          var pervisiting = null;
          var { id, checkouttime } = req.body;
          pervisiting = await Visitor.findById(id);
          pervisiting.checkouttime = checkouttime;
          await pervisiting.save();

          res.json('Success');

          const text = `Hello ${pervisiting.name},

Details of your visit.
Name: ${pervisiting.name}
Contact no: ${pervisiting.phone}
Check In Time: ${pervisiting.checkintime}
Check Out Time: ${pervisiting.checkouttime}
Host Name: ${pervisiting.hostname}
Address Visited: http://localhost:3000/home
                            
Have a good day!
Regards.`


            var mailOptions = {
              from: your_email,
              to: pervisiting.email,
              subject: 'You visited Entry Manager!',
              text: text
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              }
              else {
                console.log('Email sent: ' + info.response);
              }
            });

            var contact = pervisiting.phone;
            //contact = String(contact);
            contact = '+91' + contact;
            
            client.messages.create({
              to: contact,
              from: from_number,
              body: text
            }).then((message) => (console.log(message.sid)));


      }
      catch(error){
        next(error);
    }
    }
}