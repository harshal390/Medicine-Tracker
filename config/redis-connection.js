const Redis = require('ioredis');
const config = require('./env');

const redisConfig = {
  port: config.redis_port,
  host: config.redis_uri,
};

const redisConnection = new Redis(redisConfig);

module.exports = redisConnection;