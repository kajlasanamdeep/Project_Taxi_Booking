const { User } = require('../models/User');
const bcrypt = require('bcrypt');

var verifyUserLogin = async (req, res,next) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        })
        if (user) {
            let pass = bcrypt.compareSync(req.body.password, user.password);
            if (pass) {
                next();
            }
            else {
                res.send('Password is Incorrect!');
            }
        }
        else {
            res.send('Email is Incorrect!');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = verifyUserLogin;