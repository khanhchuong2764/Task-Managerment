const User = require("../../model/user.model");
const md5 = require("md5");
const ForgotPassword = require("../../model/forgot-password.model");
const generalHelper = require("../../helpers/general");
const SendMailHelper = require("../../helpers/SendMail");
const UserTemp = require("../../model/user_temp.model");
// [POST] /user/register
module.exports.register = async (req, res) => {
    // Check tài khoản có tồn tại chưa
    const exitsUser = await User.findOne(
        {
            email : req.body.email,
            deleted : false,
            status : "active"
        }
    )
    if(exitsUser) {
        res.json({  
            code: 400,
            message:"Email đã tồn tại"
        });
        return;
    }
    // Mã hóa mật khẩu và lưu vào connection user
    req.body.password = md5(req.body.password);
    const user =  new User({
        fullName : req.body.fullName,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone
    })
    await user.save();
    res.cookie("token",user.token);
    // Tạo mã xác nhận tài khoản
    const otp = generalHelper.CreateNumberRamdom(6);
    const timeExrie = Date.now() + 10 * 60 * 1000;
    const ObjectCofirm = {
        email:req.body.email,
        otp : otp,
        expireAt : timeExrie
    }
    const cofirmacc = new ForgotPassword(ObjectCofirm);
    await cofirmacc.save();
    // Gửi mã xác nhận qua mail
    const email = req.body.email;
    const subject = "Mã xác thực để kích hoạt tài khoản";
    const html = `Mã xác nhận để kích hoạt tài khoản là <b>${otp}</b>.Thời hạn sử dụng trong 10 phút`;
    SendMailHelper.sendMail(email,subject,html);
    res.json({  
        code: 200,
        message:"Đăng ký thành công",
        token : user.token
    });
}

// [POST] /user/confirm
module.exports.confirm = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const token = req.body.token;
    const exitsOtp = await ForgotPassword.findOne(
        {
            email: email,
            otp: otp
        }
    );
    if(!exitsOtp) {
        res.json({  
            code: 400,
            message:"Mã xác nhận không hợp lệ"
        });
        return;
    }
    const user = await User.findOne({email : email,token:token});
    if(!user) {
        res.json({  
            code: 400,
            message:"Không tìm thấy tài khoản"
        });
        return;
    }
    user.status = "active";
    await user.save();
    // await User.updateOne({token : user.token}, {status : "active"});
    const UserDelete = await User.find({email : email,status : "initial"});
    if(UserDelete) {
        const IdUserDelete = UserDelete.map(item => item.id);
        await User.deleteMany({_id : IdUserDelete});
    }
    res.json({  
        code: 200,
        message:"Kích hoạt tài khoản thành công"
    });
}
// [POST] /user/login
module.exports.login = async (req,res) => {
    const exitsUser = await User.findOne(
        {
            email : req.body.email,
            deleted:false,
        }
    )
    if(!exitsUser) { 
        res.json({  
            code: 400,
            message:"Email không tồn tại"
        });
        return;
    }
    if(exitsUser.status == "initial") {
        res.json({  
            code: 400,
            message:"Tài khoản chưa được kích hoạt"
        });
        return;
    }
    // Check số lần đăng nhập
    const user_temp = await UserTemp.findOne({email : req.body.email});
    const currentTime = Date.now();
    if(user_temp) {
        // Nếu số lần đăng nhập >= 10 mỗi lần đăng nhập thất bại phải chờ 1p mới được đăng nhập nữa
        if(user_temp.quantitylogin >= 10) { 
            const timeDifference = (currentTime - user_temp.updatedAt) /1000; // Thời gian đã đợi
            // const requiredWaitTime = user_temp.waitTime * 60; // Thời gian chờ cần thiết (giây)
            if(timeDifference < 60) {
                res.json({  
                    code: 400,
                    message:"Tài khoản đã khóa sau 1p vui lòng đăng nhập lại mỗi lần đăng nhập thất bại sẽ phải chờ 1 phút mới được đăng nhập và sau 30 phút sẽ tài khoản sẽ mở khóa lại"
                });
                return;
            }
            // user_temp.waitTime++;
        }
        user_temp.quantitylogin++;
        await user_temp.save();
    }else {
        const timeExrie = Date.now() + 30 * 60 * 1000;
        const usertemp = new UserTemp({
            email:req.body.email,
            quantitylogin : 1,
            // waitTime: 1,
            expireAt : timeExrie
        })
        await usertemp.save();
    }
    // Kiểm tra mật khẩu tài khoản
    if(exitsUser.password != md5(req.body.password)) { 
        res.json({  
            code: 400,
            message:"Sai mật khẩu"
        });
        return;
    }
    if(exitsUser.status == "inactive") {
        res.json({  
            code: 400,
            message:"Tài khoản bị khóa"
        });
        return;
    }
    await UserTemp.deleteOne({_id :user_temp.id});
    // res.cookie("token",exitsUser.token);
    res.json({  
        code: 200,
        message:"Đăng nhập thành công",
        token:exitsUser.token
    });
}