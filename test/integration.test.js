const request = require('supertest');
const App = require('../src/app');

describe('Integration Tests', () => {
  let app;
  let server;

  beforeAll(async () => {
    app = new App();
    await app.start();
    server = app.getServer();
  });

  afterAll(async () => {
    await app.stop();
  });

  it('should handle complete user journey', async () => {
    // Test 1: Health check
    const healthResponse = await request(server).get('/api/v1/health');
    expect(healthResponse.status).toBe(200);
    expect(healthResponse.body.status).toBe('OK');

    // Test 2: Main endpoint
    const mainResponse = await request(server).get('/api/v1/');
    expect(mainResponse.status).toBe(200);
    expect(mainResponse.body.message).toContain('Bonjour');

    // Test 3: Metrics endpoint
    const metricsResponse = await request(server).get('/api/v1/metrics');
    expect([200, 404]).toContain(metricsResponse.status);

    // Test 4: Unknown route
    const unknownResponse = await request(server).get('/unknown-route');
    expect(unknownResponse.status).toBe(404);
  });
});
