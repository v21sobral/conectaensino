// ==================== DADOS GLOBAIS ====================
const courses = [
    {
        id: 1,
        title: "Desenvolvimento Web Completo 2025",
        instructor: "João Silva",
        rating: 4.8,
        reviews: 12543,
        students: 45320,
        price: 89.90,
        oldPrice: 199.90,
        icon: "fa-laptop-code",
        category: "desenvolvimento",
        level: "intermediario",
        description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero."
    },
    {
        id: 2,
        title: "Python do Zero ao Avançado",
        instructor: "Maria Santos",
        rating: 4.9,
        reviews: 8932,
        students: 32100,
        price: 79.90,
        oldPrice: 189.90,
        icon: "fa-python",
        category: "desenvolvimento",
        level: "iniciante",
        description: "Domine Python desde os fundamentos até tópicos avançados."
    },
    {
        id: 3,
        title: "Marketing Digital Completo",
        instructor: "Carlos Oliveira",
        rating: 4.7,
        reviews: 6721,
        students: 28500,
        price: 69.90,
        oldPrice: 169.90,
        icon: "fa-chart-line",
        category: "marketing",
        level: "intermediario",
        description: "Aprenda estratégias de marketing digital e SEO."
    },
    {
        id: 4,
        title: "Design Gráfico Profissional",
        instructor: "Ana Costa",
        rating: 4.8,
        reviews: 5432,
        students: 19800,
        price: 84.90,
        oldPrice: 179.90,
        icon: "fa-pen-nib",
        category: "design",
        level: "intermediario",
        description: "Domine Photoshop, Illustrator e InDesign."
    },
    {
        id: 5,
        title: "Excel Avançado para Negócios",
        instructor: "Roberto Alves",
        rating: 4.6,
        reviews: 9876,
        students: 52000,
        price: 59.90,
        oldPrice: 149.90,
        icon: "fa-file-excel",
        category: "negocios",
        level: "avancado",
        description: "Aprenda fórmulas avançadas e automação."
    },
    {
        id: 6,
        title: "JavaScript Moderno Completo",
        instructor: "Patricia Lima",
        rating: 4.9,
        reviews: 11234,
        students: 38900,
        price: 94.90,
        oldPrice: 209.90,
        icon: "fa-js",
        category: "desenvolvimento",
        level: "intermediario",
        description: "Aprenda ES6+, async/await e APIs modernas."
    },
    {
        id: 7,
        title: "Fotografia Digital",
        instructor: "Fernando Rocha",
        rating: 4.7,
        reviews: 4567,
        students: 15600,
        price: 74.90,
        oldPrice: 159.90,
        icon: "fa-camera-retro",
        category: "fotografia",
        level: "iniciante",
        description: "Técnicas de fotografia e edição profissional."
    },
    {
        id: 8,
        title: "Gestão de Projetos Ágil",
        instructor: "Juliana Ferreira",
        rating: 4.8,
        reviews: 7890,
        students: 26700,
        price: 89.90,
        oldPrice: 189.90,
        icon: "fa-tasks",
        category: "negocios",
        level: "intermediario",
        description: "Domine Scrum e Kanban para projetos."
    },
    {
        id: 9,
        title: "UI/UX Design Completo",
        instructor: "Lucas Mendes",
        rating: 4.9,
        reviews: 6543,
        students: 22400,
        price: 99.90,
        oldPrice: 219.90,
        icon: "fa-mobile-alt",
        category: "design",
        level: "intermediario",
        description: "Crie interfaces intuitivas com Figma."
    },
    {
        id: 10,
        title: "Redes e Servidores",
        instructor: "Rafael Santos",
        rating: 4.6,
        reviews: 3421,
        students: 12800,
        price: 109.90,
        oldPrice: 239.90,
        icon: "fa-network-wired",
        category: "ti",
        level: "avancado",
        description: "Configure servidores Linux e redes."
    },
    {
        id: 11,
        title: "SEO e Otimização",
        instructor: "Camila Rodrigues",
        rating: 4.7,
        reviews: 5678,
        students: 31200,
        price: 69.90,
        oldPrice: 159.90,
        icon: "fa-search-dollar",
        category: "marketing",
        level: "iniciante",
        description: "Ranqueie seu site no Google."
    },
    {
        id: 12,
        title: "Edição de Vídeo",
        instructor: "Bruno Martins",
        rating: 4.8,
        reviews: 4321,
        students: 18900,
        price: 89.90,
        oldPrice: 199.90,
        icon: "fa-video",
        category: "design",
        level: "intermediario",
        description: "Domine Premiere e DaVinci Resolve."
    }
];

