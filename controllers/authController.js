const Teacher = require("./../models/teacherModel");
const bcrypt = require("bcryptjs");
module.exports.login = async (req, res) => {
  //Find if user exist
  const { email, password } = req.body;
  const user = await Teacher.findOne({ email });
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = user.generateAuthToken();
    return res.status(200).json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      token,
    });
  } else {
    return res.status(401).json({ message: "invalid email or password" });
  }
};
