const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { User, Booking, Cab } = require('../models');
const { forgotMail } = require('../services/EmailService');

module.exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        await User.updateOne({ _id: user._id }, { $set: { userLocation: { type: "Point", coordinates: [req.body.latitude, req.body.longitude] } } });
        user = await User.findById(user._id);
        let token = jwt.sign({ user: user }, "abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key", { expiresIn: "30 minutes" });

        if (user.Role == "Driver") {
            let activeBooking = await Booking.findOne({
                acceptedBy: user._id,
                Status: { $in: ["Accepted", "Active"] }
            });
            let cab = await Cab.findOne({
                ownerID: user._id
            });
            if (cab) {
                res.render("driverdashboard", {
                    driver: user,
                    cab:cab,
                    activeBooking: activeBooking,
                    token: token
                });
            }
            else{
                res.render('registerCab',{
                    token:token
                })
            }
        } else {
            let activeBooking = await Booking.findOne({
                customerID: user._id,
                Status: { $in: ["Pending", "Accepted", "Active"] }
            });

            res.render("userdashboard", {
                user: user,
                activeBooking: activeBooking,
                token: token
            });
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports.forgotPassword = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        let otp = Math.floor(Math.random() * 10000) + 54321;
        await User.updateOne({ _id: user._id }, { $set: { password: bcrypt.hashSync(otp, 10) } });
        // forgotMail(user.email,otp)
        res.redirect('/login');
    }
    catch (err) {
        throw err;
    }
};