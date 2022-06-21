const express = require('express');
const router = express.Router();
const user = require('../controllers/UserController');
const loginWithToken = require('../middelwares/authJwt');

router.get('/NewBooking', loginWithToken, user.NewBooking);
router.get('/userdashboard',loginWithToken,user.userdashboard);
router.get('/Profile', loginWithToken, user.Profile);
router.post('/updateProfile', loginWithToken, user.updateProfile);
router.get('/BookingsRecord', loginWithToken, user.BookingsRecord);
router.post('/cancelBooking', loginWithToken, user.cancelBooking);
router.post('/trackBooking', loginWithToken, user.trackBooking);
router.post('/registerBooking', loginWithToken,user.registerBooking);
module.exports = router;