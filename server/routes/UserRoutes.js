const express = require('express');
const router = express.Router();
const {signupUser,loginUser,uploadImage,verifyUser,getUserProfile,getBookings,acceptBooking,cancelBooking} = require('../controllers/UserController');
const {uploadUserImage} = require('../middelwares/upload');
const verifyLogin = require('../middelwares/verifyLogin');
const loginWithToken = require('../middelwares/authJwt');
const checkUser = require('../middelwares/checkUser');

router.post('/register',uploadUserImage.single('userImage'),checkUser,signupUser);
router.post('/login',verifyLogin,loginUser);
router.post('/uploadImage',uploadUserImage.single('userImage'),loginWithToken,uploadImage);
router.post('/verifyUser',loginWithToken,verifyUser);
router.get('/getProfile',loginWithToken,getUserProfile);
router.get('/getBookings',loginWithToken,getBookings);
router.post('/acceptBooking',loginWithToken,acceptBooking);
router.post('/cancelBooking',loginWithToken,cancelBooking);
module.exports = router;