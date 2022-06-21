const express = require('express');
const router = express.Router();
const {checkCabDetails} = require('../middelwares/verifyCab');
const Driver = require('../controllers/DriverController');
const loginWithToken = require('../middelwares/authJwt');

router.get('/driverdashboard', loginWithToken, Driver.driverdashboard);
router.get('/FindBookings', loginWithToken, Driver.findBookings);
router.get('/BookingsRecord',loginWithToken,Driver.BookingsRecord);
router.get('/Profile',loginWithToken,Driver.Profile);
router.post('/updateProfile', loginWithToken, Driver.updateProfile);
router.post('/trackBooking', loginWithToken, Driver.trackBooking);
router.post('/registerCab', loginWithToken, checkCabDetails, Driver.registerCab);
router.post('/acceptBooking', loginWithToken, Driver.acceptBooking);
router.post('/activateBooking',loginWithToken,Driver.activateBooking);
router.post('/cancelBooking', loginWithToken, Driver.cancelBooking);
router.post('/completeBooking', loginWithToken, Driver.completeBooking);

module.exports = router;