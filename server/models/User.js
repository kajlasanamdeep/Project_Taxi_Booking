const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = Schema({
    firstName:{
        type:String,default:""
    },
    lastName:{
        type:String,default:""
    },
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    phoneNumber:{
        type:String,required:true
    },
    Role:{
        type:String,enum:['Driver','User'],default:'User'
    },
    Location:{
        type: {
            type: String, default: "Point"
        },
        coordinates: {
            type: [Number],index: '2dsphere'
        }
    },
    canBook:{
        type:Boolean,default:true
    },
    canAccept:{
        type:Boolean,default:true
    }
})

const User = mongoose.model('Users',UserModel);
module.exports = User