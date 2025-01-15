module.exports.register = (req,res,next) => {
    if(!req.body.fullName) {
        res.json({
            code: 400,
            message:"Tên không được để trống"
        });
        return
    }
    if(req.body.fullName < 4) {
        res.json({
            code: 400,
            message:"Vui lòng nhập tên ít nhất 3 kí tự"
        });
        return
    }
    if(!req.body.email) {
        res.json({
            code: 400,
            message:"Email không được để trống"
        });
        return
    }
    if(!req.body.phone) {
        res.json({
            code: 400,
            message:"Số điện thoại không được để trống"
        });
        return
    }
    if(!req.body.password) {
        res.json({
            code: 400,
            message:"Password không được để trống"
        });
        return
    }
    if(req.body.password.length < 6) {
        res.json({
            code: 400,
            message:"Password ít nhất 6 kí tự"
        });
        return
    }
    next();
}

module.exports.confirm = (req,res,next) => {
    if(!req.body.email) {
        res.json({
            code: 400,
            message:"Email không được để trống"
        });
        return
    }
    if(!req.body.otp) {
        res.json({
            code: 400,
            message:"OTP không được để trống"
        });
        return
    }
    if(!req.body.token) {
        res.json({
            code: 400,
            message:"Token không được để trống"
        });
        return
    }
    next();
}