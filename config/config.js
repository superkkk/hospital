var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'hospital'
    },
    port: 3000,
    db: 'mongodb://localhost/hospital-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'hospital'
    },
    port: 3000,
    db: 'mongodb://localhost/hospital-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'hospital'
    },
    port: 3000,
    db: 'mongodb://localhost/hospital-production'
  }
};

module.exports = config[env];
