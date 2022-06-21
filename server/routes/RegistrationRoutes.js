const express = require('express');
const router = express.Router();
const { register } = require('../controllers/RegistationController');
const checkUser = require('../middelwares/checkUser');

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', checkUser, register);
module.exports = router;