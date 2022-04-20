const jwt = require('jsonwebtoken');

var loginWithToken = async (req, res, next) => {
    try{
        let Bearertoken = await req.header('Authorization');
        let token = Bearertoken.slice(7);
        let data = jwt.verify(token, process.env.secretkey);
        req.loggedUser = data.user;
        next()
    }catch(err){
        res.send(err + '\n Plz Login Again');
    }

}

module.exports = loginWithToken;