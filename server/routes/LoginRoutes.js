const express = require('express');
const router = express.Router();
const { login } = require('../controllers/LoginController');
const verifyLogin = require('../middelwares/verifyLogin');

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', verifyLogin, login);
module.exports = router;