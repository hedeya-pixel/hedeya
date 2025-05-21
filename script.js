document.addEventListener('DOMContentLoaded', function () {
    initThemeSwitcher();
    initParticles();
    initNavScroll();
    initCurrentYear();
    initScrollReveal();
    initFormValidation();
});

function initThemeSwitcher() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const toggleIcon = document.getElementById('toggle-icon');
    const nav = document.getElementById('nav');

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';

    if (currentTheme === 'dark') {
        toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        nav.style.backgroundColor = 'rgba(26, 28, 58, 0.8)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }

    toggleSwitch.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        toggleIcon.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
            
        nav.style.backgroundColor = newTheme === 'dark' 
            ? 'rgba(26, 28, 58, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    });
}

function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 150,
                density: { enable: true, value_area: 800 }
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.9, random: true },
            size: { value: 1.5, random: true },
            move: {
                enable: true,
                speed: 0.4,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });
}

function initNavScroll() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = '10px 0';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '15px 0';
            nav.style.boxShadow = 'none';
        }
        
        // Highlight active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function initCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

function initScrollReveal() {
    // You can add ScrollReveal library for better animations
    // This is a simple implementation without external library
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Message sent successfully! I will contact you soon.');
            form.reset();
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}