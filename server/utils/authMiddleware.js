const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Authorization denied" });

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) return res.status(401).json({ message: "Token invalid" });

  jwt.verify(token, process.env.JWT_Secret, (error, decoded) => {
    if (error) return res.status(401).json({ message: "Invalid token" });

    const { uid, userName } = decoded;
    req.body.uid = uid;
    req.body.username = userName;

    next();
  })
}

module.exports = authMiddleware;