const userData = {
    name: "João Silva",
    email: "joao@email.com",
    enrolledCourses: [
        {
            id: 1,
            title: "Desenvolvimento Web Completo 2025",
            instructor: "João Silva",
            icon: "fa-laptop-code",
            progress: 65,
            totalLessons: 120,
            completedLessons: 78,
            status: "in-progress",
            isFavorite: true,
            lastAccessed: "2025-01-15",
            totalHours: 45,
            certificate: false
        },
        {
            id: 2,
            title: "Python do Zero ao Avançado",
            instructor: "Maria Santos",
            icon: "fa-python",
            progress: 100,
            totalLessons: 95,
            completedLessons: 95,
            status: "completed",
            isFavorite: true,
            lastAccessed: "2025-01-10",
            totalHours: 38,
            certificate: true
        },
        {
            id: 6,
            title: "JavaScript Moderno Completo",
            instructor: "Patricia Lima",
            icon: "fa-js",
            progress: 35,
            totalLessons: 110,
            completedLessons: 38,
            status: "in-progress",
            isFavorite: false,
            lastAccessed: "2025-01-20",
            totalHours: 42,
            certificate: false
        }
    ]
};

let currentPage = 'home';
let currentFilter = 'all';
let currentSort = 'recent';
let searchResults = [];
let searchQuery = '';

// ==================== FUNÇÕES DE NAVEGAÇÃO ====================
function showPage(page) {
    document.querySelectorAll('.page-content').forEach(p => {
        p.classList.remove('active');
    });

    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
        pageElement.classList.add('active');
        currentPage = page;

        if (page === 'meus-cursos') {
            initMeusCursos();
        } else if (page === 'pesquisa') {
            initPesquisa();
        } else if (page === 'cadastro') {
            initCadastro();
        } else if (page === 'professor') {
            initProfessor();
        }
    }

    window.scrollTo(0, 0);
}

// ==================== FUNÇÕES UTILITÁRIAS ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #5624d0;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function checkUserSession() {
    const user = sessionStorage.getItem('user');
    const authButtons = document.getElementById('authButtons');
    const userMenuContainer = document.getElementById('userMenuContainer');
    const meusCursosLink = document.getElementById('meusCursosLink');
    const userNameHeader = document.getElementById('userNameHeader');
    
    if (user) {
        const userData = JSON.parse(user);
        
        if (authButtons) authButtons.style.display = 'none';
        if (userMenuContainer) {
            userMenuContainer.style.display = 'block';
            if (userNameHeader) userNameHeader.textContent = userData.name;
        }
        if (meusCursosLink) meusCursosLink.style.display = 'block';
        
        return userData;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenuContainer) userMenuContainer.style.display = 'none';
        if (meusCursosLink) meusCursosLink.style.display = 'none';
        return null;
    }
}

// ==================== PÁGINA HOME ====================
function renderCourses(coursesToRender) {
    const courseGrid = document.getElementById('courseGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <i class="fas ${course.icon}"></i>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">${course.instructor}</p>
                <div class="course-rating">
                    <span class="stars">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}</span>
                    <span>${course.rating}</span>
                    <span style="color: #6a6f73;">(${course.reviews.toLocaleString()})</span>
                </div>
                <div class="course-price">
                    R$ ${course.price.toFixed(2)}
                    <span class="old-price">R$ ${course.oldPrice.toFixed(2)}</span>
                </div>
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });
}

function initHomePage() {
    renderCourses(courses);

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            searchQuery = category;
            searchResults = courses.filter(course => course.category === category);
            showPage('pesquisa');
        });
    });
}

// ==================== PÁGINA PESQUISA ====================
function initPesquisa() {
    const searchTitle = document.getElementById('searchTitle');
    const resultsCount = document.getElementById('resultsCount');

    searchTitle.textContent = `Resultados para "${searchQuery}"`;
    resultsCount.textContent = searchResults.length;

    renderSearchResults(searchResults);

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const filtered = filterSearchResults(searchResults, filter);
            renderSearchResults(filtered);
        });
    });
}

function filterSearchResults(courses, filter) {
    if (filter === 'all') return courses;
    
    if (filter === 'mais-vendidos') {
        return [...courses].sort((a, b) => b.students - a.students);
    }
    
    if (filter === 'melhor-avaliados') {
        return [...courses].sort((a, b) => b.rating - a.rating);
    }
    
    return courses.filter(course => course.level === filter);
}

