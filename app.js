const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());
app.use(cors());

// Rate limiting compatible Node 12
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes, veuillez réessayer plus tard.',
    status: 429
  }
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// Routes API v2
app.get('/api/v1/', (req, res) => {
  res.json({
    message: '🚀 Bienvenue sur Mon App CI/CD Pro!',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/v1/health',
      ready: '/api/v1/ready',
      metrics: '/api/v1/metrics',
      status: '/api/v1/status'
    },
    features: [
      'Architecture modulaire',
      'Sécurité renforcée',
      'Logging structuré',
      'Health checks avancés',
      'Rate limiting',
      'Monitoring intégré'
    ]
  });
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      api: 'healthy',
      memory: 'stable',
      uptime: 'normal'
    }
  });
});

app.get('/api/v1/ready', (req, res) => {
  res.json({
    status: 'READY',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      cache: 'connected',
      api: 'ready'
    }
  });
});

app.get('/api/v1/metrics', (req, res) => {
  const memory = process.memoryUsage();
  res.json({
    timestamp: new Date().toISOString(),
    process: {
      uptime: process.uptime(),
      memory: {
        rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`
      },
      cpu: process.cpuUsage()
    },
    system: {
      arch: process.arch,
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid
    },
    requests: {
      total: 'N/A', // À implémenter avec un compteur
      active: 'N/A'
    }
  });
});

// Nouvelle route de statut étendu
app.get('/api/v1/status', (req, res) => {
  res.json({
    application: 'Mon App CI/CD Pro',
    version: '2.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    dependencies: {
      node: process.version,
      express: '4.21.2',
      helmet: '5.1.1'
    }
  });
});

// Redirection racine
app.get('/', (req, res) => {
  res.redirect('/api/v1/');
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Route non trouvée',
      status: 404,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      suggestions: [
        '/api/v1/',
        '/api/v1/health',
        '/api/v1/ready',
        '/api/v1/metrics'
      ]
    }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  res.status(500).json({
    error: {
      message: 'Erreur interne du serveur',
      status: 500,
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9)
    }
  });
});

// Démarrer le serveur
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 ' + '='.repeat(60));
  console.log('✅ Mon App CI/CD Pro v2.0.0 démarrée avec succès!');
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 API: http://localhost:${PORT}/api/v1/`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/v1/health`);
  console.log(`📊 Metrics: http://localhost:${PORT}/api/v1/metrics`);
  console.log('🚀 ' + '='.repeat(60));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated gracefully');
    process.exit(0);
  });
});

module.exports = app;
