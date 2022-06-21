const jwt = require('jsonwebtoken');

var loginWithToken = async (req, res, next) => {
    try {
        let token = await req.query.token;
        // let Bearertoken = await req.header('Authorization');
        // let token = Bearertoken.slice(7);
        let data = jwt.verify(token, "abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key");
        if (data) {
            req.loggedUser = data.user;
            next()
        }
        else {
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect('/login');
    }

}

module.exports = loginWithToken;