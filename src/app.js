const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('../config/app.config');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const appRoutes = require('./routes/appRoutes');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // Sécurité
    this.app.use(helmet());
    this.app.use(cors());
    
    // Rate limiting
    const limiter = rateLimit(config.api.rateLimit);
    this.app.use(limiter);
    
    // Logging
    this.app.use(logger);
    
    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    // Routes API
    this.app.use(`${config.api.prefix}/health`, healthRoutes);
    this.app.use(`${config.api.prefix}`, appRoutes);
    
    // Route racine
    this.app.get('/', (req, res) => {
      res.redirect(`${config.api.prefix}`);
    });

    // Gestion des routes non trouvées
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: {
          message: 'Route non trouvée',
          status: 404,
          path: req.originalUrl
        }
      });
    });
  }

  setupErrorHandling() {
    this.app.use(errorHandler);
  }

  start() {
    const server = this.app.listen(config.app.port, '0.0.0.0', () => {
      console.log('🚀 ' + '='.repeat(50));
      console.log(`✅ ${config.app.name} démarré avec succès!`);
      console.log(`📡 Environnement: ${config.app.environment}`);
      console.log(`🌐 URL: http://localhost:${config.app.port}`);
      console.log(`🔧 API: http://localhost:${config.app.port}${config.api.prefix}`);
      console.log(`❤️  Health: http://localhost:${config.app.port}${config.api.prefix}/health`);
      console.log('🚀 ' + '='.repeat(50));
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 Received SIGTERM, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
      });
    });

    return server;
  }
}

module.exports = App;
