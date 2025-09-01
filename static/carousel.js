const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Create dots dynamically
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
    const cardWidth = cards[0].offsetWidth;
    track.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
    });

    // Fade-in effect
    cards.forEach((card, i) => {
        card.style.opacity = i === currentIndex ? '1' : '0';
        card.style.pointerEvents = i === currentIndex ? 'auto' : 'none';
    });

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Navigation buttons
nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// Touch support
let startX = 0;
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50 && currentIndex < cards.length - 1) {
        currentIndex++;
    } else if (endX > startX + 50 && currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
});

// Initial call
updateCarousel();
