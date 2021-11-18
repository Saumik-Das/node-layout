const config = {
    env: process.env.NODE_ENV||'developement',
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || 'MY_secret-KEY',
    mongoUri: process.env.MONGO_HOST||'mongodb://'+(process.env.IP||'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/expenseTracker'
}

module.exports = config;