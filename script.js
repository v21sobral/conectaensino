// Course data
const courses = [
    {
        title: "Desenvolvimento Web Completo 2025",
        instructor: "João Silva",
        rating: 4.8,
        reviews: 12543,
        price: 89.90,
        oldPrice: 199.90,
        icon: "fa-laptop-code",
        category: "desenvolvimento"
    },
    {
        title: "Python do Zero ao Avançado",
        instructor: "Maria Santos",
        rating: 4.9,
        reviews: 8932,
        price: 79.90,
        oldPrice: 189.90,
        icon: "fa-python",
        category: "desenvolvimento"
    },
    {
        title: "Marketing Digital Completo",
        instructor: "Carlos Oliveira",
        rating: 4.7,
        reviews: 6721,
        price: 69.90,
        oldPrice: 169.90,
        icon: "fa-chart-line",
        category: "marketing"
    },
    {
        title: "Design Gráfico Profissional",
        instructor: "Ana Costa",
        rating: 4.8,
        reviews: 5432,
        price: 84.90,
        oldPrice: 179.90,
        icon: "fa-pen-nib",
        category: "design"
    },
    {
        title: "Excel Avançado para Negócios",
        instructor: "Roberto Alves",
        rating: 4.6,
        reviews: 9876,
        price: 59.90,
        oldPrice: 149.90,
        icon: "fa-file-excel",
        category: "negocios"
    },
    {
        title: "JavaScript Moderno Completo",
        instructor: "Patricia Lima",
        rating: 4.9,
        reviews: 11234,
        price: 94.90,
        oldPrice: 209.90,
        icon: "fa-js",
        category: "desenvolvimento"
    },
    {
        title: "Fotografia Digital do Básico ao Avançado",
        instructor: "Fernando Rocha",
        rating: 4.7,
        reviews: 4567,
        price: 74.90,
        oldPrice: 159.90,
        icon: "fa-camera-retro",
        category: "fotografia"
    },
    {
        title: "Gestão de Projetos Ágil",
        instructor: "Juliana Ferreira",
        rating: 4.8,
        reviews: 7890,
        price: 89.90,
        oldPrice: 189.90,
        icon: "fa-tasks",
        category: "negocios"
    },
    {
        title: "UI/UX Design Completo",
        instructor: "Lucas Mendes",
        rating: 4.9,
        reviews: 6543,
        price: 99.90,
        oldPrice: 219.90,
        icon: "fa-mobile-alt",
        category: "design"
    },
    {
        title: "Administração de Redes e Servidores",
        instructor: "Rafael Santos",
        rating: 4.6,
        reviews: 3421,
        price: 109.90,
        oldPrice: 239.90,
        icon: "fa-network-wired",
        category: "ti"
    },
    {
        title: "SEO e Otimização de Sites",
        instructor: "Camila Rodrigues",
        rating: 4.7,
        reviews: 5678,
        price: 69.90,
        oldPrice: 159.90,
        icon: "fa-search-dollar",
        category: "marketing"
    },
    {
        title: "Edição de Vídeo Profissional",
        instructor: "Bruno Martins",
        rating: 4.8,
        reviews: 4321,
        price: 89.90,
        oldPrice: 199.90,
        icon: "fa-video",
        category: "design"
    }
];

// Generate course cards
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

// Wait for DOM to be fully loaded
window.addEventListener('load', function() {
    console.log('Página carregada!');
    
    // Check if user is logged in
    checkUserSession();
    
    // Initial render
    renderCourses(courses);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-bar i');
    
    if (searchInput) {
        // Function to perform search
        const performSearch = () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Redirecionando para pesquisa:', searchTerm);
                window.location.href = `pesquisa.html?q=${encodeURIComponent(searchTerm)}`;
            }
        };

        // Search on Enter key - redirects to search page
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

        // Real-time filter on home page (optional - filters courses on same page)
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm === '') {
                // Show all courses if search is empty
                renderCourses(courses);
                return;
            }
            const filteredCourses = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm)
            );
            renderCourses(filteredCourses);
        });
    }

    // Category filter
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filteredCourses = courses.filter(course => 
                course.category === category
            );
            renderCourses(filteredCourses);
            
            // Scroll to courses section
            document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Course card click
    document.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        if (courseCard) {
            console.log('Curso clicado!');
        }
    });

    // Modal Login functionality
    const btnEntrar = document.getElementById('btnEntrar');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const modal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    console.log('Botão Entrar:', btnEntrar);
    console.log('Botão Cadastrar:', btnCadastrar);
    console.log('Modal:', modal);

    // Open modal when clicking "Entrar"
    if (btnEntrar) {
        btnEntrar.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão Entrar clicado!');
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                console.log('Modal aberto!');
            } else {
                console.error('Modal não encontrado!');
            }
        });
    } else {
        console.error('Botão Entrar não encontrado!');
    }

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            console.log('Fechar modal clicado!');
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
                console.log('Clicou fora do modal!');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (modal && e.key === 'Escape' && modal.style.display === 'block') {
            console.log('ESC pressionado!');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login attempt:', { email, password });
            alert('Login realizado com sucesso!\n\nEmail: ' + email);
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Redirect to registration page when clicking "Cadastrar"
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão Cadastrar clicado!');
            console.log('Redirecionando para cadastro.html...');
            window.location.href = 'cadastro.html';
        });
    } else {
        console.error('Botão Cadastrar não encontrado!');
    }
});