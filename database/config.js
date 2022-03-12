const config = require('config');

const env = process.env.NODE_ENV || 'development';
exports[env] = config.get('db');
