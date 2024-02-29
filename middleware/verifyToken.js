const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");

//  Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

const verifyToken = AsyncHandler(async (req, res, next) => {
  let authToken = req.headers.authorization; // take value from headers authrization
  if (authToken) {
    token = authToken.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "invalid token , access denied",
      });
    }
  } else {
    return res.status(401).json({
      message: "no token provieded , access denied",
    });
  }
});
const verifyTokenAndAdmin = AsyncHandler(async (req, res, next) => {
  await verifyToken(req, res, () => {
    // console.log(req?.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "not allow only admin can access",
      });
    }
  });
});

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
