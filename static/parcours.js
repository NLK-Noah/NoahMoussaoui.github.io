document.addEventListener("DOMContentLoaded", () => {
  const roller = document.querySelector(".roller");
  const items = document.querySelectorAll(".roller-item");

  let index = 0;
  let autoScroll = true;

  function scrollToNext() {
    if (!autoScroll) return; // stop si l'user interagit
    index = (index + 1) % items.length;
    items[index].scrollIntoView({ behavior: "smooth" });
  }

  // Scroll auto toutes les 4 secondes
  let interval = setInterval(scrollToNext, 4000);

  // Stop auto-scroll si user interagit
  ["wheel", "touchstart", "keydown"].forEach(evt => {
    window.addEventListener(evt, () => {
      autoScroll = false;
      clearInterval(interval);
    }, { once: true }); // une seule fois suffit
  });
});