function renderSearchResults(coursesToRender) {
    const resultsGrid = document.getElementById('resultsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = coursesToRender.length;

    if (coursesToRender.length === 0) {
        resultsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    resultsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsGrid.innerHTML = '';

    const levelText = {
        'iniciante': 'Iniciante',
        'intermediario': 'Intermediário',
        'avancado': 'Avançado'
    };

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'result-card';
        courseCard.innerHTML = `
            <div class="result-image">
                <i class="fas ${course.icon}"></i>
                <button class="favorite-btn" onclick="toggleSearchFavorite(${course.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="result-content">
                <h3 class="result-title">${course.title}</h3>
                <p class="result-instructor">${course.instructor}</p>
                <p class="result-description">${course.description}</p>
                <div class="result-stats">
                    <div class="result-rating">
                        <span class="stars">${'★'.repeat(Math.floor(course.rating))}</span>
                        <span>${course.rating}</span>
                        <span style="color: #6a6f73;">(${course.reviews.toLocaleString()})</span>
                    </div>
                    <span class="result-students">${course.students.toLocaleString()} alunos</span>
                    <span class="result-level">${levelText[course.level]}</span>
                </div>
                <div class="result-footer">
                    <div class="result-price">
                        <span class="current-price">R$ ${course.price.toFixed(2)}</span>
                        <span class="original-price">R$ ${course.oldPrice.toFixed(2)}</span>
                    </div>
                    <button class="enroll-btn" onclick="enrollCourse(${course.id})">Fazer Curso</button>
                </div>
            </div>
        `;
        resultsGrid.appendChild(courseCard);
    });
}

function toggleSearchFavorite(courseId) {
    showNotification('Adicionado aos favoritos! ❤️');
}

function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        // Salvar curso selecionado
        sessionStorage.setItem('selectedCourse', JSON.stringify(course));
        // Ir para checkout
        showPage('checkout');
    }
}

// ==================== PÁGINA MEUS CURSOS ====================
function initMeusCursos() {
    const user = checkUserSession();
    if (!user) {
        showNotification('Faça login para acessar');
        showPage('home');
        setTimeout(() => {
            document.getElementById('btnEntrar').click();
        }, 500);
        return;
    }

    updateCourseCounts();
    applyFiltersAndSort();

    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            currentFilter = link.dataset.filter;
            applyFiltersAndSort();
        });
    });

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }

    const courseSearch = document.getElementById('courseSearch');
    if (courseSearch) {
        courseSearch.addEventListener('input', (e) => {
            searchMyCourses(e.target.value);
        });
    }
}

function updateCourseCounts() {
    const all = userData.enrolledCourses.length;
    const inProgress = userData.enrolledCourses.filter(c => c.status === 'in-progress').length;
    const completed = userData.enrolledCourses.filter(c => c.status === 'completed').length;
    const favorites = userData.enrolledCourses.filter(c => c.isFavorite).length;

    document.getElementById('countAll').textContent = all;
    document.getElementById('countProgress').textContent = inProgress;
    document.getElementById('countCompleted').textContent = completed;
    document.getElementById('countFavorites').textContent = favorites;

    const totalHours = userData.enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0);
    const totalCertificates = userData.enrolledCourses.filter(c => c.certificate).length;

    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalCertificates').textContent = totalCertificates;
}

function filterMyCourses(filter) {
    let filtered = userData.enrolledCourses;
    if (filter === 'in-progress') {
        filtered = filtered.filter(c => c.status === 'in-progress');
    } else if (filter === 'completed') {
        filtered = filtered.filter(c => c.status === 'completed');
    } else if (filter === 'favorites') {
        filtered = filtered.filter(c => c.isFavorite);
    }
    return filtered;
}

