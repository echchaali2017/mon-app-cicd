const request = require('supertest');
const app = require('../app.js');

describe('API v2 Tests', () => {
  it('should return welcome message with endpoints on GET /api/v1/', async () => {
    const response = await request(app).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bienvenue');
    expect(response.body.version).toBe('2.0.0');
    expect(response.body.endpoints).toBeDefined();
  });

  it('should return detailed health status on GET /api/v1/health', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.checks).toBeDefined();
  });

  it('should return ready status with services on GET /api/v1/ready', async () => {
    const response = await request(app).get('/api/v1/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('READY');
    expect(response.body.services).toBeDefined();
  });

  it('should return system metrics on GET /api/v1/metrics', async () => {
    const response = await request(app).get('/api/v1/metrics');
    expect(response.status).toBe(200);
    expect(response.body.process).toBeDefined();
    expect(response.body.system).toBeDefined();
  });

  it('should return application status on GET /api/v1/status', async () => {
    const response = await request(app).get('/api/v1/status');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('operational');
    expect(response.body.dependencies).toBeDefined();
  });

  it('should return 404 with suggestions for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe('Route non trouvée');
    expect(response.body.error.suggestions).toBeDefined();
  });

  it('should redirect root to API on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
  });
});
