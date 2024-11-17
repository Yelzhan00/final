module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret', 
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',      
    SESSION_SECRET: process.env.SESSION_SECRET || 'your-session-secret',  
    TWOFA_SECRET: process.env.TWOFA_SECRET || 'your-2fa-secret' 
};
