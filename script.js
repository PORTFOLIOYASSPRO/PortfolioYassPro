// ============= Hamburger Menu =============
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ============= Terminal Effect =============
document.addEventListener('DOMContentLoaded', function() {
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
        const lines = terminalContent.querySelectorAll('p');
        lines.forEach((line, index) => {
            line.style.animation = `fadeIn 0.5s ease ${index * 0.2}s both`;
        });
    }
});

// ============= Scroll Animations for Visible Elements =============
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .cert-card, .stat-card, .achievement').forEach(element => {
        observer.observe(element);
    });
});

// ============= Projects Filter & Pagination =============
document.addEventListener('DOMContentLoaded', function() {
    const allProjects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (allProjects.length === 0) return;
    
    let currentFilter = 'all';
    let currentPage = 1;
    const projectsPerPage = 3;
    
    // Fonction pour générer les boutons de pagination
    function generatePaginationButtons() {
        let filteredProjects = Array.from(allProjects).filter(project => {
            if (currentFilter === 'all') return true;
            return project.getAttribute('data-category') === currentFilter;
        });
        
        const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        paginationContainer.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn';
            if (i === 1) btn.classList.add('active');
            btn.setAttribute('data-page', i);
            btn.textContent = i;
            
            btn.addEventListener('click', function() {
                currentPage = i;
                const allButtons = document.querySelectorAll('.pagination-btn');
                allButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateProjectDisplay();
            });
            
            paginationContainer.appendChild(btn);
        }
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            generatePaginationButtons();
            updateProjectDisplay();
        });
    });
    
    function updateProjectDisplay() {
        let filteredProjects = Array.from(allProjects).filter(project => {
            if (currentFilter === 'all') return true;
            return project.getAttribute('data-category') === currentFilter;
        });
        
        allProjects.forEach(project => project.classList.add('hidden'));
        
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        filteredProjects.slice(startIndex, endIndex).forEach(project => {
            project.classList.remove('hidden');
        });
    }
    
    // Initialisation
    generatePaginationButtons();
    updateProjectDisplay();
});

// ============= Add Fade Animation Class & Styles =============
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        main {
            animation: fadeIn 0.5s ease;
        }

        .skill-card,
        .project-card,
        .cert-card,
        .stat-card,
        .achievement {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.5s ease;
        }

        .skill-card.visible,
        .project-card.visible,
        .cert-card.visible,
        .stat-card.visible,
        .achievement.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-link.active {
            color: var(--primary);
        }

        .nav-link.active::after {
            width: 100%;
        }

        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(5, 7, 15, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                padding: 20px 0;
                gap: 20px;
                border-bottom: 2px solid var(--primary);
                z-index: 999;
                max-height: calc(100vh - 70px);
                overflow-y: auto;
            }

            .nav-menu.active {
                left: 0;
            }

            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
});

// ============= Glitch Text Effect =============
document.addEventListener('DOMContentLoaded', function() {
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'glitch 0.5s ease';
            }, 10);
        });
    }
});

// ============= Level Bar Animation =============
document.addEventListener('DOMContentLoaded', function() {
    function animateLevelBars() {
        const levelBars = document.querySelectorAll('.level-bar');
        levelBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease';
                bar.style.width = width;
            }, 100);
        });
    }

    const checkPage = setInterval(() => {
        const skillCards = document.querySelectorAll('.skill-card');
        if (skillCards.length > 0) {
            animateLevelBars();
            clearInterval(checkPage);
        }
    }, 100);
});

// ============= CTA Button =============
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Le téléchargement se fait automatiquement via l'attribut download
            console.log('Téléchargement du CV REDSUP en cours...');
        });
    }
});

// ============= Add Glow to Links =============
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a:not(.nav-link)').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(0, 153, 255, 0.8)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
});

// ============= Highlight Active Nav Link =============
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

console.log('🛡️  Portfolio de Yassine WAAMAR chargé avec succès');
console.log('💻 Apprenti Cybersécurité | BTS SIO SISR | Gouvernance Cyber');
console.log('🌐 Architecture multi-pages responsive et moderne');
