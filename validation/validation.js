const {body, param, query} = require('express-validator');

module.exports.teacherValidator = [
    // body('_id').isMongoId().withMessage("_id should be Object id"),
    body('full_name').isAlpha("en-US",{ignore:" "}).withMessage("full_name should be a valid name"),
    body('email').isEmail().withMessage("email should be a valid email"),
    body('password').isStrongPassword().withMessage("password should contain special char , number ,capital "),
    body('image').isString().withMessage("please enter a valid image")
];
module.exports.idValidator = [
    // param('id').isInt().withMessage("id should be a number"),
];
module.exports.teacherIdValidator = [
    param('id').isMongoId().withMessage("id should be a Mongo id"),
];


module.exports.childValidator =[
    // body('_id').isInt().withMessage("id should be integer"),
    body('full_name').isAlpha("en-US",{ignore:" "}).withMessage("full_name should be a valid name"),
    body('age').isInt().withMessage("please enter a valid age value"),
    body('level').isIn('PreKG','KG1','KG2').withMessage("level should be with defined levels"),
    body('address.city').isAlpha().withMessage("address city is required"),
    body('address.street').isAlpha().withMessage("address street is required"),
    body('address.building').isAlphanumeric().withMessage("address bulding is required"),
];

module.exports.classValidator = [
    // body('_id').isInt().withMessage("_id should be an integer"),
    body('name').isString().withMessage("name must be a string"),
    body('name').isLength({min:3}).withMessage("name must be at least 3 characters"),
    body('supervisor').isMongoId().withMessage("supervisor must be a Mongo id"),
    body('children').isArray().withMessage("children must be an array of Childs id"),
    body('children.*').isString().withMessage("children must be an array of int Childs id")
];
