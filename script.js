document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a navigation link
    const navItems = document.querySelectorAll('.navbar-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // ======================
    // Smooth scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ======================
    // Navbar styling on scroll
    // ======================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ======================
    // Scroll animations
    // ======================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .education-item, .certification-item, .info-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    setTimeout(animateOnScroll, 500);
    window.addEventListener('scroll', animateOnScroll);

    // ======================
    // Contact Form Handling
    // ======================
    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); // stop redirect
            status.innerHTML = "⏳ Sending...";
            status.style.color = "orange";

            const data = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    status.innerHTML = "✅ Message sent successfully!";
                    status.style.color = "lightgreen";
                    form.reset();
                } else {
                    status.innerHTML = "❌ Oops! Something went wrong.";
                    status.style.color = "red";
                }
            } catch (error) {
                status.innerHTML = "⚠️ Network error. Try again later.";
                status.style.color = "red";
            }
        });
    }
});

// ======================
// Inject CSS for Animations
// ======================
const addAnimationCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .project-card, .skill-item, .education-item, .certification-item, .info-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .timeline-item.animate, .project-card.animate, .skill-item.animate, .education-item.animate, .certification-item.animate, .info-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-item:nth-child(2n), .certification-item:nth-child(2n), .info-item:nth-child(2n) {
            transition-delay: 0.1s;
        }
        .skill-item:nth-child(3n), .certification-item:nth-child(3n), .info-item:nth-child(3n) {
            transition-delay: 0.2s;
        }
        .navbar.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.98);
        }
        .hamburger.active .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.active .line2 {
            opacity: 0;
        }
        .hamburger.active .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
};
addAnimationCSS();
