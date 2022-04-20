const {Cab,CabImage} = require('../models/Cab');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

var registernewCab = async(req,res)=>{
    try {
        let user = req.loggedUser;
        if(user.userType=='Driver'){
        let cab = await new Cab({
            cabName:req.body.cabName,
            cabModel:req.body.cabModel,
            cabChassiNumber:req.body.cabChassiNumber,
            cabNumberPlate:req.body.cabNumberPlate,
            cabRentPerHour:req.body.cabRentPerHour,
            cabRentPerDay:req.body.cabRentPerDay,
            maxPassengers:req.body.maxPassengers,
            cabType:req.body.cabType,
            ownerID:user._id,
            cabDescription:req.body.cabDescription
        }).save();
    
        let cab_image = await new CabImage({
            cabID:cab._id,
            Image:req.file.path
        }).save();
        res.send({cab:cab,cab_image:cab_image.Image})
    }
    else{
        res.send('You Are Not eligible to register your cab!')
    }
    }
    catch (err) {
            res.status(400).send(err);
    }
}

var updateCabOwner = (req,res)=>{
    let user = req.loggedUser;
            Cab.updateOne({cabNumberPlate:req.body.cabNumberPlate},{$set:{ownerID:user._id}},{upsert:false})
            .then(data=>{
                res.send(data);
            })
            .catch((err)=>{
                res.status(400).send(err);
            })
}

var getAllCabs = async(req,res)=>{
    try {
        let cabs = await Cab.aggregate([
            {
                $lookup:{
                    from:'cabimages',
                    localField:'_id',
                    foreignField:'cabID',
                    as:'cabImage'
                }
            },
            {
                $project:{
                    _id:0,
                    __v:0
                }
            },
        ])
        res.send(cabs)
    } catch (err) {
        res.status(400).send(err);
    }
}
module.exports = { registernewCab, getAllCabs, updateCabOwner }