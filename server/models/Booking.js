const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookingModel = Schema({
    customerName:{
        type:String,required:true        
    },
    customerID:{
        type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true
    }, 
    cabType:{
        type:String,required:true
    },
    createdAt:{
        type:String,required:true
    },
    pickupAddressName:{
        type:String,required:true
    },
    destinationAddressName: {
        type: String, required: true
    },
    pickupAddressLocation:{
        type: {
            type: String, default: "Point"
        },
        coordinates: {
            type: [Number],index: '2dsphere'
        }
    },
    destinationAddressLocation:{
        type: {
            type: String, default: "Point"
        },
        coordinates: {
            type: [Number],index: '2dsphere'
        }
    },
    totalDistance: {
        type: String, required: true
    },
    totalFare: {
        type: String, required: true
    },
    Otp:{
        type: String, required: true
    },
    Status:{
        type: String, enum: ['Accepted','Active','Pending', 'Canceled','Completed'],default:"Pending"
    },
    acceptedBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"Users",default:null
    }
});
const Booking = mongoose.model('Bookings',BookingModel);
module.exports = Booking;