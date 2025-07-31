AOS.init({
    once: false, 
    mirror: true,        
});

const swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 20,
  navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
  },
});



const snowContainer = document.querySelector('.snow-container');

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Random starting X position
  snowflake.style.left = Math.random() * window.innerWidth + 'px';

  // Random drift to right: between 30px and 100px
  const drift = 30 + Math.random() * 70;
  snowflake.style.setProperty('--driftX', `${drift}px`);

  // Random fall duration between 5–10 seconds
  const duration = 5 + Math.random() * 5;
  snowflake.style.animationDuration = duration + 's';

  // Random size (2–6px)
  const size = 2 + Math.random() * 4;
  snowflake.style.width = snowflake.style.height = size + 'px';

  // Add to container
  snowContainer.appendChild(snowflake);

  // Remove after it finishes falling
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// Generate snowflakes
setInterval(createSnowflake, 150);


const navLinks = document.querySelectorAll('.vertical-nav .nav-link');
let sections = document.querySelectorAll('.start-section,.first-section,.second-section,.third-section,.fourth-section,.last-section');

const OFFSET = 180;

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = targetPosition - OFFSET;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  });
});


// Scroll observer
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active-nav-link'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active-nav-link');
        }
      }
    });
  },
  {
    threshold: 0.6
  }
);

sections.forEach(section => observer.observe(section));

const wrappers = document.querySelectorAll('.step-wrapper');
const maxWidth = 200;
const minWidth = 72;

window.addEventListener('scroll', () => {
    wrappers.forEach(wrapper => {
        const line = wrapper.querySelector('.line');
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibleRatio = 1 - rect.top / windowHeight; 
            const newWidth = 10 + (maxWidth - minWidth) * Math.min(Math.max(visibleRatio, 0), 1);
            line.style.width = `${newWidth}px`;
        }
    });
});

// image slider rotation

const images = document.querySelectorAll(".image-slider .image");
const slider = document.getElementById("carousel");

let index = 0;
let intervalId;


//   Updates class names for all images to apply 
//  the correct visual positions (active, left, back, right).
  
const updateClasses = () => {
    const total = images.length;
    images.forEach(img => img.className = "image");

    images[index % total].classList.add("active");
    images[(index - 1 + total) % total].classList.add("left");
    images[(index - 2 + total) % total].classList.add("back");
    images[(index - 3 + total) % total].classList.add("right");
};


// Starts the automatic image carousel with a 3-second interval.
// Updates the index and reassigns classes accordingly.

const startCarousel = () => {
    intervalId = setInterval(() => {
        index = (index - 1 + images.length) % images.length;
        updateClasses();
    }, 3000);
};

const stopCarousel = () => clearInterval(intervalId);

updateClasses();
startCarousel();

slider.addEventListener("mouseenter", stopCarousel);
slider.addEventListener("mouseleave", startCarousel);


// video

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




