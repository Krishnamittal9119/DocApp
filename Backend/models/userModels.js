const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is require']
    },
    email:{
        type:String,
        required:[true,'Email is require']
    },
    password:{
        type: String,
        required:[true, "Password is require"]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false,
    },
    notification:{
        type:Array,
        default:[],
    },
    seenotification:{
        type:Array,
        default:[],
    },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;