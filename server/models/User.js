const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = new mongoose.Schema({
    description: {
        type:String,
        required:true,
        max:100,
    },
    listid : {
        type:String,
        max:150,
    }
    },
    { timestamps: true },
);
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    mylists:{
        type:Array(mongoose.Types.ObjectId),
    },
    notifications:{
        type:[Notification],
    }

})
module.exports = mongoose.model("Users",userSchema);