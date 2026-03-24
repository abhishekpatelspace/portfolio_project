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

// Update radial gradients based on pointer location (throttled via requestAnimationFrame)
const root = document.documentElement;
let pointerUpdateScheduled = false;
const pointerCoords = { x: 50, y: 50 };

const flushPointerUpdate = () => {
    root.style.setProperty('--pointer-x', `${pointerCoords.x}%`);
    root.style.setProperty('--pointer-y', `${pointerCoords.y}%`);
    pointerUpdateScheduled = false;
};

document.addEventListener('mousemove', (event) => {
    pointerCoords.x = (event.clientX / window.innerWidth) * 100;
    pointerCoords.y = (event.clientY / window.innerHeight) * 100;
    if (!pointerUpdateScheduled) {
        pointerUpdateScheduled = true;
        requestAnimationFrame(flushPointerUpdate);
    }
});

const initializeTechBackground = () => {
    const techBg = document.getElementById('techBg');
    if (!techBg) {
        return;
    }

    const glowLayer = document.createElement('div');
    glowLayer.className = 'tech-glow';
    techBg.appendChild(glowLayer);

    for (let i = 0; i < 8; i++) {
        const hLine = document.createElement('div');
        hLine.className = 'grid-line horizontal';
        hLine.style.top = `${i * 12}%`;
        hLine.style.animationDelay = `${i * 0.5}s`;
        techBg.appendChild(hLine);

        const vLine = document.createElement('div');
        vLine.className = 'grid-line vertical';
        vLine.style.left = `${i * 12}%`;
        vLine.style.animationDelay = `${i * 0.3}s`;
        techBg.appendChild(vLine);
    }

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${8 + Math.random() * 10}s`;
        techBg.appendChild(particle);
    }
};

initializeTechBackground();

const palettes = [
    {
        name: 'Aurora',
        primary: 'rgba(59, 130, 246, 0.25)',
        secondary: 'rgba(236, 72, 153, 0.3)',
        tertiary: 'rgba(16, 185, 129, 0.25)',
        glow: 'rgba(99, 102, 241, 0.4)',
        heroAccent: 'rgba(59, 130, 246, 0.3)',
        gridLight: 'rgba(100, 255, 218, 0.12)',
        gridStrong: 'rgba(100, 255, 218, 0.3)',
        particleColor: 'rgba(100, 255, 218, 0.8)'
    },
    {
        name: 'Solar Flare',
        primary: 'rgba(252, 165, 3, 0.3)',
        secondary: 'rgba(239, 68, 68, 0.25)',
        tertiary: 'rgba(234, 179, 8, 0.25)',
        glow: 'rgba(245, 158, 11, 0.45)',
        heroAccent: 'rgba(245, 158, 11, 0.4)',
        gridLight: 'rgba(245, 158, 11, 0.12)',
        gridStrong: 'rgba(245, 158, 11, 0.3)',
        particleColor: 'rgba(255, 234, 167, 0.8)'
    },
    {
        name: 'Midnight Bloom',
        primary: 'rgba(129, 140, 248, 0.3)',
        secondary: 'rgba(147, 51, 234, 0.25)',
        tertiary: 'rgba(14, 165, 233, 0.2)',
        glow: 'rgba(59, 130, 246, 0.55)',
        heroAccent: 'rgba(14, 165, 233, 0.35)',
        gridLight: 'rgba(59, 130, 246, 0.15)',
        gridStrong: 'rgba(59, 130, 246, 0.35)',
        particleColor: 'rgba(140, 200, 255, 0.8)'
    }
];

const backgroundBtn = document.getElementById('background-toggle');
const backgroundLabel = document.getElementById('bg-palette-label');
let paletteIndex = 0;

const applyPalette = (palette) => {
    root.style.setProperty('--ambient-primary', palette.primary);
    root.style.setProperty('--ambient-secondary', palette.secondary);
    root.style.setProperty('--ambient-tertiary', palette.tertiary);
    root.style.setProperty('--glow-color', palette.glow);
    root.style.setProperty('--hero-accent', palette.heroAccent);
    root.style.setProperty('--grid-light', palette.gridLight);
    root.style.setProperty('--grid-strong', palette.gridStrong);
    root.style.setProperty('--particle-color', palette.particleColor);
    if (backgroundLabel) {
        backgroundLabel.textContent = palette.name;
    }
};

const githubValue = document.querySelector('#github-widget .widget-value');
const githubMeta = document.getElementById('github-meta');
const githubSubtext = document.getElementById('github-subtext');
const mediumMeta = document.getElementById('medium-meta');
const mediumLink = document.getElementById('medium-link');
const mediumWidget = document.querySelector('#medium-widget .widget-value');
const kaggleValue = document.getElementById('kaggle-value');
const kaggleSubtext = document.getElementById('kaggle-subtext');
const visitorValue = document.getElementById('visitor-value');
const visitorMeta = document.getElementById('visitor-meta');
const visitorSubtext = document.getElementById('visitor-subtext');

const fetchGitHubPulse = async () => {
    if (!githubValue || !githubMeta || !githubSubtext) return;
    githubValue.textContent = 'Loading stats...';
    try {
        const response = await fetch('https://api.github.com/users/abhishekpatelspace');
        if (!response.ok) {
            throw new Error('GitHub API error');
        }
        const data = await response.json();
        githubValue.textContent = `${data.followers.toLocaleString()} followers`;
        githubMeta.textContent = `${data.public_repos} public repos`;
        githubSubtext.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch (error) {
        githubValue.textContent = 'Unavailable';
        githubMeta.textContent = 'Could not reach GitHub';
        githubSubtext.textContent = 'Try again later';
        console.error('GitHub pulse failed', error);
    }
};

const fetchMediumDispatch = async () => {
    if (!mediumWidget || !mediumMeta || !mediumLink) return;
    mediumWidget.textContent = 'Awaiting story...';
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abhishekpatelspace');
        if (!response.ok) {
            throw new Error('Medium RSS error');
        }
        const payload = await response.json();
        const items = payload.items || [];
        if (items.length === 0) {
            throw new Error('No articles found');
        }
        const latest = items[0];
        mediumWidget.textContent = latest.title;
        mediumMeta.textContent = new Date(latest.pubDate).toLocaleDateString();
        mediumLink.href = latest.link;
        mediumLink.textContent = 'Read on Medium';
    } catch (error) {
        mediumWidget.textContent = 'Stories offline';
        mediumMeta.textContent = 'Could not fetch feed';
        mediumLink.textContent = 'Visit Medium';
        mediumLink.href = 'https://medium.com/@abhishekpatelspace';
        console.error('Medium dispatch failed', error);
    }
};

const fetchKaggleSignal = async () => {
    if (!kaggleValue || !kaggleSubtext) return;
    kaggleValue.textContent = 'Syncing...';
    try {
        const response = await fetch('https://api.countapi.xyz/get/portfolio/kaggle-ranking');
        if (!response.ok) {
            throw new Error('Count API error');
        }
        const data = await response.json();
        const rank = data.value ? data.value.toLocaleString() : '—';
        kaggleValue.textContent = `Ranked #${rank}`;
        kaggleSubtext.textContent = 'Live cache from countapi.xyz';
    } catch (error) {
        kaggleValue.textContent = 'Rank data offline';
        kaggleSubtext.textContent = 'Manual update soon';
        console.error('Kaggle signal failed', error);
    }
};

