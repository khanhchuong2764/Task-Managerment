const User =require("../../model/user.model");
module.exports.requestAuth = async (req,res,next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({token : token , deleted:false,status : "active"}).select("-password");
        if(user) {
            req.user = user;
            next();
        }else {
            res.json({
                code:400,
                message : "Token không hợp lệ"
            })
            return;
        }
    }else {
        res.json({
            code:400,
            message : "Vui lòng gửi kèm token"
        })
        return;
    }
}