const mongoose = require('mongoose');
const general = require("../helpers/general");
const Userchema = new mongoose.Schema(
    {   
        fullName:String,
        email:String,
        phone:String,
        password:String,
        token: {
            type: String,
            default: general.CreateStringRamdom(20)
        },
        status:{
            type:String,
            default: "initial"
        },
        deleted:{
            type:Boolean,
            default: false
        },
        deleteAt: Date
    }, {
        timestamps: true
    }
);


const User = mongoose.model('User', Userchema,'users');

module.exports = User;