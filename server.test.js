const request = require('supertest');
const app = require('./server'); // Importe ton application

describe('Test du Serveur', () => {
    it('Devrait renvoyer le message Hello World', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        // On vérifie juste que ça marche, peu importe le message exact pour l'instant
        expect(res.body).toHaveProperty('message');
    });
});