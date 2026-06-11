/* ============================================
   CTIR — script.js
   Shared across index.html, projects.html, about.html

   Sections:
     1. MOBILE NAVIGATION  — hamburger toggle + auto-close
     2. SCROLL EVENTS      — back-to-top button, navbar
                             transparency, scroll-progress bar
     3. SCROLL REVEAL      — word-by-word heading fill effect
   ============================================ */


/* ============================================
   1. MOBILE NAVIGATION
   Hamburger button toggles the .open class on
   .nav-links; clicking any link closes the menu.
   ============================================ */

function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('open');
    });
});


/* ============================================
   2. SCROLL EVENTS
   - Back-to-top button fades in after 300px
   - Navbar goes solid after scrolling past the
     hero (homepage only; inner pages stay solid)
   - Scroll-progress bar fills across the top
   ============================================ */

const backToTopBtn = document.getElementById('back-to-top');
const progressBar  = document.getElementById('scroll-progress');
const navbar       = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    // Back-to-top visibility
    backToTopBtn.classList.toggle('visible', scrollY > 300);

    // Navbar: transparent over hero on homepage only
    if (document.querySelector('#hero')) {
        navbar.classList.toggle('scrolled', scrollY > window.innerHeight * 0.8);
    }

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((scrollY / docHeight) * 100) + '%';
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================
   3. SCROLL REVEAL
   Splits each .story-text h1/h2 into word spans.
   Words fill from gray to black as the heading
   scrolls into the viewport.
   ============================================ */

document.querySelectorAll('.story-text h2, .story-text h1').forEach(heading => {
    const words = heading.textContent.split(' ');
    heading.innerHTML = words.map((word, i) =>
        `<span class="reveal-word" style="transition-delay:${i * 0.12}s">${word} </span>`
    ).join('');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.querySelectorAll('.reveal-word').forEach(word => {
            word.classList.toggle('revealed', entry.isIntersecting);
        });
    });
}, { threshold: 0.3 });

document.querySelectorAll('.story-text h2, .story-text h1').forEach(h => revealObserver.observe(h));
