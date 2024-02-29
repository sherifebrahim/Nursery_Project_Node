const mongoose = require('mongoose');
const ClassSchema = mongoose.Schema(
    {
        // _id: {type:Number,required:false},
        name : {type:String, required:true,unique: true},
        supervisor : {type:String, required:true,ref:"teachers"},
        children : [{type:String,required:false,ref:"children"}]
    }
);

module.exports = mongoose.model("classes",ClassSchema);