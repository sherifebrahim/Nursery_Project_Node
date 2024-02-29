const {validationResult} = require('express-validator');
const children = require('./../models/childModel')
function validate(req)
{
    let result = validationResult(req);
    if(!result.isEmpty())
    {
        errorMessage=result.array().reduce((sum,error)=>sum+error.msg+" ","");
        throw new Error(errorMessage);
    }
}
module.exports.index =(req,res,next) => {
    children.find({})
    .then((data) => res.status(200).json({data}))
    .catch(error=> next(error));    
};

module.exports.create =(req,res,next) => {
    // res.json({message:"add new child"});
    validate(req);
    let child = new children({
        // _id:req.body._id,
        full_name:req.body.full_name,
        age : req.body.age,
        level: req.body.level,
        address :{
            city:req.body.address.city,
            street:req.body.address.street,
            building:req.body.address.building
        }
    });
    child.save()
    .then((data)=> res.status(201).json({message:"child Created Successfully"}))
    .catch(error => next(error));
};

module.exports.show =(req,res,next)=>{
    validate(req);
    children.findById(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json(data);
        else
            res.status(404).json({message:"Not Found"});
    })
    .catch(error => next(error));
};

module.exports.edit =(req,res,next)=>{
    validate(req);
    children.updateOne({_id:req.params.id},{$set:req.body})
    .then((data) => {
        if(data.matchedCount)
            res.status(200).json({message:"updated Successfully"});
        else
            res.status(404).json({message:"Not Found This teacher"});
    })
    .catch(error => next(error));};

module.exports.destroy =(req,res,next)=>{
    validate(req);
    children.findByIdAndDelete(req.params.id)
    .then((data)=> {
        if(data)
            res.status(200).json({message:"Teacher Deleted Successfully"});
        else
            res.status(404).json({message:"Teacher Not Found"});
    })
    .catch(error => next(error));};
