const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path:'../config/.env'})

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

var BookingMail = (customer_email,otp)=>{
    var mail_details = {
        from:process.env.email,
        to:customer_email,
        subject:'Booking mail!',
        text:'Thanks For Booking Cab From Us! \n Your Booking OTP Is '+ otp
    }
    transporter.sendMail(mail_details,(error, info)=>{
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

var forgotMail = (customer_email,password) => {
  var mail_details = {
    from: process.env.email,
    to: customer_email,
    subject: 'Forgot Password mail!',
    text: 'Your Password For Login Is '+password+'Don`t share it with anyone'
  }
  transporter.sendMail(mail_details, (error, info) => {
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

module.exports = {BookingMail,registrationMail,forgotMail};