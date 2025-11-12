-- seed.sql - Dados de exemplo para o banco de dados Conecta Ensino

-- Usar o banco de dados
USE conecta_ensino;

-- Limpar dados existentes (cuidado em produção!)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE lesson_progress;
TRUNCATE TABLE reviews;
TRUNCATE TABLE cart;
TRUNCATE TABLE payments;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE lessons;
TRUNCATE TABLE course_modules;
TRUNCATE TABLE courses;
TRUNCATE TABLE instructors;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Inserir Alunos
INSERT INTO users (name, email, password, cpf, phone, user_type) VALUES
('Maria Silva', 'maria@email.com', '$2b$10$YourHashedPasswordHere', '111.222.333-44', '(11) 98765-4321', 'aluno'),
('Pedro Santos', 'pedro@email.com', '$2b$10$YourHashedPasswordHere', '222.333.444-55', '(11) 97654-3210', 'aluno'),
('Ana Costa', 'ana@email.com', '$2b$10$YourHashedPasswordHere', '333.444.555-66', '(11) 96543-2109', 'aluno'),
('Carlos Lima', 'carlos@email.com', '$2b$10$YourHashedPasswordHere', '444.555.666-77', '(11) 95432-1098', 'aluno');

-- Inserir Instrutores
INSERT INTO users (name, email, password, cpf, phone, user_type) VALUES
('Prof. João Silva', 'joao.instrutor@email.com', '$2b$10$YourHashedPasswordHere', '555.666.777-88', '(11) 94321-0987', 'instrutor'),
('Profa. Maria Santos', 'maria.instrutor@email.com', '$2b$10$YourHashedPasswordHere', '666.777.888-99', '(11) 93210-9876', 'instrutor'),
('Prof. Carlos Mendes', 'carlos.instrutor@email.com', '$2b$10$YourHashedPasswordHere', '777.888.999-00', '(11) 92109-8765', 'instrutor'),
('Profa. Ana Paula', 'ana.instrutor@email.com', '$2b$10$YourHashedPasswordHere', '888.999.000-11', '(11) 91098-7654', 'instrutor');

-- Inserir dados dos instrutores
INSERT INTO instructors (user_id, expertise, bio, education, rating, total_students, total_courses, approved) VALUES
(5, 'Desenvolvimento Web Full Stack', 'Desenvolvedor com mais de 10 anos de experiência em JavaScript, React, Node.js e bancos de dados. Trabalhou em diversas startups e grandes empresas do Vale do Silício.', 'Bacharelado em Ciência da Computação - USP', 4.8, 12500, 8, TRUE),
(6, 'Data Science e Machine Learning', 'Cientista de dados especializada em Python, análise estatística e machine learning. PhD em Estatística e experiência em projetos de IA para grandes corporações.', 'PhD em Estatística - Stanford University', 4.9, 8300, 5, TRUE),
(7, 'Design UX/UI', 'Designer com experiência em criar interfaces intuitivas e experiências memoráveis. Trabalhou com marcas como Google, Apple e startups unicórnio.', 'Bacharelado em Design Digital - Parsons', 4.7, 6200, 6, TRUE),
(8, 'Marketing Digital e Growth', 'Especialista em marketing digital com foco em growth hacking e performance. Ajudou dezenas de empresas a escalar seus negócios online.', 'MBA em Marketing - FGV', 4.6, 9800, 7, TRUE);

-- Inserir Cursos
INSERT INTO courses (instructor_id, title, description, category, level, price, duration_hours, status, rating, total_students, thumbnail) VALUES
(1, 'Desenvolvimento Web Completo 2024', 
'Aprenda HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB e muito mais! Do zero ao avançado, com projetos práticos e certificado. Torne-se um desenvolvedor Full Stack completo.',
'Desenvolvimento', 'iniciante', 89.90, 60, 'publicado', 4.8, 12500, 'uploads/web-dev.jpg'),

(2, 'Python para Data Science e Machine Learning', 
'Domine Python, NumPy, Pandas, Matplotlib, Scikit-learn e TensorFlow. Aprenda análise de dados, visualização e modelos de Machine Learning na prática.',
'TI & Software', 'intermediario', 79.90, 45, 'publicado', 4.9, 8300, 'uploads/python-ds.jpg'),

(3, 'Design UX/UI Avançado - Do Wireframe ao Protótipo', 
'Aprenda os fundamentos do design centrado no usuário, wireframing, prototipagem, testes de usabilidade e ferramentas como Figma e Adobe XD.',
'Design', 'intermediario', 69.90, 35, 'publicado', 4.7, 6200, 'uploads/ux-ui.jpg'),

(4, 'Marketing Digital Completo - Google Ads, Facebook Ads e SEO', 
'Domine as principais ferramentas de marketing digital: Google Ads, Facebook Ads, Instagram Ads, SEO, Analytics e estratégias de conversão.',
'Marketing', 'iniciante', 84.90, 40, 'publicado', 4.6, 9800, 'uploads/marketing.jpg'),

(1, 'React Native - Desenvolvimento Mobile Completo', 
'Crie aplicativos nativos para iOS e Android usando React Native. Aprenda navegação, APIs, autenticação e publicação nas stores.',
'Desenvolvimento', 'intermediario', 94.90, 50, 'publicado', 4.7, 5600, 'uploads/react-native.jpg'),

