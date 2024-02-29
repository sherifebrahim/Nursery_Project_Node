const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const TeacherSchema = new mongoose.Schema(
    {
        full_name: {type : String,required:true},
        email : {type : String,required:true,unique: true},
        password : {type : String,required:true},
        image : {type : String,required:false},
        isAdmin : {type : Boolean,default:false},
    }
);


TeacherSchema.methods.generateAuthToken = function () {
    return jwt.sign(
      { id: this._id, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
  };

  
module.exports = mongoose.model("teachers",TeacherSchema);