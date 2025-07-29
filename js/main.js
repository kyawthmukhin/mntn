AOS.init({
        duration: 1500,
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
