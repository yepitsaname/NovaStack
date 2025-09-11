const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: "Authorization denied" });
  jwt.verify(token, process.env.JWT_Secret, (error, decoded) => {
    if (error) return res.status(401).json({ message: "Invalid token" });
    const { uid, userName } = decoded;
    req.body = {
      ...req.body,
      "uid": uid,
      "username": userName
    }

    next();
  })
}

module.exports = authMiddleware;