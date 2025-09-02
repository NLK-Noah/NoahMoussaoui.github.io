const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.carousel-dots');

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

function updateCarousel() {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Navigation
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
cards[0].parentElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

cards[0].parentElement.addEventListener('touchend', (e) => {
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
