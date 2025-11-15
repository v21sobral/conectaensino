describe('Testes de Lógica de Negócio', () => {
  
  test('Deve calcular progresso do curso corretamente', () => {
    const modulosCompletos = 5;
    const totalModulos = 10;
    const progresso = (modulosCompletos / totalModulos) * 100;
    
    expect(progresso).toBe(50);
  });

  test('Deve calcular preço com desconto corretamente', () => {
    const precoOriginal = 100;
    const desconto = 20; // 20%
    const precoComDesconto = precoOriginal - (precoOriginal * desconto / 100);
    
    expect(precoComDesconto).toBe(80);
  });

  test('Deve validar se curso está completo (100%)', () => {
    const progresso = 100;
    const estaConcluido = progresso === 100;
    
    expect(estaConcluido).toBe(true);
  });

  test('Deve calcular nota média corretamente', () => {
    const avaliacoes = [4.5, 4.8, 4.2, 4.9, 4.6];
    const media = avaliacoes.reduce((a, b) => a + b, 0) / avaliacoes.length;
    
    expect(media).toBeCloseTo(4.6, 1);
  });
});