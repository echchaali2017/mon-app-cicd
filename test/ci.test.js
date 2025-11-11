const request = require('supertest');
const App = require('../src/app');

describe('CI Tests - Basic Functionality', () => {
  let app;

  beforeAll(async () => {
    app = new App();
    await app.start();
  });

  afterAll(async () => {
    if (app) {
      await app.stop();
    }
  });

  it('should return health status', async () => {
    const response = await request(app.getApp()).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  it('should return welcome message', async () => {
    const response = await request(app.getApp()).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bonjour');
  });
});
