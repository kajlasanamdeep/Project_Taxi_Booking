const { User } = require('../models');

var checkDuplicateEmail = async (req, res, next) => {
    try {
        let existingUserWithEmail = await User.findOne({
            email: req.body.email
        })

        if (existingUserWithEmail) {
            res.render('404', { msg: "User Already Exits with this email!" });
        }
        else {
            next()
        }
    } catch (err) {
        throw err;
    }
}

module.exports = checkDuplicateEmail