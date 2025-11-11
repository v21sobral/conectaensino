// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro_aqui';

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configuração do MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'conecta_ensino'
};

let pool;

// Inicializar conexão com banco
async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('✅ Conectado ao MySQL');
    await createTables();
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:', error);
    process.exit(1);
  }
}

// Criar tabelas
async function createTables() {
  const connection = await pool.getConnection();
  
  try {
    // Tabela de usuários (alunos e instrutores)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        user_type ENUM('aluno', 'instrutor') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Tabela específica de instrutores
    await connection.query(`
      CREATE TABLE IF NOT EXISTS instructors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNIQUE NOT NULL,
        expertise VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        education VARCHAR(255) NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_students INT DEFAULT 0,
        total_courses INT DEFAULT 0,
        approved BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Tabela de cursos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        instructor_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        level ENUM('iniciante', 'intermediario', 'avancado') NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        thumbnail VARCHAR(255),
        video_intro VARCHAR(255),
        duration_hours INT,
        status ENUM('rascunho', 'analise', 'publicado', 'rejeitado') DEFAULT 'rascunho',
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_students INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
      )
    `);

    // Tabela de módulos do curso
    await connection.query(`
      CREATE TABLE IF NOT EXISTS course_modules (
        id INT PRIMARY KEY AUTO_INCREMENT,
        course_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        order_index INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);

    // Tabela de aulas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id INT PRIMARY KEY AUTO_INCREMENT,
        module_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url VARCHAR(255),
        duration_minutes INT,
        order_index INT NOT NULL,
        resources TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE
      )
    `);

    // Tabela de matrículas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        progress DECIMAL(5,2) DEFAULT 0.00,
        completed BOOLEAN DEFAULT FALSE,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_enrollment (user_id, course_id)
      )
    `);

    // Tabela de progresso das aulas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS lesson_progress (
        id INT PRIMARY KEY AUTO_INCREMENT,
        enrollment_id INT NOT NULL,
        lesson_id INT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        watched_duration INT DEFAULT 0,
        completed_at TIMESTAMP NULL,
        FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
        UNIQUE KEY unique_progress (enrollment_id, lesson_id)
      )
    `);

    // Tabela de avaliações
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_review (user_id, course_id)
      )
    `);

    // Tabela de carrinho
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_cart_item (user_id, course_id)
      )
    `);

    // Tabela de pagamentos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Tabelas criadas/verificadas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

// Middleware para verificar se é instrutor
function isInstructor(req, res, next) {
  if (req.user.userType !== 'instrutor') {
    return res.status(403).json({ error: 'Acesso negado. Apenas instrutores.' });
  }
  next();
}

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

// ========== ROTAS DE AUTENTICAÇÃO ==========

// Registro de usuário
app.post('/api/auth/register', async (req, res) => {
  try {
    const { 
      name, email, password, cpf, phone, userType,
      expertise, bio, education 
    } = req.body;

    // Validações
    if (!name || !email || !password || !cpf || !phone || !userType) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    if (userType === 'instrutor' && (!expertise || !bio || !education)) {
      return res.status(400).json({ error: 'Instrutores devem preencher todos os campos adicionais' });
    }

    // Verificar se email já existe
    const [existingUser] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, cpf, phone, user_type) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, cpf, phone, userType]
    );

    const userId = result.insertId;

    // Se for instrutor, inserir dados adicionais
    if (userType === 'instrutor') {
      await pool.query(
        'INSERT INTO instructors (user_id, expertise, bio, education) VALUES (?, ?, ?, ?)',
        [userId, expertise, bio, education]
      );
    }

    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso',
      userId 
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: 'Email, senha e tipo de usuário são obrigatórios' });
    }

    // Buscar usuário
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND user_type = ?',
      [email, userType]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = users[0];

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Buscar dados adicionais se for instrutor
    let instructorData = null;
    if (userType === 'instrutor') {
      const [instructors] = await pool.query(
        'SELECT * FROM instructors WHERE user_id = ?',
        [user.id]
      );
      instructorData = instructors[0];
    }

    // Gerar token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        userType: user.user_type,
        instructorId: instructorData?.id 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.user_type,
        instructorId: instructorData?.id
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// ========== ROTAS DE CURSOS (INSTRUTOR) ==========

