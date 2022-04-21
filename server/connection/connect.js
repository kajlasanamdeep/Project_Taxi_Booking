const mongoose = require('mongoose');

var connect = ()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/TaxiBookingDatabase',()=>{
        console.log("Database Connected!")
    });
}

module.exports = {connect};