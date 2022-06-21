const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registrationMail } = require('../services/EmailService');
const { User } = require('../models');

module.exports.register = async (req, res) => {
    try {
        let user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            Role: req.body.Role,
            Location: {
                type: "Point",
                coordinates: [req.body.latitude || 0, req.body.longitude || 0]
            }
        }).save()

        // registrationMail(user.email);

        let token = jwt.sign({ user: user }, "abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key", { expiresIn: "30 minutes" });
        if (user.Role === "User") {
            res.render("userdashboard", {
                user: user,
                token: token
            });
        }
        else{
            res.render('registerCab',{
                token:token
            })
        }
    }
    catch (err) {
        throw err;
    }
};
