const request = require('supertest');
const App = require('../src/app');

describe('CI Pipeline Tests', () => {
  let app;

  beforeAll(async () => {
    app = new App();
    await app.start();
  });

  afterAll(async () => {
    if (app && typeof app.stop === 'function') {
      await app.stop();
    }
  });

  test('Health endpoint should return 200', async () => {
    const response = await request(app.getApp()).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('Main endpoint should return welcome message', async () => {
    const response = await request(app.getApp()).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bonjour');
  });

  test('Ready endpoint should return READY status', async () => {
    const response = await request(app.getApp()).get('/api/v1/health/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('READY');
  });

  test('Unknown route should return 404', async () => {
    const response = await request(app.getApp()).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
