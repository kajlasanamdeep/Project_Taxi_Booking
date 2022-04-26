const Booking = require('../models/Booking');
const { BookingMail } = require('../services/EmailService');

var registerNewBooking = async(req, res) => {
    try {
        let user = req.loggedUser;
        let booking = await new Booking({
            customerName: req.body.customerName,
            customerID: user._id,
            bookingDate: req.body.bookingDate,
            cabType: req.body.cabType,
            totalPassengers: req.body.totalPassengers,
            pickupAddressName: req.body.pickupAddress,
            pickupAddressLocation:{type:"Point",coordinates:[-73.856077,40.84846]},
            destinationAddressName: req.body.destinationAddress,
            destinationAddressLocation:{type:"Point",coordinates:[-73.856077,40.84848]}
        }).save()
        // BookingMail(user.email);
        res.send(booking);
    }catch (err) {
        res.status(400).send(err);
    }
}
module.exports = { registerNewBooking }