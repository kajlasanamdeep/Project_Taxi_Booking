const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path:'./config/.env'})

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port:500,
    secure: false,
    auth:{
        user:process.env.email,
        pass:process.env.pass
    }
});

var BookingMail = (customer_email)=>{
    var mail_details ={
        from:process.env.email,
        to:customer_email,
        subject:'Booking mail!',
        text:'Thanks For Booking Cab From Us!'
    }
    transporter.sendMail(mail_details,(error, info)=>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

var registrationMail = (user_email)=>{
  var mail_details ={
      from:process.env.email,
      to:user_email,
      subject:'Registration mail!',
      text:'Thanks For Registring on Our Website!'
  }
  transporter.sendMail(mail_details,(error, info)=>{
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {BookingMail,registrationMail};