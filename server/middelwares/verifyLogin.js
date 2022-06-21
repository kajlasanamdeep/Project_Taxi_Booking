const { User } = require('../models');
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
                res.render('404',{msg:'Password Is Incorrect!'});
            }
        }
        else {
            res.render('404', { msg: 'Login Details Are Incorrect!' });
        }
    } catch (err) {
        throw err;
    }
};

module.exports = verifyUserLogin;