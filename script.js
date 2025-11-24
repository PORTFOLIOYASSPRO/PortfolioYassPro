// ============= Navigation System (No Scroll - Buttons Only) =============
let currentSection = 'home';

function hideAllSections() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
        section.style.animation = 'none';
    });
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.style.animation = 'fadeIn 0.5s ease';
    }
}

function navigateToSection(sectionId) {
    if (sectionId === currentSection) return;
    
    // Hide all sections
    hideAllSections();
    
    // Show new section
    showSection(sectionId);
    
    currentSection = sectionId;
    updateActiveNav();
}

// Update active navigation link
function updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize - show home section
document.addEventListener('DOMContentLoaded', function() {
    hideAllSections();
    showSection('home');
    updateActiveNav();
});

// ============= Setup navigation links =============
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            console.log('Navigating to:', targetId);
            navigateToSection(targetId);
        });
    });
});

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

// ============= Scroll Animations for Visible Sections =============
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1
    };

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
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    let currentFilter = 'all';
    let currentPage = 1;
    const projectsPerPage = 3; // 3 projects per row
    
    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            
            // Update active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Reset pagination buttons
            paginationButtons.forEach(b => {
                b.classList.remove('active');
                if (b.getAttribute('data-page') === '1') {
                    b.classList.add('active');
                }
            });
            
            updateProjectDisplay();
        });
    });
    
    // Pagination functionality
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentPage = parseInt(this.getAttribute('data-page'));
            
            // Update active pagination button
            paginationButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            updateProjectDisplay();
        });
    });
    
    function updateProjectDisplay() {
        // Filter projects based on current filter
        let filteredProjects = Array.from(allProjects).filter(project => {
            if (currentFilter === 'all') return true;
            return project.getAttribute('data-category') === currentFilter;
        });
        
        // Calculate total pages
        const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        
        // Hide all projects
        allProjects.forEach(project => {
            project.classList.add('hidden');
        });
        
        // Show projects for current page
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        filteredProjects.slice(startIndex, endIndex).forEach(project => {
            project.classList.remove('hidden');
        });
        
        // Disable pagination buttons that don't have valid pages
        paginationButtons.forEach(btn => {
            const pageNum = parseInt(btn.getAttribute('data-page'));
            if (pageNum > totalPages) {
                btn.style.opacity = '0.5';
                btn.style.pointerEvents = 'none';
                btn.style.cursor = 'not-allowed';
            } else {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
            }
        });
    }
    
    // Initial display
    updateProjectDisplay();
});

// ============= Add Fade Animation Class =============
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        section {
            min-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            display: none;
            scroll-behavior: smooth;
        }

        section#home {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        section {
            padding-top: 70px;
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

    // Check if skills section is visible
    let skillsAnimated = false;
    const checkSkills = setInterval(() => {
        if (currentSection === 'skills' && !skillsAnimated) {
            skillsAnimated = true;
            animateLevelBars();
            clearInterval(checkSkills);
        }
    }, 100);
});

// ============= Counter Animation =============
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isYear = finalValue.includes('2024') || finalValue.includes('2025');
        
        if (!isYear) {
            stat.style.opacity = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && stat.style.opacity === '0') {
                        stat.style.transition = 'opacity 0.5s ease';
                        stat.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(stat);
        }
    });
}

animateCounters();

// ============= CTA Button =============
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        alert('Téléchargement du CV en cours...\n\nCV de Yassine Belkacem - Expert en Cybersécurité');
    });
}

// ============= Disable Scroll =============
window.addEventListener('wheel', (e) => {
    const activeSection = document.querySelector('section[style*="display: block"]');
    
    // Allow scroll only if we're scrolling within a section and the section is scrollable
    if (activeSection) {
        const isScrollable = activeSection.scrollHeight > activeSection.clientHeight;
        if (!isScrollable) {
            e.preventDefault();
        }
    } else {
        e.preventDefault();
    }
}, { passive: false });

window.addEventListener('scroll', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('keydown', (e) => {
    const activeSection = document.querySelector('section[style*="display: block"]');
    
    // Allow arrow keys only if section is scrollable
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) {
        if (activeSection) {
            const isScrollable = activeSection.scrollHeight > activeSection.clientHeight;
            if (!isScrollable && e.target === document.body) {
                e.preventDefault();
            }
        } else if (e.target === document.body) {
            e.preventDefault();
        }
    }
    
    // Space key
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
    }

    // Escape to close menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
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

// ============= Disable Scroll =============
window.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

window.addEventListener('scroll', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('keydown', (e) => {
    // Disable arrow keys and Page Up/Down for scrolling
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }

    // Escape to close menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ============= Terminal Typing Effect =============
document.addEventListener('DOMContentLoaded', function() {
    function typeTerminal() {
        const terminal = document.querySelector('.terminal-content');
        if (!terminal) return;

        const lines = [
            { type: 'cmd', text: '$ whoami' },
            { type: 'output', text: 'security_expert@yassine' },
            { type: 'cmd', text: '$ status' },
            { type: 'output', text: 'System Protected ✓' },
            { type: 'cmd', text: '$ _' }
        ];

        let lineIndex = 0;

        function typeLine() {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                lineIndex++;
                typeNextLine();
            }
        }

        function typeNextLine() {
            if (lineIndex < lines.length) {
                setTimeout(typeLine, 500);
            }
        }

        typeLine();
    }

    typeTerminal();
});

console.log('🛡️  Portfolio de Yassine Belkacem chargé avec succès');
console.log('💻 Cybersécurité - Master - Ethical Hacking');
console.log('⚠️  Navigation par boutons uniquement - Scroll désactivé');

// ============= CTA Button =============
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert('Téléchargement du CV en cours...\n\nCV de Yassine Belkacem - Expert en Cybersécurité');
        });
    }
});
