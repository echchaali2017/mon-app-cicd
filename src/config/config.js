const config = {
  app: {
    name: 'Mon App CI/CD Pro',
    version: '2.0.0',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  api: {
    prefix: '/api/v1'
  }
};

module.exports = config;
