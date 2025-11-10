const express = require('express');
const router = express.Router();

/**
 * @route GET /api/v1/
 * @description Point d'entrée principal de l'API
 * @access Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bonjour depuis notre application CI/CD ! 🚀',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/v1/health',
      metrics: '/api/v1/metrics',
      ready: '/api/v1/ready',
      status: '/api/v1/status'
    }
  });
});

/**
 * @route GET /api/v1/status
 * @description Statut détaillé de l'application
 * @access Public
 */
router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Mon App CI/CD',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

module.exports = router;
