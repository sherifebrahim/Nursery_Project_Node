const express = require('express');
const {index, show, create, edit, destroy} = require('./../controllers/teacherController')

const teacherRouter = express.Router();

const {teacherValidator, teacherIdValidator} = require('./../validation/validation');
teacherRouter.route('/teachers')
.get(index)
.post(teacherValidator,create);
teacherRouter.route('/teachers/:id')
.get(teacherIdValidator,show)
.put(teacherIdValidator,teacherValidator,edit)
.delete(teacherIdValidator,destroy);

module.exports.teacherRouter = teacherRouter;