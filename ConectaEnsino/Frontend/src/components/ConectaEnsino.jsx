import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, Menu, X, BookOpen, Users, Award, TrendingUp, Upload, GraduationCap } from 'lucide-react';
import AlunoPage from './AlunoPage';
import InstrutorPage from './InstrutorPage';
import CursosPage from './CursosPage';
import logoIcon from '../assets/iconCOnectaEnsino.svg';

const ConectaEnsino = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('aluno');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCursosPage, setShowCursosPage] = useState(false);
  const [messageModal, setMessageModal] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    expertise: '',
    bio: '',
    education: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (authMode === 'login') {
        // LOGIN - Valida no banco de dados
        if (!formData.email || !formData.password) {
          alert('Por favor, preencha todos os campos');
          return;
        }

        const loginData = {
          email: formData.email,
          password: formData.password,
          userType: userType
        };
        
        console.log('Enviando login:', loginData);
        
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Erro ao fazer login');
          return;
        }

        // Login bem-sucedido - entra na página do aluno/instrutor
        console.log('Login bem-sucedido:', data.user);
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.user.name,
          email: data.user.email,
          userType: data.user.userType,
          id: data.user.id,
          token: data.token
        });
        
        setShowAuthModal(false);
        setFormData({ 
          email: '', 
          password: '', 
          name: '', 
          confirmPassword: '',
          cpf: '',
          phone: '',
          expertise: '',
          bio: '',
          education: ''
        });
        
      } else {
        // CADASTRO - Apenas registra, não faz login automático
        if (formData.password !== formData.confirmPassword) {
          setMessageModal({ 
            show: true, 
            type: 'error', 
            message: 'As senhas não coincidem!' 
          });
          return;
        }

        if (!formData.email || !formData.password || !formData.name) {
          setMessageModal({ 
            show: true, 
            type: 'error', 
            message: 'Por favor, preencha todos os campos obrigatórios' 
          });
          return;
        }

        if (!formData.cpf || !formData.phone) {
          setMessageModal({ 
            show: true, 
            type: 'error', 
            message: 'CPF e telefone são obrigatórios' 
          });
          return;
        }

        const registerData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          userType: userType,
          cpf: formData.cpf,
          phone: formData.phone,
          ...(userType === 'instrutor' && {
            expertise: formData.expertise,
            bio: formData.bio,
            education: formData.education
          })
        };
        
        console.log('Enviando cadastro:', registerData);
        
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerData)
        });

        const data = await response.json();

        if (!response.ok) {
          setMessageModal({ 
            show: true, 
            type: 'error', 
            message: data.error || 'Erro ao cadastrar' 
          });
          return;
        }

        // Cadastro bem-sucedido - mostrar mensagem de sucesso
        console.log('Cadastro bem-sucedido:', data);
        setMessageModal({ 
          show: true, 
          type: 'success', 
          message: 'Cadastro realizado com sucesso! Redirecionando...' 
        });

        // Depois de 2 segundos, fechar modal e voltar à página inicial
        setTimeout(() => {
          setShowAuthModal(false);
          setAuthMode('login');
          setMessageModal({ show: false, type: '', message: '' });
          setFormData({ 
            email: '', 
            password: '', 
            name: '', 
            confirmPassword: '',
            cpf: '',
            phone: '',
            expertise: '',
            bio: '',
            education: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar sua solicitação. Verifique se o servidor está rodando.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthMode('login');
    setUserType('aluno');
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      cpf: '',
      phone: '',
      expertise: '',
      bio: '',
      education: ''
    });
  };

  const courses = [
    {
      title: 'Desenvolvimento Web Completo',
      instructor: 'Prof. João Silva',
      rating: 4.8,
      students: 12500,
      price: 'R$ 89,90',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop'
    },
    {
      title: 'Python para Data Science',
      instructor: 'Prof. Maria Santos',
      rating: 4.9,
      students: 8300,
      price: 'R$ 79,90',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop'
    },
    {
      title: 'Design UX/UI Avançado',
      instructor: 'Prof. Carlos Mendes',
      rating: 4.7,
      students: 6200,
      price: 'R$ 69,90',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop'
    },
    {
      title: 'Marketing Digital Completo',
      instructor: 'Prof. Ana Paula',
      rating: 4.6,
      students: 9800,
      price: 'R$ 84,90',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
    }
  ];

  const categories = [
    'Desenvolvimento', 'Negócios', 'Design', 'Marketing', 'TI & Software', 'Finanças', 'Fotografia', 'Música'
  ];

  // Se usuário está logado, mostrar página apropriada
  if (isLoggedIn && currentUser) {
    if (currentUser.userType === 'aluno') {
      return <AlunoPage aluno={currentUser} onLogout={handleLogout} />;
    } else {
      return <InstrutorPage instrutor={currentUser} onLogout={handleLogout} />;
    }
  }

  // Se está visualizando a página de cursos
  if (showCursosPage) {
    return <CursosPage onBack={() => setShowCursosPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <img src={logoIcon} alt="Conecta Ensino Logo" className="h-16 w-16" />
                <h1 className="text-2xl font-bold text-purple-600">Conecta Ensino</h1>
              </div>
              
              <nav className="hidden lg:block">
                <button className="text-gray-700 hover:text-purple-600 font-medium">
                  Categorias
                </button>
              </nav>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar qualquer coisa"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden lg:block text-gray-700 hover:text-purple-600">
                Ensinar na Conecta
              </button>
              <button className="hidden lg:block text-gray-700 hover:text-purple-600">
                <ShoppingCart size={24} />
              </button>
              
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 text-purple-600 font-medium border-2 border-purple-600 hover:bg-purple-50 transition-colors rounded"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors rounded"
              >
                Cadastre-se
              </button>
              
              <button className="text-gray-700 hover:text-purple-600">
                <Globe size={24} />
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <button className="block w-full text-left py-2 text-gray-700 hover:text-purple-600">
                Categorias
              </button>
              <button className="block w-full text-left py-2 text-gray-700 hover:text-purple-600">
                Ensinar na Conecta
              </button>
              <div className="relative pt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar qualquer coisa"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Mensagem de Sucesso/Erro */}
            {messageModal.show && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                messageModal.type === 'success' 
                  ? 'bg-green-50 border-green-500 text-green-800' 
                  : 'bg-red-50 border-red-500 text-red-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${messageModal.type === 'success' ? '✅' : '❌'}`}></div>
                  <div>
                    <p className="font-semibold">
                      {messageModal.type === 'success' ? 'Sucesso!' : 'Erro'}
                    </p>
                    <p className="text-sm mt-1">{messageModal.message}</p>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">
              {authMode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
            </h2>
            <p className="text-gray-600 mb-6">
              {authMode === 'login' ? 'Acesse sua conta' : 'Comece sua jornada de aprendizado'}
            </p>

            {/* User Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUserType('aluno')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  userType === 'aluno'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <GraduationCap className={`mx-auto mb-2 ${userType === 'aluno' ? 'text-purple-600' : 'text-gray-400'}`} size={32} />
                <div className="font-semibold">Aluno</div>
                <div className="text-sm text-gray-600">Quero aprender</div>
              </button>
              
              <button
                onClick={() => setUserType('instrutor')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  userType === 'instrutor'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <Upload className={`mx-auto mb-2 ${userType === 'instrutor' ? 'text-purple-600' : 'text-gray-400'}`} size={32} />
                <div className="font-semibold">Instrutor</div>
                <div className="text-sm text-gray-600">Quero ensinar</div>
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {authMode === 'signup' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  {userType === 'instrutor' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Área de Especialização *
                        </label>
                        <input
                          type="text"
                          name="expertise"
                          value={formData.expertise}
                          onChange={handleInputChange}
                          placeholder="Ex: Desenvolvimento Web, Design, Marketing..."
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Formação Acadêmica *
                        </label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          placeholder="Ex: Graduação em Ciência da Computação"
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Biografia profissional *
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Conte um pouco sobre sua experiência profissional e o que você pode ensinar..."
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar senha *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Digite a senha novamente"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 text-white py-3 rounded font-medium hover:bg-purple-700 transition-colors"
              >
                {authMode === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  setFormData({ 
                    email: '', 
                    password: '', 
                    name: '', 
                    confirmPassword: '',
                    cpf: '',
                    phone: '',
                    expertise: '',
                    bio: '',
                    education: ''
                  });
                }}
                className="text-purple-600 hover:underline text-sm"
              >
                {authMode === 'login' 
                  ? 'Não tem conta? Cadastre-se' 
                  : 'Já tem conta? Entre'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-gray-900">
              Aprenda na sua velocidade
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              Cursos a partir de R$ 29,90. Aproveite nossas promoções até o fim do mês.
            </p>
            <button 
              onClick={() => setShowCursosPage(true)}
              className="px-8 py-3 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 transition-colors"
            >
              Explore Cursos
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <BookOpen className="mx-auto mb-3 text-purple-600" size={40} />
              <div className="text-4xl font-bold text-gray-900 mb-2">5.000+</div>
              <div className="text-gray-600 font-medium">Cursos</div>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-3 text-purple-600" size={40} />
              <div className="text-4xl font-bold text-gray-900 mb-2">200K+</div>
              <div className="text-gray-600 font-medium">Alunos</div>
            </div>
            <div className="text-center">
              <Award className="mx-auto mb-3 text-purple-600" size={40} />
              <div className="text-4xl font-bold text-gray-900 mb-2">1.000+</div>
              <div className="text-gray-600 font-medium">Instrutores</div>
            </div>
            <div className="text-center">
              <TrendingUp className="mx-auto mb-3 text-purple-600" size={40} />
              <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Principais categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className="p-3 bg-white border border-gray-300 rounded font-medium text-gray-700 hover:border-purple-600 hover:text-purple-600 transition-colors text-center text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Cursos em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative overflow-hidden mb-4 h-40">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded text-xs font-semibold">
                    {course.price}
                  </div>
                </div>
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 font-medium">{course.instructor}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 font-bold mr-2 text-sm">
                      ★ {course.rating}
                    </span>
                    <span className="text-gray-600 text-xs">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <button className="mt-auto w-full bg-purple-600 text-white py-2 rounded font-semibold text-sm hover:bg-purple-700 transition-colors">
                    Ver Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Torne-se um instrutor hoje
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de instrutores e compartilhe seu conhecimento com o mundo
          </p>
          <button 
            onClick={() => {
              setAuthMode('signup');
              setUserType('instrutor');
              setShowAuthModal(true);
            }}
            className="bg-white text-purple-600 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Comece a ensinar
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoIcon} alt="Conecta Ensino Logo" className="h-12 w-12" />
                <h3 className="text-xl font-bold">Conecta Ensino</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Comunidade</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Alunos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instrutores</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parceiros</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Suporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 Conecta Ensino. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConectaEnsino;