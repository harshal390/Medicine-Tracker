const config = require("./env");

module.exports = {
  "development": {
    "username": config.mysqlUserName,
    "password": config.mysqlPassword,
    "database": config.projectDatabase,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging":false,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
