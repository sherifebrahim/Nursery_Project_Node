const { validationResult } = require("express-validator");
const classes = require("./../models/classModel");
const teachers = require("../models/teacherModel");
function validate(req) {
  let result = validationResult(req);
  if (!result.isEmpty()) {
    errorMessage = result
      .array()
      .reduce((sum, error) => sum + error.msg + " ", "");
    throw new Error(errorMessage);
  }
}
module.exports.index = async (req, res, next) => {
  try {
    const CLS = await classes
      .find({})
      //   .populate("teachers")
      .populate("children", ["full_name"]);
    return res.status(200).json({ data: CLS });
  } catch (error) {
    next(error);
  }
};

module.exports.create = (req, res, next) => {
  //   validate(req);

  const { name, supervisor } = req.body;
  const Super = teachers.findOne({ supervisor });
  console.log(Super);
  if (!Super) {
    return res.status(404).json({
      message: "supervisor no found",
    });
  }

  let Class = new classes({
    // _id: req.body._id,
    name: name,
    supervisor: supervisor,
    children: req.body.children,
  });

  Class.save()
    .then((data) =>
      res.status(201).json({ message: "classes Created Successfully" })
    )
    .catch((error) => next(error));
};

module.exports.show = async (req, res) => {
  validate(req);
  classes
    .findById(req.params.id)
    .populate("children", ["full_name"])
    .then((data) => {
      if (data) res.status(200).json(data);
      else res.status(404).json({ message: "Not Found" });
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res) => {
  validate(req);
  classes
    .updateOne({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      if (data.matchedCount)
        res.status(200).json({ message: "updated Successfully" });
      else res.status(404).json({ message: "Not Found This Class" });
    })
    .catch((error) => next(error));
};

module.exports.destroy = (req, res) => {
  validate(req);
  classes
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) res.status(200).json({ message: "class Deleted Successfully" });
      else res.status(404).json({ message: "Teacher Not Found" });
    })
    .catch((error) => next(error));
};

module.exports.getClassChildren = async (req, res) => {
  let child = [];
  const id = req.params.id;
  const CLS = await classes.findById(id).populate("children", ["full_name"]);
  if (CLS) {
    CLS?.children.forEach((element) => {
      child.push(element);
    });
  } else {
    return res.status(404).json({
      message: "class not found",
    });
  }

  return res.json(child);
};

module.exports.getClassTeachers = async (req, res) => {
  let supervisor = [];
  const id = req.params.id;
  const CLS = await classes
    .findById(id)
    .populate("supervisor", ["full_name", "email", "image"]);

  return res.json({ supervisor: CLS.supervisor });
};
