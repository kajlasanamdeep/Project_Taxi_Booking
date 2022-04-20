const express = require('express');
const router = express.Router();
const upload = require('../middelwares/upload');
const {checkCabDetails} = require('../middelwares/verifyCab');
const {registernewCab,getAllCabs,updateCabOwner} = require('../controllers/CabController');
const loginWithToken = require('../middelwares/authJwt');

router.post('/registerNewCab',upload.single('cabImage'),loginWithToken,checkCabDetails,registernewCab);
router.post('/updateCabOwner',loginWithToken,updateCabOwner);
router.get('/getAllCabs',getAllCabs);
module.exports = router;