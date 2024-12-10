const request = require('supertest');
const app = require('../app');

describe('GET /api/financial', () => {
  it('should return data for exchange', async () => {
    const res = await request(app).get('/api/financial/exchange');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('hits');
  });
});
