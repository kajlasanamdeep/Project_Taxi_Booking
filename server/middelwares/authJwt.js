const jwt = require('jsonwebtoken');

var loginWithToken = async (req, res, next) => {
    try{
        let Bearertoken = await req.header('Authorization');
        let token = Bearertoken.slice(7);
        let data = jwt.verify(token,"abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key");
        req.loggedUser = data.user;
        next()
    }catch(err){
        res.status(404).send({error:err,msg: 'Plz Login Again'});
    }

}

module.exports = loginWithToken;