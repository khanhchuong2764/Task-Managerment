const mongoose = require('mongoose');
const Userchema = new mongoose.Schema(
    {   
        fullName:String,
        email:String,
        phone:String,
        password:String,
        token: String,
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