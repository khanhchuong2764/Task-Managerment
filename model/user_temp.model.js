const mongoose = require('mongoose');
const general = require("../helpers/general");
const UserTempchema = new mongoose.Schema(
    {   
        email:String,
        quantitylogin : Number,
        waitTime:Number,
        expireAt : {
            type :Date,
            expires : 0
        }
    }, {
        timestamps: true
    }
);


const UserTemp = mongoose.model('UserTemp', UserTempchema,'user_temp');

module.exports = UserTemp;