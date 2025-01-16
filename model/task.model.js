const mongoose = require('mongoose');
const Taskschema = new mongoose.Schema(
    {   
        title:String,
        status:String,
        content:String,
        timeStart:Date,
        timeFinish:Date,
        createBy : String,
        listUser : Array,
        task_parentId : String,
        deleted:{
            type:Boolean,
            default: false
        },
        deleteAt: Date  
    }, {
        timestamps: true
    }
);


const Task = mongoose.model('Task', Taskschema,'tasks');

module.exports = Task;