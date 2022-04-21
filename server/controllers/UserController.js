const { User, UserImage } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registrationMail } = require('../services/EmailService');
const { default: mongoose } = require('mongoose');
const Booking = require('../models/Booking');
const { Cab } = require('../models/Cab');


var signupUser = async(req, res) => {
try{
    let otp = Math.floor(Math.random() * 10000);
    let user = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType,
        otp: otp
    }).save()
    if (req.file) {
        await new UserImage({
                userID: user._id,
                Image: req.file.path
            }).save();
    let token = jwt.sign({user:user},"abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key",{expiresIn:"30 minutes"});
    // registrationMail(user.email);
    res.send({msg: "User Registered Successfully",token: token});
    }
}
    catch(err){
        res.status(400).send(err);
    }
};

var loginUser = async(req,res)=>{
try{
    let user = await User.findOne({email: req.body.email});
    let token = jwt.sign({user:user},"abcdefghijklmnopqrstuvwxyz-sanamdeepkajla-key",{expiresIn:"30 minutes"});
    res.send({
        msg:"Logged In SucessFully!",
        token:token
    });
}
catch(err){
    res.status(400).send(err);
}
};

var acceptBooking = (req,res)=>{
    let user = req.loggedUser;
    if (user.userType == 'Driver'){
        if(req.body.BookingID){
        Booking.updateOne({_id:req.body.BookingID},{$set:{acceptedBy:user._id,bookingStatus:'Accepted'}})
        .then(()=>{
            res.send('Booking Accepted!');
        })
        .catch((err)=>{
            res.status(400).send(err);
        })  
    }
    else{
        res.status(404).send('Plz Select Booking To Cancel!')
    }
}
    else{
        res.status(404).send('you are not Authorized to perform this action!')
    }
};

var cancelBooking = (req,res)=>{
    let user = req.loggedUser;
    if (user.userType == 'Normal'){
        if(req.body.BookingID){
        Booking.updateOne({_id:req.body.BookingID},{$set:{bookingStatus:'Canceled'}})
        .then(()=>{
            res.status(200).send('Booking Canceled!');
        })
        .catch((err)=>{
            res.status(400).send(err);
        })  
    }
    else{
        res.status(404).send('Plz Select Booking To Cancel!')
    }
}
    else{
        res.status(404).send('you are not Authorized to perform this action!')
    }
};

var getBookings = (req, res) => {
    let user = req.loggedUser;
            if (user.userType == 'Driver'){
                Cab.aggregate([
                    {
                        $match: {
                            ownerID: mongoose.Types.ObjectId(user._id),
                        }
                    },
                    {
                        $lookup: {
                            from: 'bookings',
                            localField: 'cabType',
                            foreignField: 'cabType',
                            as: 'Bookings'
                        }
                    },
                    {
                        $project:{
                            _id:0,
                            cab:"$cabName",
                            Bookings:"$Bookings"
                        }
                    }
                ]).then((data) => {
                    res.send(data);
                })
                .catch((err)=>{
                    res.status(400).send(err);
                })
            }
            else if(user.userType == 'Normal'){
                Booking.aggregate([
                        {
                            $lookup:{
                                from:'users',
                                localField:'customerID',
                                foreignField:'_id',
                                as:'BookingUser'
                            }
                        },
                        {
                            $lookup:{
                                from:'users',
                                localField:'acceptedBy',
                                foreignField:'_id',
                                as:'Driver'
                            }
                        },
                        {
                            $lookup:{
                                from:'cabs',
                                localField:'acceptedBy',
                                foreignField:'ownerID',
                                as:'cabs'
                            }
                        },
                        {
                            $match: {
                                customerID: mongoose.Types.ObjectId(user._id)
                            }
                        },
                        {
                            $project:{
                                _id:0,
                                __v:0
                            }
                        }  
                    ])
                    .then((data)=>{
                        res.send(data);
                    })
                    .catch((err)=>{
                        res.status(400).send(err);
                    })
            }
};

var getUserProfile = (req, res) => {
    let user = req.loggedUser;
            User.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(user._id)
                    }
                },
                {
                    $lookup: {
                        from: "userimages",
                        localField: "_id",
                        foreignField: "userID",
                        as: "userImage"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        __v: 0
                    }
                },
                {
                    $unwind: "$userImage"
                }
            ]).then((data) => { 
                res.send(data); 
            })
            .catch((err)=>{
                res.status(400).send(err);
            })
};


var uploadImage = async (req, res) => {
    try {
        let user = req.loggedUser;
        if (req.file) {
            await UserImage.updateOne({
                userID: user._id
            },
                {
                    $set: {
                        Image: req.file.path
                    }
                }, { upsert: true });
            res.send('userImage Uploaded!');
        }
        else {
            res.send('Image Not Selected!');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

var verifyUser = (req, res) => {
    let user = req.loggedUser;
            if (req.body.otp == user.otp) {
                User.updateOne({ _id: user._id }, { $set: { isVerify: true } }, { upsert: false })
                    .then(data => {
                        res.send(data)
                    })
                    .catch((err)=>{
                        res.status(400).send(err);
                    })  
            } else {
                res.send('Invalid Otp!');
            }
};

module.exports = { signupUser, loginUser, getBookings,cancelBooking, acceptBooking, uploadImage, verifyUser, getUserProfile }