function sortMyCourses(courses, sortBy) {
    const sorted = [...courses];
    if (sortBy === 'recent') {
        sorted.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
    } else if (sortBy === 'progress') {
        sorted.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
}

function applyFiltersAndSort() {
    let courses = filterMyCourses(currentFilter);
    courses = sortMyCourses(courses, currentSort);
    renderMyCourses(courses);
}

function searchMyCourses(searchTerm) {
    let courses = filterMyCourses(currentFilter);
    if (searchTerm) {
        courses = courses.filter(c => 
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    courses = sortMyCourses(courses, currentSort);
    renderMyCourses(courses);
}

function renderMyCourses(coursesToRender) {
    const coursesGrid = document.getElementById('coursesGridMyCourses');
    const emptyState = document.getElementById('emptyState');

    if (coursesToRender.length === 0) {
        coursesGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    coursesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    coursesGrid.innerHTML = '';

    coursesToRender.forEach(course => {
        const statusBadge = course.status === 'completed' 
            ? '<span class="course-badge badge-completed">Concluído</span>'
            : `<span class="course-badge badge-in-progress">${course.progress}%</span>`;

        const actionButton = course.status === 'completed'
            ? `<button class="btn-certificate" onclick="downloadCertificate(${course.id})"><i class="fas fa-certificate"></i> Certificado</button>`
            : `<button class="btn-continue" onclick="continueCourse(${course.id})">Continuar Curso</button>`;

        const courseCard = document.createElement('div');
        courseCard.className = 'course-card-my';
        courseCard.innerHTML = `
            <div class="course-image-my">
                <i class="fas ${course.icon}"></i>
                ${statusBadge}
            </div>
            <div class="course-content-my">
                <h3 class="course-title-my">${course.title}</h3>
                <p class="course-instructor-my">${course.instructor}</p>
                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-text">${course.completedLessons}/${course.totalLessons} aulas</span>
                        <span class="progress-percentage">${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    ${actionButton}
                    <button class="btn-icon ${course.isFavorite ? 'favorited' : ''}" onclick="toggleMyCourseFavorite(${course.id})">
                        <i class="${course.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

function toggleMyCourseFavorite(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course) {
        course.isFavorite = !course.isFavorite;
        updateCourseCounts();
        applyFiltersAndSort();
        showNotification(course.isFavorite ? 'Adicionado aos favoritos! ❤️' : 'Removido dos favoritos');
    }
}

function continueCourse(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course) {
        alert(`Continuando:\n\n"${course.title}"\n\nProgresso: ${course.progress}%\nPróxima aula: ${course.completedLessons + 1}/${course.totalLessons}`);
    }
}

function downloadCertificate(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course && course.certificate) {
        alert(`Certificado:\n\n"${course.title}"\n\nParabéns!`);
        showNotification('Certificado baixado! 🎓');
    }
}

// ==================== PÁGINA CADASTRO ====================
function initCadastro() {
    const passwordInput = document.getElementById('passwordCadastro');
    const strengthBar = document.getElementById('strengthBar');
    const passwordHint = document.getElementById('passwordHint');

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let strength = 0;

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            strengthBar.className = 'password-strength-bar';
            
            if (strength <= 1) {
                strengthBar.classList.add('weak');
                passwordHint.textContent = 'Senha fraca';
                passwordHint.style.color = '#ff4d4d';
            } else if (strength <= 2) {
                strengthBar.classList.add('medium');
                passwordHint.textContent = 'Senha média';
                passwordHint.style.color = '#ffa500';
            } else {
                strengthBar.classList.add('strong');
                passwordHint.textContent = 'Senha forte!';
                passwordHint.style.color = '#00c851';
            }
        });
    }

    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.onsubmit = function(e) {
            e.preventDefault();

            const password = document.getElementById('passwordCadastro').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            const formData = {
                name: document.getElementById('nome').value + ' ' + document.getElementById('sobrenome').value,
                email: document.getElementById('emailCadastro').value,
                isLoggedIn: true,
                tipoConta: document.getElementById('tipoConta').value
            };

            sessionStorage.setItem('user', JSON.stringify(formData));
            showNotification('Cadastro realizado!');
            
            setTimeout(() => {
                checkUserSession();
                if (formData.tipoConta === 'professor') {
                    showPage('professor');
                } else {
                    showPage('meus-cursos');
                }
            }, 1000);
        };
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }
}

// ==================== INICIALIZAÇÃO ====================
window.addEventListener('load', function() {
    console.log('=== CONECTA ENSINO CARREGADO ===');
    
    checkUserSession();
    showPage('home');
    initHomePage();

    // Pesquisa
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-bar i');
    
    const performSearch = () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchQuery = searchTerm;
            searchResults = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
            );
            showPage('pesquisa');
        }
    };

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    if (searchIcon) {
        searchIcon.style.cursor = 'pointer';
        searchIcon.addEventListener('click', performSearch);
    }

    // ==================== MODAL DE LOGIN ====================
    const modal = document.getElementById('loginModal');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const linkCadastro = document.getElementById('linkCadastro');
    const linkLoginFromCadastro = document.getElementById('linkLoginFromCadastro');

    console.log('Modal:', modal);
    console.log('Botão Entrar:', btnEntrar);

    // Função para abrir modal
    function abrirModal() {
        console.log('Abrindo modal...');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Modal display:', modal.style.display);
        } else {
            console.error('Modal não encontrado!');
        }
    }

    // Função para fechar modal
    function fecharModal() {
        console.log('Fechando modal...');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Expor funções globalmente
    window.abrirModal = abrirModal;
    window.fecharModal = fecharModal;

    // Botão Entrar
    if (btnEntrar) {
        btnEntrar.onclick = function(e) {
            e.preventDefault();
            console.log('Clique no botão Entrar detectado!');
            abrirModal();
        };
    } else {
        console.error('Botão Entrar não encontrado!');
    }

    // Botão X (fechar)
    if (closeModal) {
        closeModal.onclick = function(e) {
            e.preventDefault();
            fecharModal();
        };
    }

    // Clicar fora do modal
    window.onclick = function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    };

    // Tecla ESC
    document.onkeydown = function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            fecharModal();
        }
    };

    // Submit do formulário de login
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login:', email);
            
            const userData = {
                name: email.split('@')[0],
                email: email,
                isLoggedIn: true,
                tipoConta: 'aluno'
            };
            
            sessionStorage.setItem('user', JSON.stringify(userData));
            showNotification('Login realizado com sucesso!');
            
            fecharModal();
            
            setTimeout(() => {
                checkUserSession();
                showPage('meus-cursos');
            }, 1000);
        };
    }

    // Botão Cadastrar
    if (btnCadastrar) {
        btnCadastrar.onclick = function(e) {
            e.preventDefault();
            console.log('Indo para cadastro...');
            showPage('cadastro');
        };
    }

    // Link "Cadastre-se" dentro do modal
    if (linkCadastro) {
        linkCadastro.onclick = function(e) {
            e.preventDefault();
            fecharModal();
            showPage('cadastro');
        };
    }

    // Link "Fazer login" na página de cadastro
    if (linkLoginFromCadastro) {
        linkLoginFromCadastro.onclick = function(e) {
            e.preventDefault();
            showPage('home');
            setTimeout(() => {
                abrirModal();
            }, 200);
        };
    }

    // User menu dropdown
    const userBtn = document.getElementById('userBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (userBtn && dropdownMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userBtn.classList.toggle('active');
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            userBtn.classList.remove('active');
            dropdownMenu.classList.remove('show');
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Deseja sair?')) {
                sessionStorage.removeItem('user');
                showNotification('Logout realizado!');
                setTimeout(() => {
                    checkUserSession();
                    showPage('home');
                }, 1000);
            }
        });
    }
});

// ==================== PAINEL DO PROFESSOR ====================
let aulaCount = 1;
const professorCourses = [];

function initProfessor() {
    updateProfessorStats();
    
    // Navegação entre seções
    const sectionLinks = document.querySelectorAll('#page-professor .sidebar-menu a');
    sectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Atualizar menu ativo
            document.querySelectorAll('#page-professor .sidebar-menu li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Mostrar seção
            const section = link.dataset.section;
            document.querySelectorAll('.professor-section').forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${section}`).classList.add('active');
        });
    });
    
    // Form de novo curso
    const novoCursoForm = document.getElementById('novoCursoForm');
    if (novoCursoForm) {
        novoCursoForm.onsubmit = function(e) {
            e.preventDefault();
            
            const curso = {
                id: Date.now(),
                titulo: document.getElementById('cursoTitulo').value,
                subtitulo: document.getElementById('cursoSubtitulo').value,
                descricao: document.getElementById('cursoDescricao').value,
                categoria: document.getElementById('cursoCategoria').value,
                nivel: document.getElementById('cursoNivel').value,
                idioma: document.getElementById('cursoIdioma').value,
                duracao: document.getElementById('cursoDuracao').value,
                preco: document.getElementById('cursoPreco').value,
                desconto: document.getElementById('cursoDesconto').value,
                status: 'publicado',
                alunos: 0,
                rating: 0,
                dataPublicacao: new Date().toISOString()
            };
            
            professorCourses.push(curso);
            showNotification('Curso publicado com sucesso! 🎉');
            
            // Limpar formulário
            novoCursoForm.reset();
            
            // Atualizar stats
            updateProfessorStats();
            
            // Voltar para dashboard
            setTimeout(() => {
                document.querySelector('[data-section="dashboard"]').click();
            }, 1500);
        };
    }
    
    // Upload de imagem
    const uploadImagemArea = document.getElementById('uploadImagemArea');
    const cursoImagem = document.getElementById('cursoImagem');
    
    if (uploadImagemArea && cursoImagem) {
        uploadImagemArea.addEventListener('click', () => cursoImagem.click());
        
        cursoImagem.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('imagePreview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
                showNotification('Imagem carregada!');
            }
        });
    }
    
    // Upload de vídeo
    const uploadVideoArea = document.getElementById('uploadVideoArea');
    const cursoVideo = document.getElementById('cursoVideo');
    
    if (uploadVideoArea && cursoVideo) {
        uploadVideoArea.addEventListener('click', () => cursoVideo.click());
        
        cursoVideo.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                showNotification('Vídeo carregado!');
            }
        });
    }
}

