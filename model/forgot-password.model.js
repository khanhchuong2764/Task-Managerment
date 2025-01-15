const mongoose = require('mongoose');
const Forgotchema = new mongoose.Schema(
    {   
        email:String,
        otp : String,
        expireAt : {
            type :Date,
            expires : 0
        }
    }, {
        timestamps: true
    }
);


const ForgotPassword = mongoose.model('ForgotPassword', Forgotchema,'forgot-password');

module.exports = ForgotPassword;