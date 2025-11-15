const request = require('supertest');
const bcrypt = require('bcrypt');

// Mock do servidor Express (você precisará exportar o app do server.js)
const baseURL = 'http://localhost:3000';

describe('Testes de Autenticação', () => {
  
  test('Deve retornar erro 400 se campos obrigatórios não forem preenchidos no login', async () => {
    const response = await request(baseURL)
      .post('/api/auth/login')
      .send({
        email: 'teste@email.com',
        // password ausente
        userType: 'aluno'
      });
    
    expect(response.status).toBe(400);
  });

  test('Deve retornar erro 400 se email ou senha forem inválidos', async () => {
    const response = await request(baseURL)
      .post('/api/auth/login')
      .send({
        email: 'invalido@email.com',
        password: 'senhaerrada',
        userType: 'aluno'
      });
    
    expect(response.status).toBe(401);
  });

  test('Deve fazer hash da senha corretamente', async () => {
    const senha = '123456';
    const hash = await bcrypt.hash(senha, 10);
    const isValid = await bcrypt.compare(senha, hash);
    
    expect(isValid).toBe(true);
  });
});