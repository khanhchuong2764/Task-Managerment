const Task = require("../../model/task.model");

// [GET] /task/
module.exports.index = async (req, res) => {
    const find = {
        $or: [
            {createBy : req.user.id},
            {listUser : req.user.id}
        ],
        deleted:false,
    }
    // Bộ Lọc
    if(req.query.status) {
        find.status = req.query.status;
    }
    // End Bộ lọc

    // Sort 
    const sort={};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // End Sort

    // Phân Trang
    let currentPage = 1;
    let limit = 2;
    if(req.query.page) {
        currentPage = parseInt(req.query.page);
    }
    if(req.query.limit) {
        limit = parseInt(req.query.limit);
    }
    const skip = (currentPage - 1) * limit;
    // End Phân Trang
    // Search
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword,"i");
        find.title = regex;
    }
    // End Search
    const tasks = await Task.find(find).sort(sort).limit(limit).skip(skip);
    res.json(tasks);
}

// [GET] /task/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({_id : id , deleted:false});
    res.json(task);
}

// [PATCH] /task/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({_id:id},{status:req.body.status});
        res.json({
            code: 200,
            message:"Thay đổi thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message:"Thay đổi thất bại"
        });
    }
}

// [PATCH] /task/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const {ids,key,value} = req.body;
        switch (key) {
            case "status":
                await Task.updateMany({_id : ids},{status:value});
                res.json({
                    code: 200,
                    message:"Thay đổi thành công"
                });
                break;
            case "delete":
                await Task.updateMany({_id : ids},{
                    deleted:true,
                    deleteAt:new Date()
                });
                res.json({
                    code: 200,
                    message:"Thay đổi thành công"
                });
                break;
            default:
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message:"Thay đổi thất bại"
        });
    }
}

// [POST] /task/create
module.exports.create = async (req, res) => {
    try {
        req.body.createBy = req.user.id;
        const task = new Task(req.body);
        await task.save();
        res.json({
            code: 200,
            data:task,
            message:"Tạo công việc thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message:"Thay đổi thất bại"
        });
    }
}

// [PATCH] /task/edit/:id
module.exports.edit = async (req, res) => {
    try {
        await Task.updateOne({_id : req.params.id}, req.body)
        res.json({
            code: 200,
            message:"Cập nhật thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message:"Lỗi"
        });
    }
}

// [DELETE] /task/delete/:id
module.exports.delete = async (req, res) => {
    try {
        await Task.updateOne({_id : req.params.id}, {
            deleted:true,
            deleteAt:new Date()
        });    
        res.json({
            code: 200,
            message:"Xóa thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message:"xóa thất bại"
        });
    }
}