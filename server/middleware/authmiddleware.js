const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
//   console.log( process.env.JWT_CRYPTO);
  try {

    const decoded = jwt.verify(token, process.env.JWT_CRYPTO);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};


exports.roleAccess = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // console.log(req.user.role);
    next();
  };
};
