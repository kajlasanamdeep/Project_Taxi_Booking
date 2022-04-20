const {Cab} = require('../models/Cab');

var checkCabDetails = async(req,res,next)=>{
    try {
        let cabexistwithNumPlate = await Cab.findOne({cabNumberPlate:req.body.cabNumberPlate});
        let cabexistwithchassiNum = await Cab.findOne({cabNumberPlate:req.body.cabChassiNumber});
        if(cabexistwithNumPlate || cabexistwithchassiNum){
            res.send('Cab Already Registered With This Details')
        }
        else{
            next()
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {checkCabDetails}