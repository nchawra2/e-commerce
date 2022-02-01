const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "token not provided" });
  }

  try {
    let decode = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decode.user;
  } catch (err) {
    res.status(500).json({ error: "wrong token provided" });
  }

  next();
};

module.exports = verify;