// Criar curso
app.post('/api/courses', authenticateToken, isInstructor, async (req, res) => {
  try {
    const { title, description, category, level, price, durationHours } = req.body;
    const instructorId = req.user.instructorId;

    if (!title || !description || !category || !level || !price) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const [result] = await pool.query(
      `INSERT INTO courses (instructor_id, title, description, category, level, price, duration_hours)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [instructorId, title, description, category, level, price, durationHours]
    );

    res.status(201).json({
      message: 'Curso criado com sucesso',
      courseId: result.insertId
    });

  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
});

// Upload de thumbnail do curso
app.post('/api/courses/:id/thumbnail', authenticateToken, isInstructor, upload.single('thumbnail'), async (req, res) => {
  try {
    const courseId = req.params.id;
    const thumbnailPath = req.file.path;

    await pool.query(
      'UPDATE courses SET thumbnail = ? WHERE id = ? AND instructor_id = ?',
      [thumbnailPath, courseId, req.user.instructorId]
    );

    res.json({
      message: 'Thumbnail enviada com sucesso',
      path: thumbnailPath
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao enviar thumbnail' });
  }
});

// Listar cursos do instrutor
app.get('/api/instructor/courses', authenticateToken, isInstructor, async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE instructor_id = ? ORDER BY created_at DESC',
      [req.user.instructorId]
    );

    res.json({ courses });

  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
});

// ========== ROTAS DE CURSOS (PÚBLICO/ALUNO) ==========

// Listar todos os cursos publicados
app.get('/api/courses', async (req, res) => {
  try {
    const { category, level, search } = req.query;
    
    let query = `
      SELECT c.*, u.name as instructor_name, i.rating as instructor_rating
      FROM courses c
      JOIN instructors i ON c.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE c.status = 'publicado'
    `;
    
    const params = [];
    
    if (category) {
      query += ' AND c.category = ?';
      params.push(category);
    }
    
    if (level) {
      query += ' AND c.level = ?';
      params.push(level);
    }
    
    if (search) {
      query += ' AND (c.title LIKE ? OR c.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY c.created_at DESC';
    
    const [courses] = await pool.query(query, params);
    res.json({ courses });

  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
});

// Detalhes do curso
app.get('/api/courses/:id', async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT c.*, u.name as instructor_name, i.* 
       FROM courses c
       JOIN instructors i ON c.instructor_id = i.id
       JOIN users u ON i.user_id = u.id
       WHERE c.id = ?`,
      [req.params.id]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    // Buscar módulos e aulas
    const [modules] = await pool.query(
      'SELECT * FROM course_modules WHERE course_id = ? ORDER BY order_index',
      [req.params.id]
    );

    for (let module of modules) {
      const [lessons] = await pool.query(
        'SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index',
        [module.id]
      );
      module.lessons = lessons;
    }

    const course = courses[0];
    course.modules = modules;

    res.json({ course });

  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro ao buscar curso' });
  }
});

// ========== ROTAS DE MATRÍCULA ==========

// Matricular em curso
app.post('/api/enrollments', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    // Verificar se já está matriculado
    const [existing] = await pool.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Você já está matriculado neste curso' });
    }

    const [result] = await pool.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    // Atualizar total de alunos do curso
    await pool.query(
      'UPDATE courses SET total_students = total_students + 1 WHERE id = ?',
      [courseId]
    );

    res.status(201).json({
      message: 'Matrícula realizada com sucesso',
      enrollmentId: result.insertId
    });

  } catch (error) {
    console.error('Erro na matrícula:', error);
    res.status(500).json({ error: 'Erro ao realizar matrícula' });
  }
});

// Listar cursos matriculados
app.get('/api/my-courses', authenticateToken, async (req, res) => {
  try {
    const [enrollments] = await pool.query(
      `SELECT e.*, c.*, u.name as instructor_name
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       JOIN instructors i ON c.instructor_id = i.id
       JOIN users u ON i.user_id = u.id
       WHERE e.user_id = ?
       ORDER BY e.enrolled_at DESC`,
      [req.user.userId]
    );

    res.json({ courses: enrollments });

  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro ao buscar cursos matriculados' });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Conecta Ensino está funcionando!',
    version: '1.0.0'
  });
});

// Iniciar servidor
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

startServer();