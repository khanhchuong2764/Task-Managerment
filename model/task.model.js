const mongoose = require('mongoose');
const Taskschema = new mongoose.Schema(
    {   
        title:String,
        status:String,
        content:String,
        timeStart:Date,
        timeFinish:Date,
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