// ======= CAROUSEL =======

const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.carousel-dots');
const track = document.querySelector('.carousel-track');

let currentIndex = 0;

// Crée les dots dynamiquement
cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
    });
});

const dots = document.querySelectorAll('.dot');

// Fonction pour mettre à jour le carousel
function updateCarousel() {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Navigation boutons
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

// Swipe tactile
let startX = 0;
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
        currentIndex = (currentIndex + 1) % cards.length;
    } else if (endX > startX + 50) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    updateCarousel();
});

// Initialisation
updateCarousel();

// Auto-slide toutes les 5 secondes
const autoSlideDelay = 5000;
let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}, autoSlideDelay);

// Stop auto-slide au survol et reprend au mouseleave
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }, autoSlideDelay);
});

// ======= BACKGROUND DE LA PRÉSENTATION =======

const bgImages = document.querySelectorAll(".presentation-background img");
let currentBg = 0;

setInterval(() => {
    bgImages.forEach((img, i) => img.classList.toggle("active", i === currentBg));
    currentBg = (currentBg + 1) % bgImages.length;
}, 3000);
