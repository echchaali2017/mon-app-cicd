const request = require('supertest');
const App = require('../src/app');

describe('API Integration Tests', () => {
  let app;
  let server;

  beforeAll((done) => {
    app = new App();
    server = app.start();
    // Attendre que le serveur démarre
    setTimeout(done, 1000);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('should return API information on GET /api/v1', async () => {
    const response = await request('http://localhost:3000').get('/api/v1');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bienvenue');
    expect(response.body.endpoints).toBeDefined();
  });

  it('should return health status on GET /api/v1/health', async () => {
    const response = await request('http://localhost:3000').get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.environment).toBeDefined();
  });

  it('should return ready status on GET /api/v1/ready', async () => {
    const response = await request('http://localhost:3000').get('/api/v1/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('READY');
  });

  it('should return metrics on GET /api/v1/metrics', async () => {
    const response = await request('http://localhost:3000').get('/api/v1/metrics');
    expect(response.status).toBe(200);
    expect(response.body.timestamp).toBeDefined();
    expect(response.body.process).toBeDefined();
  });

  it('should redirect root to API on GET /', async () => {
    const response = await request('http://localhost:3000').get('/');
    expect(response.status).toBe(302); // Redirect
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request('http://localhost:3000').get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe('Route non trouvée');
  });
});
