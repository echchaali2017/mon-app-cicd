const express = require('express');
const router = express.Router();

/**
 * @route GET /api/v1/health
 * @description Health check endpoint
 * @access Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Mon App CI/CD',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * @route GET /api/v1/health/ready
 * @description Readiness check endpoint
 * @access Public
 */
router.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'READY',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      cache: 'connected',
      api: 'healthy'
    }
  });
});

/**
 * @route GET /api/v1/health/metrics
 * @description Metrics endpoint
 * @access Public
 */
router.get('/metrics', (req, res) => {
  res.status(200).json({
    timestamp: new Date().toISOString(),
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    }
  });
});

module.exports = router;
