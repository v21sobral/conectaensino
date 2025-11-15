import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, CheckCircle, Download, MessageCircle, Search, Plus, ShoppingCart } from 'lucide-react';

const AlunoPage = ({ aluno, onLogout }) => {
  const [activeTab, setActiveTab] = useState('andamento');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [loadingCursos, setLoadingCursos] = useState(false);

  // Dados de exemplo dos cursos em andamento
  const cursosAndamento = [
    {
      id: 1,
      title: 'Desenvolvimento Web Completo',
      instructor: 'Prof. João Silva',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
      modulos: 8,
      modulosCompletos: 5,
    },
    {
      id: 2,
      title: 'React Avançado',
      instructor: 'Profa. Maria Santos',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
      modulos: 10,
      modulosCompletos: 4,
    },
    {
      id: 3,
      title: 'Design UI/UX',
      instructor: 'Prof. Carlos Lima',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      modulos: 6,
      modulosCompletos: 1,
    },
  ];

  // Dados de exemplo dos cursos terminados
  const cursosTerminados = [
    {
      id: 101,
      title: 'JavaScript Essencial',
      instructor: 'Prof. Pedro Costa',
      completedDate: '2024-10-15',
      certificateId: 'CERT-2024-001',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
    },
    {
      id: 102,
      title: 'HTML & CSS Masterclass',
      instructor: 'Profa. Ana Silva',
      completedDate: '2024-09-20',
      certificateId: 'CERT-2024-002',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    },
  ];

  // Cursos sugeridos / Explorar
  const cursosSugeridos = [
    {
      id: 201,
      title: 'Python para Iniciantes',
      description: 'Aprenda Python do zero com projetos práticos',
      instructor: 'Prof. Carlos Lima',
      price: 49.90,
      rating: 4.9,
      students: 5200,
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8e49e?w=400&h=225&fit=crop',
    },
    {
      id: 202,
      title: 'CSS Avançado e Responsivo',
      description: 'Domine CSS e crie layouts responsivos para todos os dispositivos',
      instructor: 'Profa. Ana Silva',
      price: 39.90,
      rating: 4.8,
      students: 3800,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    },
    {
      id: 203,
      title: 'Node.js & Express',
      description: 'Desenvolva APIs RESTful com Node.js e Express',
      instructor: 'Prof. Pedro Costa',
      price: 59.90,
      rating: 4.7,
      students: 2900,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
    },
    {
      id: 204,
      title: 'TypeScript Profissional',
      description: 'Escreva código mais seguro e escalável com TypeScript',
      instructor: 'Prof. João Silva',
      price: 54.90,
      rating: 4.8,
      students: 2100,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    },
    {
      id: 205,
      title: 'Vue.js Completo',
      description: 'Crie aplicações web interativas com Vue.js',
      instructor: 'Profa. Maria Santos',
      price: 49.90,
      rating: 4.6,
      students: 1800,
      image: 'https://images.unsplash.com/photo-1633356022399-0d6891546011?w=400&h=225&fit=crop',
    },
    {
      id: 206,
      title: 'MongoDB e NoSQL',
      description: 'Banco de dados NoSQL - MongoDB na prática',
      instructor: 'Prof. Carlos Lima',
      price: 44.90,
      rating: 4.7,
      students: 2400,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop',
    },
    {
      id: 207,
      title: 'Docker e Containerização',
      description: 'Aprenda Docker e containerização de aplicações',
      instructor: 'Prof. Pedro Costa',
      price: 64.90,
      rating: 4.9,
      students: 1600,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    },
    {
      id: 208,
      title: 'Git e GitHub Profissional',
      description: 'Controle de versão e colaboração em projetos',
      instructor: 'Profa. Ana Silva',
      price: 29.90,
      rating: 4.8,
      students: 4100,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    },
  ];

  const handlePrintCertificate = (course) => {
    setSelectedCourse(course);
    setShowCertificateModal(true);
  };

  // Buscar cursos disponíveis
  const fetchCursos = async () => {
    try {
      setLoadingCursos(true);
      const response = await fetch('http://localhost:3000/api/courses');
      const data = await response.json();
      if (data.courses) {
        setCursosCatalogo(data.courses);
      }
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      // Usar dados de exemplo se a API falhar
      setCursosCatalogo([
        {
          id: 201,
          title: 'Python para Iniciantes',
          description: 'Aprenda Python do zero',
          instructor_name: 'Prof. Carlos Lima',
          price: 49.90,
          rating: 4.7,
          total_students: 3500,
          thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop'
        },
        {
          id: 202,
          title: 'CSS Avançado',
          description: 'Domine CSS e crie layouts responsivos',
          instructor_name: 'Profa. Ana Silva',
          price: 39.90,
          rating: 4.8,
          total_students: 2800,
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop'
        },
        {
          id: 203,
          title: 'Node.js & Express',
          description: 'Desenvolva APIs com Node.js',
          instructor_name: 'Prof. Pedro Costa',
          price: 59.90,
          rating: 4.6,
          total_students: 2200,
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=225&fit=crop'
        }
      ]);
    } finally {
      setLoadingCursos(false);
    }
  };

  // Matricular em curso
  const handleMatricula = async (courseId) => {
    try {
      if (!aluno.token) {
        alert('Por favor, faça login novamente');
        return;
      }

      const response = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aluno.token}`
        },
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao matricular');
        return;
      }

      alert('Matriculado com sucesso! O curso aparecerá em "Cursos em Andamento"');
      // Recarregar cursos em andamento
      fetchCursos();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao matricular. Tente novamente.');
    }
  };

  // Carregar cursos quando abrir a aba
  useEffect(() => {
    if (activeTab === 'explorar') {
      fetchCursos();
    }
  }, [activeTab]);

  const printCertificate = () => {
    const printWindow = window.open('', '', 'height=500,width=800');
    const today = new Date().toLocaleDateString('pt-BR');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificado - ${selectedCourse.title}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Arial', sans-serif;
            background: white;
          }
          .certificate {
            border: 3px solid #9333ea;
            padding: 40px;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            background: linear-gradient(135deg, #f3e8ff 0%, #ffffff 100%);
            border-radius: 10px;
          }
          .header {
            margin-bottom: 30px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #9333ea;
            margin-bottom: 10px;
          }
          .title {
            font-size: 24px;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .content {
            margin: 40px 0;
          }
          .student-name {
            font-size: 28px;
            font-weight: bold;
            color: #9333ea;
            margin: 20px 0;
          }
          .course-name {
            font-size: 20px;
            color: #1f2937;
            margin: 15px 0;
          }
          .instructor {
            color: #6b7280;
            margin: 15px 0;
            font-style: italic;
          }
          .date {
            color: #6b7280;
            margin: 20px 0;
            font-size: 14px;
          }
          .footer {
            margin-top: 40px;
            border-top: 2px solid #9333ea;
            padding-top: 20px;
            font-size: 12px;
            color: #6b7280;
          }
          .cert-id {
            margin-top: 10px;
            font-weight: bold;
          }
          @media print {
            body { margin: 0; padding: 0; }
            .certificate { border: none; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">🎓 Conecta Ensino</div>
            <div class="title">CERTIFICADO DE CONCLUSÃO</div>
          </div>
          
          <div class="content">
            <p style="color: #6b7280;">Certificamos que</p>
            <div class="student-name">${aluno.name}</div>
            <p style="color: #6b7280;">Completou com êxito o curso</p>
            <div class="course-name">${selectedCourse.title}</div>
            <div class="instructor">Instruído por: ${selectedCourse.instructor}</div>
            <div class="date">Data de conclusão: ${selectedCourse.completedDate}</div>
          </div>
          
          <div class="footer">
            <p>Este certificado atesta que o aluno completou todas as atividades e avaliações do curso com sucesso.</p>
            <div class="cert-id">ID: ${selectedCourse.certificateId}</div>
            <div style="margin-top: 10px;">Emitido em ${today}</div>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {aluno.name}!</h1>
            <p className="text-gray-600 text-sm">Aluno</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Abas */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('andamento')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'andamento'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              Cursos em Andamento
            </div>
          </button>
          <button
            onClick={() => setActiveTab('terminados')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'terminados'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              Cursos Terminados
            </div>
          </button>
        </div>

        {/* Cursos em Andamento */}
        {activeTab === 'andamento' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosAndamento.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden h-40 bg-gray-100">
                  <img
                    src={curso.image}
                    alt={curso.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{curso.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{curso.instructor}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-600">Progresso</span>
                      <span className="text-xs font-semibold text-purple-600">{curso.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${curso.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Info */}
                  <p className="text-xs text-gray-600 mb-4">
                    {curso.modulosCompletos} de {curso.modulos} módulos concluídos
                  </p>

                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors">
                    Continuar Aprendendo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cursos Terminados */}
        {activeTab === 'terminados' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosTerminados.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden h-40 bg-gray-100">
                  <img
                    src={curso.image}
                    alt={curso.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle size={14} />
                    Concluído
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{curso.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{curso.instructor}</p>
                  
                  <p className="text-xs text-gray-600 mb-4">
                    Concluído em: {new Date(curso.completedDate).toLocaleDateString('pt-BR')}
                  </p>

                  <button
                    onClick={() => handlePrintCertificate(curso)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Imprimir Certificado
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explorar Mais Cursos - Seção Permanente */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-purple-600" />
            Explorar Mais Cursos
          </h2>

          {/* Barra de Busca */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          {/* Grid de Cursos Sugeridos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cursosSugeridos
              .filter(curso =>
                curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((curso) => (
                <div key={curso.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden h-40 bg-gray-100">
                    <img
                      src={curso.image}
                      alt={curso.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{curso.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{curso.instructor}</p>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">{curso.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-500 font-bold text-sm">
                        ★ {curso.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({curso.students} alunos)
                      </span>
                    </div>

                    {/* Preço e Botão */}
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-2">
                      <span className="font-bold text-purple-600">
                        R$ {curso.price.toFixed(2)}
                      </span>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Matricular
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {cursosSugeridos.filter(curso =>
            curso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.description.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Nenhum curso encontrado com "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Certificado */}
      {showCertificateModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowCertificateModal(false);
                setSelectedCourse(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Certificado de Conclusão</h2>
            
            {/* Preview do Certificado */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-600 rounded-lg p-8 text-center mb-6">
              <div className="mb-6">
                <div className="text-4xl mb-2">🎓</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">CERTIFICADO</h3>
                <p className="text-gray-600">de Conclusão</p>
              </div>

              <div className="my-6 text-center">
                <p className="text-gray-700 mb-2">Certificamos que</p>
                <p className="text-2xl font-bold text-purple-600">{aluno.name}</p>
                <p className="text-gray-700 mt-4">completou com êxito o curso</p>
                <p className="text-xl font-semibold text-gray-900 mt-2">{selectedCourse.title}</p>
              </div>

              <div className="text-sm text-gray-600 mt-6 pt-4 border-t border-purple-300">
                <p className="mb-2">Instrutor: {selectedCourse.instructor}</p>
                <p className="mb-2">Data de conclusão: {new Date(selectedCourse.completedDate).toLocaleDateString('pt-BR')}</p>
                <p className="font-mono text-xs">ID: {selectedCourse.certificateId}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCertificateModal(false);
                  setSelectedCourse(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={printCertificate}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Imprimir/Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlunoPage;
