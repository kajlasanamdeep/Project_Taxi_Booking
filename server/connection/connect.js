const mongoose = require('mongoose');

var connect = ()=>{
    return mongoose.connect("mongodb+srv://root:root@cluster0.t3p0j.mongodb.net/CabBookingDatabase?retryWrites=true&w=majority",(err,connect)=>{
        if (err) throw err;
        else if(connect){
        console.log("Database Connected!")
        }
    });
}

module.exports = {connect};