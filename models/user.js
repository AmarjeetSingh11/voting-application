const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    aadharNo:{
        type:Number,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false,
    }
});
const user = mongoose.model('user',userSchema);
module.exports = user;
