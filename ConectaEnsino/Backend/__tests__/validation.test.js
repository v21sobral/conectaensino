describe('Testes de Validação de Dados', () => {
  
  test('Deve validar formato de email correto', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = 'teste@email.com';
    const emailInvalido = 'teste@email';
    
    expect(emailRegex.test(emailValido)).toBe(true);
    expect(emailRegex.test(emailInvalido)).toBe(false);
  });

  test('Deve validar CPF com formato correto', () => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cpfValido = '123.456.789-01';
    const cpfInvalido = '12345678901';
    
    expect(cpfRegex.test(cpfValido)).toBe(true);
    expect(cpfRegex.test(cpfInvalido)).toBe(false);
  });

  test('Deve validar telefone com formato correto', () => {
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const telefoneValido = '(11) 98765-4321';
    const telefoneInvalido = '11987654321';
    
    expect(telefoneRegex.test(telefoneValido)).toBe(true);
    expect(telefoneRegex.test(telefoneInvalido)).toBe(false);
  });
});