function updateProfessorStats() {
    document.getElementById('countProfCourses').textContent = professorCourses.length;
    document.getElementById('dashTotalCourses').textContent = professorCourses.length;
    
    const totalStudents = professorCourses.reduce((sum, c) => sum + c.alunos, 0);
    document.getElementById('dashTotalStudents').textContent = totalStudents;
    document.getElementById('totalStudents').textContent = totalStudents;
    
    const avgRating = professorCourses.length > 0 
        ? (professorCourses.reduce((sum, c) => sum + c.rating, 0) / professorCourses.length).toFixed(1)
        : '0';
    document.getElementById('dashAvgRating').textContent = avgRating;
    document.getElementById('avgRating').textContent = avgRating;
    
    // Receita fictícia
    const revenue = professorCourses.length * 1500;
    document.getElementById('dashRevenue').textContent = `R$ ${revenue.toLocaleString('pt-BR')}`;
    
    renderProfessorCourses();
}

function renderProfessorCourses() {
    const grid = document.getElementById('profCoursesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (professorCourses.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h2>Nenhum curso publicado</h2>
                <p>Comece criando seu primeiro curso</p>
                <button onclick="document.querySelector('[data-section=\\'novo-curso\\']').click()" class="btn-primary">Criar Curso</button>
            </div>
        `;
        return;
    }
    
    professorCourses.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'course-card-my';
        card.innerHTML = `
            <div class="course-image-my">
                <i class="fas fa-book"></i>
            </div>
            <div class="course-content-my">
                <h3 class="course-title-my">${curso.titulo}</h3>
                <p class="course-instructor-my">${curso.categoria}</p>
                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-text">${curso.alunos} alunos</span>
                        <span class="progress-percentage">R$ ${parseFloat(curso.preco).toFixed(2)}</span>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn-continue" onclick="editarCurso(${curso.id})">Editar</button>
                    <button class="btn-icon" onclick="excluirCurso(${curso.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function adicionarAula() {
    aulaCount++;
    const container = document.getElementById('aulasContainer');
    const novaAula = document.createElement('div');
    novaAula.className = 'aula-item';
    novaAula.innerHTML = `
        <div class="aula-header">
            <h4>Aula ${aulaCount}</h4>
            <button type="button" class="btn-icon-small" onclick="removeAula(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-group">
            <label>Título da Aula</label>
            <input type="text" class="aula-titulo" placeholder="Ex: Introdução ao tema">
        </div>
        <div class="form-group">
            <label>Vídeo da Aula</label>
            <div class="upload-area-small">
                <i class="fas fa-video"></i>
                <span>Upload do vídeo</span>
                <input type="file" accept="video/*" hidden class="aula-video">
            </div>
        </div>
        <div class="form-group">
            <label>Duração (minutos)</label>
            <input type="number" class="aula-duracao" placeholder="Ex: 15">
        </div>
    `;
    container.appendChild(novaAula);
    showNotification('Aula adicionada!');
}

function removeAula(btn) {
    if (confirm('Deseja remover esta aula?')) {
        btn.closest('.aula-item').remove();
        showNotification('Aula removida');
    }
}

function editarCurso(id) {
    showNotification('Função de edição em desenvolvimento');
}

function excluirCurso(id) {
    if (confirm('Deseja realmente excluir este curso?')) {
        const index = professorCourses.findIndex(c => c.id === id);
        if (index > -1) {
            professorCourses.splice(index, 1);
            updateProfessorStats();
            showNotification('Curso excluído');
        }
    }
}