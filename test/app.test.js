const request = require('supertest');
const App = require('../src/app');

describe('API Tests', () => {
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

  it('should return welcome message on GET /api/v1/', async () => {
    const response = await request(server).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bonjour depuis notre application CI/CD');
  });

  it('should return health status on GET /api/v1/health', async () => {
    const response = await request(server).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
