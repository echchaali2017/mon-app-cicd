const request = require('supertest');
const App = require('../src/app');

describe('Integration Tests', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = new App();
    server = await app.start();
  });

  afterAll(async () => {
    if (app) {
      await app.stop();
    }
  });

  it('should handle complete user journey', async () => {
    // Test 1: Health check
    const healthResponse = await request(app.getApp()).get('/api/v1/health');
    expect(healthResponse.status).toBe(200);
    expect(healthResponse.body.status).toBe('OK');

    // Test 2: Main endpoint
    const mainResponse = await request(app.getApp()).get('/api/v1/');
    expect(mainResponse.status).toBe(200);
    expect(mainResponse.body.message).toContain('Bonjour');

    // Test 3: Metrics endpoint
    const metricsResponse = await request(app.getApp()).get('/api/v1/metrics');
    expect([200, 404]).toContain(metricsResponse.status);

    // Test 4: Unknown route
    const unknownResponse = await request(app.getApp()).get('/unknown-route');
    expect(unknownResponse.status).toBe(404);
  });
});
