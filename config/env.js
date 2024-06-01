const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: process.env.PORT,
    mysqlUserName: process.env.MYSQL_USERNAME,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    projectDatabase: process.env.PROJECT_DATABASE,
};

module.exports = config;