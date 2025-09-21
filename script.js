// This function was originally in the middle of the HTML. It's moved here for a static site.
// Note: For a truly static site, you would need to pre-load these projects or remove this fetch call.
async function loadProjects() {
    // For a static site, this fetch call to a local server won't work.
    // You would need to either:
    // 1. Remove this function and hardcode the projects in the HTML (as you already have).
    // 2. Use a static site generator or pre-build step to populate this.
    // 3. Host the API endpoint elsewhere.
    /*
    const res = await fetch("http://localhost:5000/projects");
    const projects = await res.json();
    const container = document.getElementById("projects-container");
    projects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition";
        card.innerHTML = `
            <h3 class="text-xl font-bold text-white mb-2">${proj.title}</h3>
            <p class="text-gray-400 mb-4">${proj.description}</p>
            <a href="${proj.link}" target="_blank" class="text-blue-500 hover:underline">View Project</a>
        `;
        container.appendChild(card);
    });
    */
    console.log("loadProjects function called. For a static site, projects should be hardcoded in HTML.");
}

// Initialize animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Initialize Vanta.js background
VANTA.GLOBE({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3b82f6,
    backgroundColor: 0x111827,
    size: 0.8
});

// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        const menu = document.getElementById('mobile-menu');
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const responseDiv = document.getElementById('form-response');
    // Simulate form submission (in a real app, you would use fetch or axios)
    setTimeout(() => {
        responseDiv.classList.remove('hidden');
        responseDiv.innerHTML = `
            <div class="p-4 bg-green-900 text-green-300 rounded-lg">
                Thank you for your message! I'll get back to you soon.
            </div>
        `;
        form.reset();
        // Hide message after 5 seconds
        setTimeout(() => {
            responseDiv.classList.add('hidden');
        }, 5000);
    }, 1000);
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill bars
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
};

// Call loadProjects on page load (commented out for static site)
// window.addEventListener('DOMContentLoaded', (event) => {
//     loadProjects();
// });