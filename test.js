const request = require('supertest');
const app = require('./server');

describe('Tests API', () => {
    it('GET / doit renvoyer 200 et le bon message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Bonjour le Jury');
    });

    it('GET /health doit renvoyer status UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('UP');
    });
});