const express = require('express');
const router = express.Router();
const {registerNewBooking} = require('../controllers/BookingController');
const loginWithToken = require('../middelwares/authJwt');

router.post('/registerNewBooking',loginWithToken,registerNewBooking);
module.exports = router;