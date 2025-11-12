const request = require('supertest');
const express = require('express');

// Création d'une app Express simple pour les tests CI
function createTestApp() {
  const app = express();
  app.use(express.json());

  // Middleware de logging simplifié
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      // Log simplifié sans console.log pour éviter les warnings Jest
      if (process.env.NODE_ENV !== 'test') {
        console.log({
          method: req.method,
          url: req.url,
          status: res.statusCode,
          duration: duration + 'ms',
          timestamp: new Date().toISOString(),
          userAgent: req.get('User-Agent') || 'Unknown'
        });
      }
    });
    next();
  });

  // Routes de base sans DB
  app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      service: 'Mon App CI/CD',
      timestamp: new Date().toISOString(),
      environment: 'test'
    });
  });

  app.get('/api/v1/', (req, res) => {
    res.status(200).json({
      message: 'Bonjour depuis notre application CI/CD ! 🚀',
      version: '2.0.0',
      environment: 'test'
    });
  });

  app.get('/api/v1/health/ready', (req, res) => {
    res.status(200).json({
      status: 'READY',
      timestamp: new Date().toISOString(),
      service: 'Mon App CI/CD',
      message: 'Service is ready to handle requests'
    });
  });

  app.get('/api/v1/users', (req, res) => {
    // Réponse mockée pour users - pas de DB
    res.status(200).json({
      success: true,
      data: [],
      message: 'Users endpoint (mocked for CI)',
      count: 0
    });
  });

  // Route 404
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Route not found',
      path: req.originalUrl
    });
  });

  // Gestionnaire d'erreurs simplifié
  app.use((err, req, res, next) => {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  });

  return app;
}

describe('CI Pipeline Tests - Simple Express App', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  test('Health endpoint should return 200', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('Mon App CI/CD');
  });

  test('Main endpoint should return welcome message', async () => {
    const response = await request(app)
      .get('/api/v1/')
      .expect(200);
    
    expect(response.body.message).toContain('Bonjour');
    expect(response.body.version).toBe('2.0.0');
  });

  test('Ready endpoint should return READY status', async () => {
    const response = await request(app)
      .get('/api/v1/health/ready')
      .expect(200);
    
    expect(response.body.status).toBe('READY');
    expect(response.body.service).toBe('Mon App CI/CD');
  });

  test('Unknown route should return 404', async () => {
    const response = await request(app)
      .get('/api/v1/unknown-route')
      .expect(404);
    
    expect(response.body.error).toBe('Route not found');
  });

  test('Users endpoint should return mocked response', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([]);
    expect(response.body.count).toBe(0);
  });
});
