const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CabModel = Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true
    },
    Name:{
        type:String,required:true
    },
    Company: {
        type: String, required: true
    },
    Model:{
        type:String,required:true
    },
    NumberPlate:{
        type:String,required:true
    },
    Capacity:{
        type:Number,required:true
    },
    Type:{
        type:String,enum:['SUV','Sedan','Luxury','MPV','Hatchback'],required:true
    },
    Color:{
        type:String,require:true
    }
});

const Cab = mongoose.model('Cabs',CabModel);

module.exports = Cab