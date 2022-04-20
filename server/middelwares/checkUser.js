const {User} = require('../models/User');

var checkDuplicateEmail = async (req,res,next)=>{
    try {
        let existingUserWithEmail = await User.findOne({
            email:req.body.email
        })
    
        if(existingUserWithEmail){
            res.send("User Already Exits with this email!");
        }
        else{
        next();
        }
    } catch (err) {
            res.status(400).send(err);
    }
}

module.exports = checkDuplicateEmail