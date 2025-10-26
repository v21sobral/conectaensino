// Extended course database with descriptions and levels
const allCourses = [
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
        description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero. Construa projetos reais e torne-se um desenvolvedor web completo."
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
        description: "Domine Python desde os fundamentos até tópicos avançados. Ideal para iniciantes em programação."
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
        description: "Aprenda estratégias de marketing digital, SEO, redes sociais e Google Ads para impulsionar seu negócio."
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
        description: "Domine Photoshop, Illustrator e InDesign. Crie designs profissionais para mídias digitais e impressas."
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
        description: "Aprenda fórmulas avançadas, tabelas dinâmicas, macros e automatização para otimizar seu trabalho."
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
        description: "Aprenda ES6+, async/await, APIs, frameworks modernos e construa aplicações web interativas."
    },
    {
        id: 7,
        title: "Fotografia Digital do Básico ao Avançado",
        instructor: "Fernando Rocha",
        rating: 4.7,
        reviews: 4567,
        students: 15600,
        price: 74.90,
        oldPrice: 159.90,
        icon: "fa-camera-retro",
        category: "fotografia",
        level: "iniciante",
        description: "Aprenda técnicas de fotografia, composição, iluminação e edição para criar fotos incríveis."
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
        description: "Domine Scrum, Kanban e metodologias ágeis para gerenciar projetos com eficiência."
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
        description: "Aprenda a criar interfaces intuitivas e experiências incríveis usando Figma e princípios de UX."
    },
    {
        id: 10,
        title: "Administração de Redes e Servidores",
        instructor: "Rafael Santos",
        rating: 4.6,
        reviews: 3421,
        students: 12800,
        price: 109.90,
        oldPrice: 239.90,
        icon: "fa-network-wired",
        category: "ti",
        level: "avancado",
        description: "Configure e gerencie servidores Linux, redes corporativas e infraestrutura de TI."
    },
    {
        id: 11,
        title: "SEO e Otimização de Sites",
        instructor: "Camila Rodrigues",
        rating: 4.7,
        reviews: 5678,
        students: 31200,
        price: 69.90,
        oldPrice: 159.90,
        icon: "fa-search-dollar",
        category: "marketing",
        level: "iniciante",
        description: "Aprenda técnicas de SEO para ranquear seu site no Google e aumentar o tráfego orgânico."
    },
    {
        id: 12,
        title: "Edição de Vídeo Profissional",
        instructor: "Bruno Martins",
        rating: 4.8,
        reviews: 4321,
        students: 18900,
        price: 89.90,
        oldPrice: 199.90,
        icon: "fa-video",
        category: "design",
        level: "intermediario",
        description: "Domine Adobe Premiere e DaVinci Resolve para criar vídeos profissionais para YouTube e redes sociais."
    },
    {
        id: 13,
        title: "React do Zero ao Profissional",
        instructor: "André Silva",
        rating: 4.9,
        reviews: 9876,
        students: 35600,
        price: 94.90,
        oldPrice: 209.90,
        icon: "fa-react",
        category: "desenvolvimento",
        level: "intermediario",
        description: "Aprenda React, Redux, Hooks e Next.js para construir aplicações web modernas e escaláveis."
    },
    {
        id: 14,
        title: "Data Science com Python",
        instructor: "Beatriz Lima",
        rating: 4.8,
        reviews: 7654,
        students: 24300,
        price: 99.90,
        oldPrice: 219.90,
        icon: "fa-chart-bar",
        category: "desenvolvimento",
        level: "avancado",
        description: "Aprenda análise de dados, machine learning e visualização com Pandas, NumPy e Scikit-learn."
    },
    {
        id: 15,
        title: "Marketing de Conteúdo e Copywriting",
        instructor: "Rodrigo Costa",
        rating: 4.7,
        reviews: 5432,
        students: 22100,
        price: 74.90,
        oldPrice: 169.90,
        icon: "fa-pen-fancy",
        category: "marketing",
        level: "iniciante",
        description: "Aprenda a criar conteúdos que convertem e técnicas de copywriting para vender mais."
    }
];

// Favorites stored in memory (in a real app, this would be in localStorage or backend)
let favorites = [];

