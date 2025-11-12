import React, { useState } from 'react';
import { LogOut, Users, MessageCircle, Search, Reply, Clock, Upload, Trash2, Play, FileText, Plus, X } from 'lucide-react';

const InstrutorPage = ({ instrutor, onLogout }) => {
  const [activeTab, setActiveTab] = useState('alunos'); // 'alunos', 'duvidas' ou 'conteudo'
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({
    1: [
      { id: 1, name: 'Aula 01 - Introdução', type: 'video', size: '450MB', date: '2024-11-10' },
      { id: 2, name: 'Exercício 01.pdf', type: 'document', size: '2.5MB', date: '2024-11-10' },
    ],
    2: [
      { id: 3, name: 'React Basics', type: 'video', size: '380MB', date: '2024-11-09' },
    ]
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Dados de exemplo dos alunos
  const cursosComAlunos = [
    {
      id: 1,
      title: 'Desenvolvimento Web Completo',
      alunos: [
        { id: 101, name: 'João Silva', email: 'joao@email.com', progress: 65, status: 'ativo' },
        { id: 102, name: 'Maria Santos', email: 'maria@email.com', progress: 40, status: 'ativo' },
        { id: 103, name: 'Pedro Costa', email: 'pedro@email.com', progress: 100, status: 'concluido' },
        { id: 104, name: 'Ana Oliveira', email: 'ana@email.com', progress: 25, status: 'ativo' },
      ],
    },
    {
      id: 2,
      title: 'React Avançado',
      alunos: [
        { id: 201, name: 'Carlos Lima', email: 'carlos@email.com', progress: 55, status: 'ativo' },
        { id: 202, name: 'Fernanda Dias', email: 'fernanda@email.com', progress: 80, status: 'ativo' },
      ],
    },
  ];

  // Dados de exemplo das dúvidas
  const duvidas = [
    {
      id: 1,
      aluno: 'João Silva',
      curso: 'Desenvolvimento Web Completo',
      pergunta: 'Como usar async/await em JavaScript?',
      descricao: 'Estou tendo dificuldade para entender como usar async/await. Poderiam explicar com exemplos práticos?',
      data: '2024-11-10T14:30:00',
      respondida: false,
      respostas: [],
    },
    {
      id: 2,
      aluno: 'Maria Santos',
      curso: 'Desenvolvimento Web Completo',
      pergunta: 'Diferença entre var, let e const?',
      descricao: 'Qual é a diferença real entre var, let e const? Quando devo usar cada um?',
      data: '2024-11-09T10:15:00',
      respondida: true,
      respostas: [
        {
          id: 1,
          autor: 'Você',
          texto: 'var é escopo de função, let é escopo de bloco e const é para valores imutáveis. Recomenda-se usar const por padrão.',
          data: '2024-11-09T15:00:00',
        },
      ],
    },
    {
      id: 3,
      aluno: 'Pedro Costa',
      curso: 'Desenvolvimento Web Completo',
      pergunta: 'Como configurar variáveis de ambiente?',
      descricao: 'Como faço para configurar variáveis de ambiente no projeto React?',
      data: '2024-11-08T16:45:00',
      respondida: false,
      respostas: [],
    },
  ];

  const handleAnswerQuestion = (questionId) => {
    const answer = selectedAnswer[questionId];
    if (!answer || answer.trim() === '') {
      alert('Por favor, digite uma resposta');
      return;
    }

    // Aqui você faria a chamada à API para salvar a resposta
    console.log(`Resposta à pergunta ${questionId}: ${answer}`);
    alert('Resposta enviada com sucesso!');
    setSelectedAnswer({ ...selectedAnswer, [questionId]: '' });
    setExpandedQuestion(null);
  };

  const filteredDuvidas = duvidas.filter(
    (d) =>
      d.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.aluno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = {
    ativo: 'bg-blue-100 text-blue-800',
    concluido: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, Prof. {instrutor.name}!</h1>
            <p className="text-gray-600 text-sm">Instrutor</p>
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
            onClick={() => setActiveTab('alunos')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'alunos'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={20} />
              Meus Alunos
            </div>
          </button>
          <button
            onClick={() => setActiveTab('duvidas')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'duvidas'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              Dúvidas de Alunos
              {filteredDuvidas.filter((d) => !d.respondida).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {filteredDuvidas.filter((d) => !d.respondida).length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('conteudo')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'conteudo'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Upload size={20} />
              Conteúdo do Curso
            </div>
          </button>
        </div>

        {/* Meus Alunos */}
        {activeTab === 'alunos' && (
          <div className="space-y-8">
            {cursosComAlunos.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{curso.title}</h2>
                  <p className="text-purple-100 text-sm">{curso.alunos.length} alunos inscritos</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Progresso</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {curso.alunos.map((aluno) => (
                        <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{aluno.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{aluno.email}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all"
                                  style={{ width: `${aluno.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-10">{aluno.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                statusColor[aluno.status]
                              }`}
                            >
                              {aluno.status === 'ativo' ? 'Ativo' : 'Concluído'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dúvidas de Alunos */}
        {activeTab === 'duvidas' && (
          <div className="space-y-4">
            {/* Barra de Busca */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar dúvidas por aluno ou pergunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            {/* Lista de Dúvidas */}
            {filteredDuvidas.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Nenhuma dúvida encontrada</p>
              </div>
            ) : (
              filteredDuvidas.map((duvida) => (
                <div
                  key={duvida.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setExpandedQuestion(expandedQuestion === duvida.id ? null : duvida.id)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{duvida.pergunta}</h3>
                          {!duvida.respondida && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                              Não respondida
                            </span>
                          )}
                          {duvida.respondida && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                              Respondida
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{duvida.descricao}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Aluno: {duvida.aluno}</span>
                          <span>Curso: {duvida.curso}</span>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(duvida.data).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes Expandidos */}
                  {expandedQuestion === duvida.id && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      {/* Respostas Anteriores */}
                      {duvida.respostas.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Respostas:</h4>
                          <div className="space-y-4">
                            {duvida.respostas.map((resposta) => (
                              <div
                                key={resposta.id}
                                className="bg-white p-4 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-gray-900">{resposta.autor}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(resposta.data).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                <p className="text-gray-700">{resposta.texto}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Campo de Resposta */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-900">
                          Sua Resposta:
                        </label>
                        <textarea
                          value={selectedAnswer[duvida.id] || ''}
                          onChange={(e) =>
                            setSelectedAnswer({
                              ...selectedAnswer,
                              [duvida.id]: e.target.value,
                            })
                          }
                          placeholder="Digite sua resposta aqui..."
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                        />
                        <button
                          onClick={() => handleAnswerQuestion(duvida.id)}
                          className="px-6 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                        >
                          <Reply size={18} />
                          Enviar Resposta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Conteúdo do Curso */}
        {activeTab === 'conteudo' && (
          <div className="space-y-6">
            {cursosComAlunos.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{curso.title}</h2>
                    <p className="text-purple-100 text-sm">{uploadedFiles[curso.id]?.length || 0} arquivo(s)</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCourseId(curso.id);
                      setShowUploadModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={20} />
                    Adicionar Arquivo
                  </button>
                </div>

                {/* Lista de Arquivos */}
                <div className="p-6">
                  {!uploadedFiles[curso.id] || uploadedFiles[curso.id].length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-600">Nenhum arquivo adicionado ainda</p>
                      <p className="text-gray-500 text-sm mt-2">Clique em "Adicionar Arquivo" para enviar conteúdo</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {uploadedFiles[curso.id].map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`p-3 rounded-lg ${
                              file.type === 'video' 
                                ? 'bg-red-100 text-red-600' 
                                : 'bg-blue-100 text-blue-600'
                            }`}>
                              {file.type === 'video' ? <Play size={20} /> : <FileText size={20} />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{file.name}</h4>
                              <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                <span>{file.size}</span>
                                <span>Adicionado em {new Date(file.date).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const newFiles = uploadedFiles[curso.id].filter(f => f.id !== file.id);
                              setUploadedFiles({
                                ...uploadedFiles,
                                [curso.id]: newFiles
                              });
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Upload */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative shadow-xl">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedCourseId(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6">Adicionar Arquivo</h2>

              {/* Tabs para tipo de arquivo */}
              <div className="flex gap-2 mb-6">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} />
                  Vídeo
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Documento
                </button>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-purple-600 transition-colors cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                <p className="font-medium text-gray-900 mb-1">Arraste o arquivo aqui</p>
                <p className="text-sm text-gray-600">ou clique para selecionar</p>
                <p className="text-xs text-gray-500 mt-2">Máximo 1GB</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".mp4,.avi,.mov,.pdf,.doc,.docx"
                />
              </div>

              {/* Informações */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Tipos aceitos:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Vídeos: MP4, AVI, MOV (até 1GB)</li>
                  <li>• Documentos: PDF, DOC, DOCX (até 100MB)</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedCourseId(null);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // Simulando upload
                    const newFile = {
                      id: Math.max(...(uploadedFiles[selectedCourseId] || []).map(f => f.id), 0) + 1,
                      name: 'Novo arquivo',
                      type: 'video',
                      size: '250MB',
                      date: new Date().toISOString().split('T')[0]
                    };
                    
                    setUploadedFiles({
                      ...uploadedFiles,
                      [selectedCourseId]: [...(uploadedFiles[selectedCourseId] || []), newFile]
                    });
                    
                    setShowUploadModal(false);
                    setSelectedCourseId(null);
                    alert('Arquivo enviado com sucesso!');
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstrutorPage;
