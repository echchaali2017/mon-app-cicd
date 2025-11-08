const request = require('supertest');
const app = require('../app');

describe('Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3001, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should handle complete user journey', async () => {
    // Test 1: Health check
    const healthResponse = await request(app).get('/health');
    expect(healthResponse.status).toBe(200);
    expect(healthResponse.body.status).toBe('OK');

    // Test 2: Main endpoint
    const mainResponse = await request(app).get('/');
    expect(mainResponse.status).toBe(200);
    expect(mainResponse.body.message).toContain('Bonjour');

    // Test 3: Verify response structure
    expect(mainResponse.body).toHaveProperty('version');
    expect(mainResponse.body).toHaveProperty('environment');
  });

  it('should handle 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
