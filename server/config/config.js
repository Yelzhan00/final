module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',  // Секрет для JWT
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',      // Время жизни JWT токена
    SESSION_SECRET: process.env.SESSION_SECRET || 'your-session-secret',  // Секрет для сессий
    TWOFA_SECRET: process.env.TWOFA_SECRET || 'your-2fa-secret'  // Секрет для 2FA
};
