const config = {
  app: {
    name: process.env.APP_NAME || 'Mon App CI/CD',
    version: process.env.APP_VERSION || '1.0.0',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  api: {
    prefix: '/api/v1',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  features: {
    enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
    enableMetrics: process.env.ENABLE_METRICS !== 'false'
  }
};

module.exports = config;
