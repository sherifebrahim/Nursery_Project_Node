const express = require("express");
const childRouter = express.Router();
const {
  index,
  create,
  edit,
  show,
  destroy,
} = require("./../controllers/childController");
const { childValidator, idValidator } = require("./../validation/validation");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

childRouter.route("/child").get(verifyTokenAndAdmin,index).post(childValidator,verifyTokenAndAdmin, create);

childRouter
  .route("/child/:id")
  .get(idValidator,verifyTokenAndAdmin, show)
  .put(idValidator,verifyTokenAndAdmin, childValidator, edit)
  .delete(idValidator,verifyTokenAndAdmin, destroy);

module.exports.childRouter = childRouter;
