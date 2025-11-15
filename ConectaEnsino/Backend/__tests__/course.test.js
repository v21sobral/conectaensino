const request = require('supertest');

const baseURL = 'http://localhost:3000';

describe('Testes de Cursos', () => {
  
  test('Deve listar todos os cursos publicados', async () => {
    const response = await request(baseURL)
      .get('/api/courses');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('courses');
    expect(Array.isArray(response.body.courses)).toBe(true);
  });

  test('Deve retornar erro 401 ao criar curso sem autenticação', async () => {
    const response = await request(baseURL)
      .post('/api/courses')
      .send({
        title: 'Curso Teste',
        description: 'Descrição teste',
        category: 'programacao',
        level: 'iniciante',
        price: 99.90
      });
    
    expect(response.status).toBe(401);
  });

  test('Deve filtrar cursos por categoria', async () => {
    const response = await request(baseURL)
      .get('/api/courses?category=programacao');
    
    expect(response.status).toBe(200);
    if (response.body.courses.length > 0) {
      expect(response.body.courses[0].category).toBe('programacao');
    }
  });
});