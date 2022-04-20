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
    bookingDate:{
        type:String,required:true
    },
    totalPassengers:{
        type:String,required:true
    },
    pickupAddress:{
        type:String,required:true
    },
    GPS_starting_point:{
        type:Object,default:null
    },
    destinationAddress:{
        type:String,required:true
    },
    GPS_destination:{
        type:Object,default:null
    },
    bookingStatus:{
        type:String,enum:['Accepted','Pending','Canceled'],default:"Pending"
    },
    acceptedBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"Users",default:null
    }
})
const Booking = mongoose.model('Bookings',BookingModel);
module.exports = Booking;