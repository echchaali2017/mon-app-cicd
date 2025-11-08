const request = require('supertest');
const app = require('../app.js');

describe('API Tests', () => {
  it('should return welcome message on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Bonjour depuis notre application CI/CD');
  });

  it('should return health status on GET /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
