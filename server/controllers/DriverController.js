const { Booking, Cab, User } = require('../models');

module.exports.acceptBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                if (booking.acceptedBy) return res.render('404', { msg: 'Booking Already Accepted By SomeOne!' });
                await Booking.updateOne({ _id: req.body.BookingID }, { $set: { acceptedBy: user._id, Status: 'Accepted' } });
                booking = await Booking.findById(req.body.BookingID);
                let driver = await User.findById(user._id);
                let token = req.query.token;
                res.render('driverdashboard', { token: token, activeBooking: booking, driver: driver });
            }
            else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports.activateBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                if (req.body.BookingOTP != booking.Otp) return res.render('404', { msg: 'Booking OTP IS Not Valid!' });
                if (booking.Status == "Canceled") return res.render('404', { msg: 'Sorry This Booking Is Canceled!' });
                await Booking.updateOne({ _id: req.body.BookingID }, { $set: { Status: 'Active' } });
                booking = await Booking.findById(req.body.BookingID);
                let token = req.query.token;
                res.render('trackBookingDriver', { token: token, booking: booking });
            }
            else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports.cancelBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                if (booking.Status == "Completed") return res.render('404', { msg: 'Booking Already Completed!' });
                if (booking.Status == "Active") return res.render('404', { msg: 'Cannot Cancel Booking Once Activated!' });
                await Booking.updateOne({ _id: req.body.BookingID }, { $set: { Status: 'Canceled' } });
                await User.updateOne({ _id: user._id }, { $set: { canAccept: true } });
                let token = req.query.token;
                user = await User.findById(user._id);
                res.render('driverdashboard', { driver: user, token: token })
            }
            else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    } catch (err) {
        throw err
    }
};

module.exports.completeBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                if (booking.Status == "Completed") return res.render('404', { msg: 'Booking Already Completed!' });
                await Booking.updateOne({ _id: req.body.BookingID }, { $set: { Status: 'Completed' } });
                await User.updateOne({ _id: user._id }, { $set: { canAccept: true } });
                await User.updateOne({ _id: booking.customerID }, { $set: { canBook: true } });
                let token = req.query.token;
                user = await User.findById(user._id);
                res.render('driverdashboard', { driver: user, token: token })
            }
            else {
                res.render('404', { msg: 'Booking Not Found!' });
            }
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    } catch (err) {
        throw err
    }
};


module.exports.trackBooking = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            if (req.body.BookingID) {
                let booking = await Booking.findById(req.body.BookingID);
                let token = req.query.token;
                res.render('trackBookingDriver', {
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
};

module.exports.findBookings = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            let cab = await Cab.findOne({
                ownerID: user._id
            });
            let Bookings = await Booking.find({ Status: 'Pending' });
            // let Bookings = await Booking.aggregate([
            //     {
            //         $geoNear: {
            //             key:'pickupAddressLocation.coordinates',
            //             near: user.Location.coordinates,
            //             query: { Status: "Pending", cabType: cab.Type },
            //             minDistance: 0,
            //             maxDistance: 5000,
            //             distanceField: 'distance',
            //             distanceMultiplier: 0.001,
            //             spherical: true
            //         }
            //     }, { $limit: 5 }
            // ])
            let token = req.query.token
            res.render("NearByBookings", { Bookings: Bookings, token: token })
        }
    } catch (err) {
        throw ErrorEvent;
    }
};

module.exports.BookingsRecord = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            let Bookings = await Booking.find({
                acceptedBy: user._id,
                Status: { $in: ["Completed", "Canceled"] }
            });
            let token = req.query.token;
            res.render("BookingsRecordDriver", { Bookings: Bookings, token: token });
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    } catch (err) {
        throw err
    }
};

module.exports.Profile = async (req, res) => {
    try {
        let user = req.loggedUser;
        let token = req.query.token;
        let profile = await User.findById(user._id);
        res.render("driverProfile", { profile: profile, token: token });
    } catch (err) {
        throw err
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        let user = req.loggedUser;
        await User.updateOne({ _id: user._id }, { $set: req.body });
        user = await User.findById(user._id);
        let token = req.query.token;
        let cab = Cab.findOne({
            ownerID: user._id
        })
        res.render("driverdashboard", {
            driver: user,
            cab: cab,
            token: token
        });
    } catch (err) {
        throw err
    }
};

module.exports.driverdashboard = async (req, res) => {
    try {
        let user = req.loggedUser;
        let token = req.query.token;
        let driver = await User.findById(user._id);
        let activeBooking = await Booking.findOne({
            acceptedBy: user._id,
            Status: { $in: ["Accepted", "Active"] }
        });

        res.render("driverdashboard", {
            driver: driver,
            activeBooking: activeBooking,
            token: token
        });
    } catch (err) {
        throw err;
    }
}


module.exports.registerCab = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (user.Role == 'Driver') {
            let cab = await new Cab({
                ownerID: user._id,
                Name: req.body.Name,
                Company: req.body.Company,
                Model: req.body.Model,
                NumberPlate: req.body.NumberPlate,
                Capacity: req.body.Capacity,
                Type: req.body.Type,
                Color: req.body.Color,
            }).save();
            user = await User.findById(user._id);
            let token = req.query.token;
            res.render('driverdashboard', {
                driver: user,
                cab: cab,
                token: token
            })
        }
        else {
            res.render('404', { msg: 'Some Error Occur!' });
        }
    }
    catch (err) {
        throw err;
    }
}