(2, 'Análise de Dados com SQL e Python', 
'Aprenda SQL avançado, análise exploratória de dados, estatística aplicada e criação de dashboards interativos com Python.',
'TI & Software', 'intermediario', 74.90, 38, 'publicado', 4.8, 4200, 'uploads/sql-python.jpg'),

(3, 'Figma Completo - Do Básico ao Avançado', 
'Domine o Figma, a ferramenta mais popular de design de interfaces. Aprenda componentes, auto-layout, protótipos interativos e design systems.',
'Design', 'iniciante', 59.90, 25, 'publicado', 4.6, 7800, 'uploads/figma.jpg'),

(4, 'Google Analytics 4 e Tag Manager', 
'Configure corretamente o GA4, crie eventos personalizados, dashboards completos e tome decisões baseadas em dados.',
'Marketing', 'intermediario', 79.90, 30, 'publicado', 4.5, 3900, 'uploads/analytics.jpg');

-- Inserir módulos para o curso "Desenvolvimento Web Completo"
INSERT INTO course_modules (course_id, title, description, order_index) VALUES
(1, 'Fundamentos da Web', 'Introdução ao desenvolvimento web, HTML5 e estrutura de páginas', 1),
(1, 'Estilização com CSS3', 'CSS avançado, Flexbox, Grid, animações e responsividade', 2),
(1, 'JavaScript Essencial', 'Fundamentos do JavaScript, DOM, eventos e ES6+', 3),
(1, 'React Fundamentals', 'Componentes, props, state, hooks e context API', 4),
(1, 'Backend com Node.js', 'Express, APIs REST, autenticação JWT e banco de dados', 5);

-- Inserir aulas para o módulo "Fundamentos da Web"
INSERT INTO lessons (module_id, title, description, video_url, duration_minutes, order_index) VALUES
(1, 'Introdução ao Curso', 'Visão geral do curso e configuração do ambiente', 'videos/intro.mp4', 15, 1),
(1, 'O que é HTML?', 'História e importância do HTML no desenvolvimento web', 'videos/html-intro.mp4', 20, 2),
(1, 'Tags e Estrutura HTML', 'Principais tags HTML e como estruturar um documento', 'videos/html-tags.mp4', 35, 3),
(1, 'Formulários HTML', 'Criando formulários completos e inputs', 'videos/html-forms.mp4', 40, 4),
(1, 'HTML5 Semântico', 'Tags semânticas e acessibilidade', 'videos/html5-semantic.mp4', 30, 5);

-- Inserir aulas para o módulo "Estilização com CSS3"
INSERT INTO lessons (module_id, title, description, video_url, duration_minutes, order_index) VALUES
(2, 'Introdução ao CSS', 'O que é CSS e como funciona', 'videos/css-intro.mp4', 25, 1),
(2, 'Seletores e Propriedades', 'Tipos de seletores e principais propriedades CSS', 'videos/css-selectors.mp4', 30, 2),
(2, 'Box Model', 'Entendendo margin, padding, border e content', 'videos/css-boxmodel.mp4', 35, 3),
(2, 'Flexbox na Prática', 'Layout moderno com Flexbox', 'videos/css-flexbox.mp4', 45, 4),
(2, 'CSS Grid Layout', 'Layouts complexos com CSS Grid', 'videos/css-grid.mp4', 50, 5);

-- Inserir matrículas
INSERT INTO enrollments (user_id, course_id, progress, completed) VALUES
(1, 1, 45.50, FALSE),
(1, 2, 100.00, TRUE),
(2, 1, 20.30, FALSE),
(2, 3, 75.80, FALSE),
(3, 1, 10.00, FALSE),
(3, 4, 55.20, FALSE),
(4, 2, 88.90, FALSE);

-- Inserir avaliações
INSERT INTO reviews (user_id, course_id, rating, comment) VALUES
(1, 2, 5, 'Curso excelente! Aprendi muito sobre Data Science e já consegui aplicar no trabalho.'),
(2, 1, 5, 'Melhor curso de desenvolvimento web que já fiz. Instrutor muito didático!'),
(3, 4, 4, 'Muito bom, mas poderia ter mais exemplos práticos.'),
(4, 2, 5, 'Conteúdo denso e bem explicado. Recomendo!');

-- Inserir itens no carrinho
INSERT INTO cart (user_id, course_id) VALUES
(1, 3),
(1, 4),
(2, 5),
(3, 2);

-- Inserir pagamentos
INSERT INTO payments (user_id, course_id, amount, payment_method, status, transaction_id) VALUES
(1, 1, 89.90, 'credit_card', 'aprovado', 'TXN-001-2024'),
(1, 2, 79.90, 'credit_card', 'aprovado', 'TXN-002-2024'),
(2, 1, 89.90, 'pix', 'aprovado', 'TXN-003-2024'),
(2, 3, 69.90, 'boleto', 'pendente', 'TXN-004-2024'),
(3, 1, 89.90, 'credit_card', 'aprovado', 'TXN-005-2024'),
(3, 4, 84.90, 'credit_card', 'aprovado', 'TXN-006-2024'),
(4, 2, 79.90, 'pix', 'aprovado', 'TXN-007-2024');

-- Atualizar estatísticas dos instrutores
UPDATE instructors i
SET total_courses = (
    SELECT COUNT(*) FROM courses WHERE instructor_id = i.id
),
total_students = (
    SELECT SUM(total_students) FROM courses WHERE instructor_id = i.id
);

SELECT 'Dados de exemplo inseridos com sucesso!' as message;