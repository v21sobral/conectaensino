// Check if user is logged in
function checkAuth() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        // Redirect to home if not logged in
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(user);
}

// Simulated user data (in a real app, this would come from backend/localStorage)
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
            id: 3,
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
        },
        {
            id: 4,
            title: "Design Gráfico Profissional",
            instructor: "Ana Costa",
            icon: "fa-pen-nib",
            progress: 100,
            totalLessons: 85,
            completedLessons: 85,
            status: "completed",
            isFavorite: true,
            lastAccessed: "2024-12-28",
            totalHours: 32,
            certificate: true
        },
        {
            id: 5,
            title: "Marketing Digital Completo",
            instructor: "Carlos Oliveira",
            icon: "fa-chart-line",
            progress: 12,
            totalLessons: 75,
            completedLessons: 9,
            status: "in-progress",
            isFavorite: false,
            lastAccessed: "2025-01-18",
            totalHours: 28,
            certificate: false
        },
        {
            id: 6,
            title: "React do Zero ao Profissional",
            instructor: "André Silva",
            icon: "fa-react",
            progress: 88,
            totalLessons: 100,
            completedLessons: 88,
            status: "in-progress",
            isFavorite: true,
            lastAccessed: "2025-01-22",
            totalHours: 40,
            certificate: false
        }
    ]
};

let currentFilter = 'all';
let currentSort = 'recent';

// Render courses
function renderCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    const emptyState = document.getElementById('emptyState');

    if (courses.length === 0) {
        coursesGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    coursesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card-my';
        
        const statusBadge = course.status === 'completed' 
            ? '<span class="course-badge badge-completed">Concluído</span>'
            : `<span class="course-badge badge-in-progress">${course.progress}%</span>`;

        const actionButton = course.status === 'completed'
            ? `<button class="btn-certificate" onclick="downloadCertificate(${course.id})">
                <i class="fas fa-certificate"></i> Certificado
               </button>`
            : `<button class="btn-continue" onclick="continueCourse(${course.id})">
                Continuar Curso
               </button>`;

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
                    <button class="btn-icon ${course.isFavorite ? 'favorited' : ''}" onclick="toggleFavorite(${course.id})">
                        <i class="${course.isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        coursesGrid.appendChild(courseCard);
    });
}

// Filter courses
function filterCourses(filter) {
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

// Sort courses
function sortCourses(courses, sortBy) {
    const sorted = [...courses];

    if (sortBy === 'recent') {
        sorted.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
    } else if (sortBy === 'progress') {
        sorted.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'completed') {
        sorted.sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') return -1;
            if (a.status !== 'completed' && b.status === 'completed') return 1;
            return 0;
        });
    }

    return sorted;
}

// Update counts
function updateCounts() {
    const all = userData.enrolledCourses.length;
    const inProgress = userData.enrolledCourses.filter(c => c.status === 'in-progress').length;
    const completed = userData.enrolledCourses.filter(c => c.status === 'completed').length;
    const favorites = userData.enrolledCourses.filter(c => c.isFavorite).length;

    document.getElementById('countAll').textContent = all;
    document.getElementById('countProgress').textContent = inProgress;
    document.getElementById('countCompleted').textContent = completed;
    document.getElementById('countFavorites').textContent = favorites;

    // Update stats
    const totalHours = userData.enrolledCourses.reduce((sum, c) => sum + c.totalHours, 0);
    const totalCertificates = userData.enrolledCourses.filter(c => c.certificate).length;

    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalCertificates').textContent = totalCertificates;
}

// Toggle favorite
function toggleFavorite(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course) {
        course.isFavorite = !course.isFavorite;
        updateCounts();
        applyFiltersAndSort();
        showNotification(course.isFavorite ? 'Adicionado aos favoritos! ❤️' : 'Removido dos favoritos');
    }
}

// Continue course
function continueCourse(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course) {
        alert(`Continuando o curso:\n\n"${course.title}"\n\nProgresso atual: ${course.progress}%\nPróxima aula: ${course.completedLessons + 1}/${course.totalLessons}`);
        // In a real app, redirect to course player
        // window.location.href = `curso-player.html?id=${courseId}`;
    }
}

// Download certificate
function downloadCertificate(courseId) {
    const course = userData.enrolledCourses.find(c => c.id === courseId);
    if (course && course.certificate) {
        alert(`Certificado do curso:\n\n"${course.title}"\n\nParabéns por concluir este curso!\nSeu certificado está sendo gerado...`);
        showNotification('Certificado baixado com sucesso! 🎓');
        // In a real app, would download PDF certificate
        // window.open(`certificates/${courseId}.pdf`, '_blank');
    }
}

// Show notification
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

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Apply filters and sort
function applyFiltersAndSort() {
    let courses = filterCourses(currentFilter);
    courses = sortCourses(courses, currentSort);
    renderCourses(courses);
}

// Search courses
function searchCourses(searchTerm) {
    let courses = filterCourses(currentFilter);
    
    if (searchTerm) {
        courses = courses.filter(c => 
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    courses = sortCourses(courses, currentSort);
    renderCourses(courses);
}

// Initialize page
window.addEventListener('load', function() {
    // Set user name
    document.getElementById('userName').textContent = userData.name;

    // Update counts
    updateCounts();

    // Render initial courses
    applyFiltersAndSort();

    // Sidebar menu filter
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Apply filter
            currentFilter = link.dataset.filter;
            applyFiltersAndSort();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }

    // Course search
    const courseSearch = document.getElementById('courseSearch');
    if (courseSearch) {
        courseSearch.addEventListener('input', (e) => {
            searchCourses(e.target.value);
        });
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

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            userBtn.classList.remove('active');
            dropdownMenu.classList.remove('show');
        });

        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Deseja realmente sair?')) {
                showNotification('Logout realizado com sucesso!');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }

    // Search bar in header
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-bar i');
    
    if (searchInput) {
        const performSearch = () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `pesquisa.html?q=${encodeURIComponent(searchTerm)}`;
            }
        };

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', (e) => {
                e.preventDefault();
                performSearch();
            });
        }
    }
});