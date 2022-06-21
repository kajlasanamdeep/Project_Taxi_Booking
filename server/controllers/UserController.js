const { default: mongoose } = require('mongoose');
const { Booking, User } = require('../models');
const { BookingMail } = require('../services/EmailService');

module.exports.registerBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        user = await User.findById(user._id);
        if (user.canBook) {
            let otp = Math.floor(Math.random() * 10000) + 654321;
            let booking = await new Booking({
                Otp: otp,
                customerID: user._id,
                createdAt: new Date(),
                customerName: user.firstName,
                cabType: req.body.cabType,
                totalDistance: req.body.totalDistance,
                totalFare: req.body.totalFare,
                pickupAddressName: req.body.pickupAddressName,
                pickupAddressLocation: { type: "Point", coordinates: [req.body.destinationLatitude, req.body.destinationLongitude] },
                destinationAddressName: req.body.destinationAddressName,
                destinationAddressLocation: { type: "Point", coordinates: [req.body.pickupLatitude, req.body.pickupLongitude] }
            }).save()
            await User.updateOne({ _id: user._id }, { $set: { canBook: false } });
            // BookingMail(user.email, otp);
            let token = req.query.token;
            res.render("userdashboard", {
                user: user,
                activeBooking: booking,
                token: token
            });
        }
        else {
            res.render('404', { msg: "You have Booking Already In Progress!" });
        }
    } catch (err) {
        throw err;
    }
};

module.exports.cancelBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'User') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                if (booking.Status == "Completed") return res.render('404', { msg: 'Booking Already Completed!' });
                if (booking.Status == "Active") return res.render('404', { msg: 'Cannot Cancel Booking Once Activated!' });
                await Booking.updateOne({ _id: req.body.BookingID }, { $set: { Status: 'Canceled' } });
                await User.updateOne({ _id: user._id }, { $set: { canBook: true } });
                let token = req.query.token;
                user = await User.findById(user._id);
                res.render('userdashboard', { user: user, token: token })
            }
            else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        }
        else {
            res.render('404');
        }
    } catch (err) {
        throw err
    }
};

module.exports.trackBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'User') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                let token = req.query.token;
                res.render('trackBooking', {
                    booking: booking,
                    token: token
                })
            } else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        } else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    } catch (err) {
        throw err;
    }
}

module.exports.BookingsRecord = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'User') {
            let Bookings = await Booking.find({
                customerID: mongoose.Types.ObjectId(user._id),
                Status: { $in: ["Completed", "Canceled"] }
            })
            let token = req.query.token;
            res.render("BookingsRecord", { Bookings: Bookings, token: token });
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    } catch (err) {
        throw err
    }
};
module.exports.NewBooking = async (req, res) => {
    try {
        let token = req.query.token;
        res.render('NewBooking', { token: token })
    } catch (err) {
        throw err;
    }
}
module.exports.Profile = async (req, res) => {
    try {
        let user = req.loggedUser;
        let token = req.query.token;
        let profile = await User.findById(user._id);
        res.render("profile", { profile: profile, token: token });
    } catch (err) {
        throw err
    }
};

module.exports.userdashboard = async (req, res) => {
    try {
        let user = req.loggedUser;
        let token = req.query.token;
        user = await User.findById(user._id);
        let activeBooking = await Booking.findOne({
            customerID: user._id,
            Status: { $in: ["Pending", "Accepted", "Active"] }
        });

        res.render("userdashboard", {
            user: user,
            activeBooking: activeBooking,
            token: token
        });
    } catch (err) {
        throw err;
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        let user = req.loggedUser;
        await User.updateOne({ _id: user._id }, { $set: req.body });
        user = await User.findById(user._id);
        let token = req.query.token;
        res.render("userdashboard", {
            user: user,
            token: token
        });
    } catch (err) {
        throw err
    }
};
