const {Cab} = require('../models');

var checkCabDetails = async(req,res,next)=>{
    try {
        let cabexistwithNumPlate = await Cab.findOne({NumberPlate:req.body.NumberPlate});
        if(cabexistwithNumPlate){
            res.render('404',{msg:'Cab Already Registered With This Details'})
        }
        else{
            next()
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {checkCabDetails}