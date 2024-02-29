const express = require('express');
const classRouter = express.Router();
const {index,create, edit , show ,destroy, getClassChildren, getClassTeachers} = require('./../controllers/classController');
const {classValidator,idValidator} = require('./../validation/validation');
classRouter.route('/class')
.get(index)
.post(classValidator,create);

classRouter.route('/class/:id')
.get(idValidator,show)
.put(idValidator,classValidator,edit)
.delete(idValidator,destroy);

classRouter.route('/classchildren/:id')
.get(getClassChildren);

classRouter.route('/classTeachers/:id')
.get(getClassTeachers);
module.exports.classRouter = classRouter;