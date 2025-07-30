AOS.init({
    once: false, 
    mirror: true,        
  });

  const navLinks = document.querySelectorAll('.nav-link');

  // Smooth scroll (optional if not using `scroll-behavior`)
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });

      // Set active class
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const video = document.getElementById("hikingVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.querySelector("#playPauseBtn .play-icon");
const controls = document.getElementById("customControls");

function setVideoBehavior() {
  const isMobile = window.matchMedia("(max-width: 810px)").matches;

  if (isMobile) {
    video.setAttribute("autoplay", true);
    video.setAttribute("muted", true);
    video.setAttribute("playsinline", true);
    video.play();
    controls.style.display = "none";
  } else {
    video.removeAttribute("autoplay");
    controls.style.display = "flex";
    video.pause();
    playIcon.textContent = "▶";
  }
}

// Initial setup
setVideoBehavior();

// Handle play/pause button click
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.muted = false;
    video.play();
    playIcon.textContent = "⏸";
  } else {
    video.pause();
    playIcon.textContent = "▶";
  }
});

// Listen for screen resize
window.addEventListener("resize", () => {
  setVideoBehavior();
});

// image slider in option

const optionWrapper = document.querySelector('.option-content');
const options = optionWrapper.querySelectorAll('div');

optionWrapper.addEventListener('mouseenter', () => {
  options.forEach(el => el.classList.add('paused'));
});

optionWrapper.addEventListener('mouseleave', () => {
  options.forEach(el => el.classList.remove('paused'));
});


