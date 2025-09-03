const videos = document.querySelectorAll(".myVideo");
const muteBtns = document.querySelectorAll(".muteBtn");

muteBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (videos[i].muted) {
      videos[i].muted = false;
      btn.textContent = "🔊 Couper le son";
    } else {
      videos[i].muted = true;
      btn.textContent = "🔇 Activer le son";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dotsNav = document.querySelector(".carousel-dots");

    let currentIndex = 0;

    // Crée les dots
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        if(index === 0) dot.classList.add("active");
        dotsNav.appendChild(dot);
        dot.addEventListener("click", () => goToSlide(index));
    });

    const dots = Array.from(dotsNav.children);

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots[currentIndex].classList.remove("active");
        dots[index].classList.add("active");
        currentIndex = index;
    }

    function attachSlideButtons() {
        const currentSlide = slides[currentIndex];
        const nextBtn = currentSlide.querySelector(".carousel-btn.next");
        const prevBtn = currentSlide.querySelector(".carousel-btn.prev");

        nextBtn.onclick = () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
            attachSlideButtons();
        };

        prevBtn.onclick = () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
            attachSlideButtons();
        };
    }

    attachSlideButtons(); // Attache les événements au premier slide
});
