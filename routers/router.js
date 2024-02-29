const {authRouter} = require('./authRouter');
const {teacherRouter} = require('./teacherRouter');
const {childRouter} = require('./childRouter');
const {classRouter} = require('./classRouter');
module.exports = [
    authRouter ,
    teacherRouter,
    childRouter ,
    classRouter,
]