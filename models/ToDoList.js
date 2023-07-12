const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const toDoListSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    checked: {
        type:Boolean,
        required:true,
        default:false,
    },
    name: {
        type:String,
        required: true,
        lowercase:true,
        trim:true
    },
    attachment: {
        type:String,
        trim:true
    },
    attachmentName: {
        type:String,
        lowercase:true,
        trim:true
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("ToDoList", toDoListSchema)