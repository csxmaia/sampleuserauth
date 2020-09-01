const jwt = require("jsonwebtoken");

class Auth {
  //MIDDLEWARE TOKEN
  async verifyTokenMid(req, res, next) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (!err) {
        res.locals.user = decode;
        next();
      } else {
        res.status(401).json({
          success: false,
          error: err,
        });
      }
    });
  }

  //verify token
  async verifyToken(req, res) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (!err) {
        res.json({
          success: true,
          message: "Token is valid.",
          user: { ...decode },
        });
      } else {
        res.status(401).json({
          success: false,
          error: err,
        });
      }
    });
  }
}

module.exports = new Auth();
