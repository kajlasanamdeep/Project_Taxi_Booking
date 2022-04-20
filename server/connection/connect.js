const mongoose = require('mongoose');

var connect = ()=>{
    return mongoose.connect(process.env.dbURL,()=>{
        console.log("Database Connected!")
    });
}

module.exports = {connect};