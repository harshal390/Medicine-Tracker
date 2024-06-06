const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: parseInt(process.env.PORT),
    mysqlUserName: String(process.env.MYSQL_USERNAME),
    mysqlPassword: String(process.env.MYSQL_PASSWORD),
    projectDatabase: String(process.env.PROJECT_DATABASE),
    jwt_secret_key: String(process.env.JWT_SECRET_KEY),
    jwt_expire: String(process.env.JWT_EXPIRE),
    cookie_expire: parseInt(process.env.COOKIE_EXPIRE),
    timezone: String(Intl.DateTimeFormat().resolvedOptions().timeZone),
};

module.exports = config;