module.exports.create = (req,res,next) => {
    if(!req.body.title) {
        res.json({
            code: 400,
            message:"Vui lòng nhập tiêu đề công việc"
        });
        return
    }
    if(req.body.title.length < 4) {
        res.json({
            code: 400,
            message:"Vui lòng nhập tiêu đề công việc ít nhất 3 ký tự"
        });
        return
    }
    if(!req.body.content) {
        res.json({
            code: 400,
            message:"Nội dung công việc không được để trống"
        });
        return
    }
    if(!req.body.timeStart) {
        res.json({
            code: 400,
            message:"Thời gian bắt đầu công việc không để trống"
        });
        return
    }
    if(!req.body.timeFinish) {
        res.json({
            code: 400,
            message:"Thời gian hoàn thành công việc không để trống"
        });
        return
    }
    next();
}