const mongoose = require("mongoose");
const childSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  full_name: { type: String, required: true },
  age: { type: Number, required: true },
  level: { type: String, required: true },
  address: { type: Object, required: true },
});
module.exports = mongoose.model("children", childSchema);