// Get search query from URL
function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// Render search results
function renderResults(courses) {
    const resultsGrid = document.getElementById('resultsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = courses.length;

    if (courses.length === 0) {
        resultsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    resultsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsGrid.innerHTML = '';

    courses.forEach(course => {
        const isFavorited = favorites.includes(course.id);
        const levelText = {
            'iniciante': 'Iniciante',
            'intermediario': 'Intermediário',
            'avancado': 'Avançado'
        };

        const courseCard = document.createElement('div');
        courseCard.className = 'result-card';
        courseCard.innerHTML = `
            <div class="result-image">
                <i class="fas ${course.icon}"></i>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${course.id}">
                    <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
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
                    <button class="enroll-btn" data-id="${course.id}">Fazer Curso</button>
                </div>
            </div>
        `;
        resultsGrid.appendChild(courseCard);
    });

    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });

    // Add event listeners to enroll buttons
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const courseId = parseInt(btn.dataset.id);
            const course = allCourses.find(c => c.id === courseId);
            alert(`Você será redirecionado para a página do curso:\n\n"${course.title}"\n\nInstrutor: ${course.instructor}\nPreço: R$ ${course.price.toFixed(2)}`);
            // Here you would redirect to the course page
            // window.location.href = `curso.html?id=${courseId}`;
        });
    });
}

// Toggle favorite
function toggleFavorite(courseId) {
    const index = favorites.indexOf(courseId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(courseId);
    }

    // Update UI
    const btn = document.querySelector(`.favorite-btn[data-id="${courseId}"]`);
    const icon = btn.querySelector('i');
    
    if (favorites.includes(courseId)) {
        btn.classList.add('favorited');
        icon.className = 'fas fa-heart';
        showNotification('Adicionado aos favoritos! ❤️');
    } else {
        btn.classList.remove('favorited');
        icon.className = 'far fa-heart';
        showNotification('Removido dos favoritos');
    }

    console.log('Favoritos:', favorites);
}

// Show notification
function showNotification(message) {
    // Create notification element
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

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filter courses
function filterCourses(courses, filter) {
    if (filter === 'all') return courses;
    
    if (filter === 'mais-vendidos') {
        return [...courses].sort((a, b) => b.students - a.students);
    }
    
    if (filter === 'melhor-avaliados') {
        return [...courses].sort((a, b) => b.rating - a.rating);
    }
    
    return courses.filter(course => course.level === filter);
}

// Initialize page
window.addEventListener('load', function() {
    const searchQuery = getSearchQuery();
    const searchTitle = document.getElementById('searchTitle');
    const searchInput = document.getElementById('searchInput');

    // Set search query in title and input
    searchTitle.textContent = `Resultados para "${searchQuery}"`;
    searchInput.value = searchQuery;

    // Filter courses based on search query
    let filteredCourses = allCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render initial results
    renderResults(filteredCourses);

    // Search functionality
    if (searchInput) {
        const searchIcon = document.querySelector('.search-bar i');
        
        // Function to perform search
        const performSearch = () => {
            const newSearch = searchInput.value.trim();
            if (newSearch) {
                window.location.href = `pesquisa.html?q=${encodeURIComponent(newSearch)}`;
            }
        };

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Search on icon click
        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', (e) => {
                e.preventDefault();
                performSearch();
            });
        }
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Apply filter
            const filter = btn.dataset.filter;
            const filtered = filterCourses(filteredCourses, filter);
            renderResults(filtered);
        });
    });

    // Redirect buttons
    const btnEntrar = document.getElementById('btnEntrar');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    // Open modal when clicking "Entrar"
    if (btnEntrar) {
        btnEntrar.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (modal && e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            // Simulate successful login
            const userData = {
                name: email.split('@')[0],
                email: email,
                isLoggedIn: true
            };
            
            // Save to sessionStorage
            sessionStorage.setItem('user', JSON.stringify(userData));
            
            showNotification('Login realizado com sucesso! Redirecionando...');
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Redirect to meus-cursos.html
            setTimeout(() => {
                window.location.href = 'meus-cursos.html';
            }, 1000);
        });
    }

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', () => {
            window.location.href = 'cadastro.html';
        });
    }
});