const fetchVisitorCount = async () => {
    if (!visitorValue || !visitorMeta) return;
    visitorValue.textContent = 'Loading...';
    try {
        // Swap this endpoint with your own API that records hits in a database if needed.
        const response = await fetch('https://api.countapi.xyz/hit/abhishekpatelspace/portfolio_visits');
        if (!response.ok) {
            throw new Error('Count API error');
        }
        const payload = await response.json();
        const count = payload.value ? payload.value.toLocaleString() : '—';
        visitorValue.textContent = `${count}`;
        visitorMeta.textContent = `Last refreshed ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        visitorSubtext.textContent = 'Realtime hits (CountAPI)';
    } catch (error) {
        const fallbackCount = Number(localStorage.getItem('visitorFallback')) || 0;
        const updatedFallback = fallbackCount + 1;
        localStorage.setItem('visitorFallback', updatedFallback);
        visitorValue.textContent = `${updatedFallback.toLocaleString()} (local)`;
        visitorMeta.textContent = 'Offline mode';
        visitorSubtext.textContent = 'Incremented locally; hook your own service for true counts.';
        console.warn('Visitor counter failed, using local fallback', error);
    }
};

const refreshLiveWidgets = () => {
    fetchGitHubPulse();
    fetchMediumDispatch();
    fetchKaggleSignal();
    fetchVisitorCount();
};

refreshLiveWidgets();
setInterval(refreshLiveWidgets, 5 * 60 * 1000);

if (backgroundBtn) {
    backgroundBtn.addEventListener('click', () => {
        paletteIndex = (paletteIndex + 1) % palettes.length;
        applyPalette(palettes[paletteIndex]);
        backgroundBtn.classList.add('pulse');
        setTimeout(() => backgroundBtn.classList.remove('pulse'), 1000);
    });
}

applyPalette(palettes[paletteIndex]);

// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
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

const storySteps = document.querySelectorAll('.story-step');
let storyPulseTimeout;

const pulseStoryGlow = () => {
    root.style.setProperty('--story-pulse', '0.65');
    clearTimeout(storyPulseTimeout);
    storyPulseTimeout = setTimeout(() => {
        root.style.setProperty('--story-pulse', '0');
    }, 1200);
};

if (storySteps.length) {
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                pulseStoryGlow();
            }
        });
    }, { threshold: 0.45 });
    storySteps.forEach(step => storyObserver.observe(step));
}

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
