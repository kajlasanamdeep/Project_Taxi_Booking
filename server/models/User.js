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
    userType:{
        type:String,enum:['Driver','Normal']
    },
    userLocation:{
        type:Object,default:null
    },
    otp:{
        type:String,required:true
    },
    isVerify:{
        type:Boolean,default:false
    }
})

const UserImageModel = Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true
    },
    Image:{
        type:String,required:true
    }
});

const User = mongoose.model('Users',UserModel);
const UserImage = mongoose.model('UserImages',UserImageModel);

module.exports = {User,UserImage}