import React, { useState } from 'react';
import { Search, ArrowLeft, Filter, X } from 'lucide-react';

const CursosPage = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Categorias de cursos
  const categorias = [
    { id: 'todos', name: 'Todos os Cursos', icon: '📚' },
    { id: 'programacao', name: 'Programação', icon: '💻' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'dados', name: 'Dados & IA', icon: '📊' },
    { id: 'negocio', name: 'Negócio', icon: '💼' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'pessoal', name: 'Desenvolvimento Pessoal', icon: '🌟' },
  ];

  // Base de cursos com categorias
  const todosCursos = [
    // Programação
    {
      id: 1,
      title: 'Python para Iniciantes',
      category: 'programacao',
      instructor: 'Prof. Carlos Lima',
      price: 49.90,
      rating: 4.9,
      students: 5200,
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8e49e?w=400&h=225&fit=crop',
      description: 'Aprenda Python do zero com projetos práticos'
    },
    {
      id: 2,
      title: 'JavaScript Completo',
      category: 'programacao',
      instructor: 'Profa. Maria Santos',
      price: 59.90,
      rating: 4.8,
      students: 4100,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
      description: 'Domine JavaScript moderno e crie aplicações web'
    },
    {
      id: 3,
      title: 'React Avançado',
      category: 'programacao',
      instructor: 'Prof. João Silva',
      price: 69.90,
      rating: 4.9,
      students: 3800,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
      description: 'Domine React e crie interfaces dinâmicas'
    },
    {
      id: 4,
      title: 'Node.js & Express',
      category: 'programacao',
      instructor: 'Prof. Pedro Costa',
      price: 59.90,
      rating: 4.7,
      students: 2900,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
      description: 'Desenvolva APIs RESTful com Node.js e Express'
    },
    {
      id: 5,
      title: 'TypeScript Profissional',
      category: 'programacao',
      instructor: 'Prof. João Silva',
      price: 54.90,
      rating: 4.8,
      students: 2100,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
      description: 'Escreva código mais seguro e escalável com TypeScript'
    },
    {
      id: 6,
      title: 'Docker e Containerização',
      category: 'programacao',
      instructor: 'Prof. Pedro Costa',
      price: 64.90,
      rating: 4.9,
      students: 1600,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
      description: 'Aprenda Docker e containerização de aplicações'
    },

    // Design
    {
      id: 7,
      title: 'Design UI/UX Completo',
      category: 'design',
      instructor: 'Prof. Carlos Lima',
      price: 79.90,
      rating: 4.9,
      students: 2200,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      description: 'Crie interfaces incríveis e experiências de usuário'
    },
    {
      id: 8,
      title: 'Figma Profissional',
      category: 'design',
      instructor: 'Profa. Ana Silva',
      price: 49.90,
      rating: 4.8,
      students: 1800,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      description: 'Domine Figma e projete designs responsivos'
    },
    {
      id: 9,
      title: 'CSS Avançado e Responsivo',
      category: 'design',
      instructor: 'Profa. Ana Silva',
      price: 39.90,
      rating: 4.8,
      students: 3800,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      description: 'Domine CSS e crie layouts responsivos'
    },
    {
      id: 10,
      title: 'Web Design Moderno',
      category: 'design',
      instructor: 'Prof. Lucas Meyer',
      price: 54.90,
      rating: 4.7,
      students: 1500,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      description: 'Crie websites modernos e atraentes'
    },

    // Dados & IA
    {
      id: 11,
      title: 'Machine Learning Essencial',
      category: 'dados',
      instructor: 'Prof. Diego Santos',
      price: 89.90,
      rating: 4.9,
      students: 1200,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      description: 'Introdução a Machine Learning com Python'
    },
    {
      id: 12,
      title: 'SQL Avançado',
      category: 'dados',
      instructor: 'Prof. Fernando Costa',
      price: 49.90,
      rating: 4.8,
      students: 2600,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
      description: 'Consultas SQL avançadas e otimização'
    },
    {
      id: 13,
      title: 'MongoDB e NoSQL',
      category: 'dados',
      instructor: 'Prof. Carlos Lima',
      price: 44.90,
      rating: 4.7,
      students: 2400,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
      description: 'Banco de dados NoSQL - MongoDB na prática'
    },
    {
      id: 14,
      title: 'Power BI e Analytics',
      category: 'dados',
      instructor: 'Profa. Juliana Silva',
      price: 59.90,
      rating: 4.8,
      students: 1900,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      description: 'Análise de dados e criação de dashboards'
    },

    // Negócio
    {
      id: 15,
      title: 'Gestão de Projetos',
      category: 'negocio',
      instructor: 'Prof. Roberto Alves',
      price: 69.90,
      rating: 4.8,
      students: 3200,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Aprenda a gerenciar projetos de forma eficaz'
    },
    {
      id: 16,
      title: 'Empreendedorismo Digital',
      category: 'negocio',
      instructor: 'Prof. Marcelo Ferreira',
      price: 74.90,
      rating: 4.9,
      students: 2800,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Inicie seu negócio digital com sucesso'
    },
    {
      id: 17,
      title: 'Liderança e Gestão de Pessoas',
      category: 'negocio',
      instructor: 'Profa. Carla Mendes',
      price: 64.90,
      rating: 4.7,
      students: 1700,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Desenvolva habilidades de liderança'
    },

    // Marketing
    {
      id: 18,
      title: 'Marketing Digital Completo',
      category: 'marketing',
      instructor: 'Profa. Vanessa Costa',
      price: 79.90,
      rating: 4.9,
      students: 4500,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Estratégias de marketing digital eficazes'
    },
    {
      id: 19,
      title: 'SEO e Google Analytics',
      category: 'marketing',
      instructor: 'Prof. Tiago Oliveira',
      price: 59.90,
      rating: 4.8,
      students: 2300,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Domine SEO e analytics para seu site'
    },
    {
      id: 20,
      title: 'Redes Sociais para Negócios',
      category: 'marketing',
      instructor: 'Profa. Isabela Santos',
      price: 49.90,
      rating: 4.8,
      students: 3100,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Gestão de redes sociais para crescimento'
    },

    // Desenvolvimento Pessoal
    {
      id: 21,
      title: 'Produtividade e Foco',
      category: 'pessoal',
      instructor: 'Prof. Gustavo Luz',
      price: 39.90,
      rating: 4.9,
      students: 5800,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Técnicas para aumentar sua produtividade'
    },
    {
      id: 22,
      title: 'Inteligência Emocional',
      category: 'pessoal',
      instructor: 'Profa. Cecília Lima',
      price: 44.90,
      rating: 4.8,
      students: 2900,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Desenvolva sua inteligência emocional'
    },
    {
      id: 23,
      title: 'Comunicação Eficaz',
      category: 'pessoal',
      instructor: 'Prof. André Martins',
      price: 34.90,
      rating: 4.9,
      students: 3400,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
      description: 'Melhore suas habilidades de comunicação'
    },
  ];

  // Filtrar cursos
  const cursosFiltrados = todosCursos.filter(curso => {
    const matchCategory = selectedCategory === 'todos' || curso.category === selectedCategory;
    const matchSearch = curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        curso.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        curso.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categoriaAtual = categorias.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Catálogo de Cursos</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Categorias */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 sticky top-20 h-[calc(100vh-80px)]">
          <div className="p-6 space-y-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Categorias</h2>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-purple-100 text-purple-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-6 flex gap-4">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors"
              >
                <Filter size={20} />
                Filtrar
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            {/* Mobile Filter Menu */}
            {showFilterMenu && (
              <div className="md:hidden mb-6 bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900">Categorias</h3>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {categorias.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-purple-100 text-purple-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex mb-8 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            {/* Category Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {categoriaAtual?.icon} {categoriaAtual?.name}
              </h2>
              <p className="text-gray-600 mt-2">
                {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? 's' : ''} encontrado{cursosFiltrados.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Courses Grid */}
            {cursosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cursosFiltrados.map((curso) => (
                  <div
                    key={curso.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-40 bg-gray-100">
                      <img
                        src={curso.image}
                        alt={curso.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        R$ {curso.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col h-32">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 text-sm">
                        {curso.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{curso.instructor}</p>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">
                        {curso.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500 font-bold text-sm">
                          ★ {curso.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({curso.students.toLocaleString()})
                        </span>
                      </div>

                      {/* Button */}
                      <button className="w-full mt-auto bg-purple-600 text-white py-2 rounded font-medium text-sm hover:bg-purple-700 transition-colors">
                        Ver Curso
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-600">
                  Tente mudar os filtros ou termos de busca
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CursosPage;
