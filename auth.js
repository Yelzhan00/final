// middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
function isAuthenticated(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate token" });
        }

        req.userId = decoded.id;  // Сохраняем идентификатор пользователя
        next();
    });
}

module.exports = isAuthenticated;
