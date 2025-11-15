const request = require('supertest');

const baseURL = 'http://localhost:3000';

describe('Testes de Matrículas', () => {
  
  test('Deve retornar erro 401 ao matricular sem autenticação', async () => {
    const response = await request(baseURL)
      .post('/api/enrollments')
      .send({
        courseId: 1
      });
    
    expect(response.status).toBe(401);
  });

  test('Deve retornar erro 400 ao matricular sem courseId', async () => {
    // Você precisará de um token válido para este teste
    const response = await request(baseURL)
      .post('/api/enrollments')
      .set('Authorization', 'Bearer seu-token-aqui')
      .send({});
    
    expect(response.status).toBe(400);
  });
});