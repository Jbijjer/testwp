    // ----- Fonctions utilitaires -----
    function closeBanner() {
      const banner = document.getElementById("topBanner");
      banner.classList.add("hidden");

      const backToTopBtn = document.getElementById("backToTop");
      backToTopBtn?.classList.remove("bumped");
    }

    function updateBackToTopPosition() {
      const banner = document.getElementById("topBanner");
      const backToTopBtn = document.getElementById("backToTop");
      const element = document.querySelector('.inscription-visible');
      const style = window.getComputedStyle(element);

      if (!banner || !backToTopBtn) return;

      if (banner.classList.contains("hidden") || style.display === 'none') {
        backToTopBtn.classList.remove("bumped");
      } else {
        backToTopBtn.classList.add("bumped");
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleMobileMenu() {
      const navMenu = document.getElementById("navMenu");
      const mobileBtn = document.getElementById("mobileToggle");
      navMenu.classList.toggle("active");
      mobileBtn.setAttribute("aria-expanded", navMenu.classList.contains("active"));
    }

    // ----- Initialisation -----
    document.addEventListener("DOMContentLoaded", () => {
      // Slideshow
      const slides = Array.from(document.querySelectorAll(".hero-bg-slide"));
      let idx = 0;
      const intervalTime = 4500;
      let timer;

      function showSlide(i) {
        slides[idx].classList.remove("active");
        idx = (i + slides.length) % slides.length;
        slides[idx].classList.add("active");
      }

      function nextSlide() {
        showSlide(idx + 1);
      }

      function prevSlide() {
        showSlide(idx - 1);
      }

      function startTimer() {
        timer = setInterval(nextSlide, intervalTime);
      }

      function resetTimer() {
        clearInterval(timer);
        startTimer();
      }

      startTimer();

      document.getElementById("heroNext")?.addEventListener("click", () => {
        nextSlide();
        resetTimer();
      });

      document.getElementById("heroPrev")?.addEventListener("click", () => {
        prevSlide();
        resetTimer();
      });

      // Bouton menu mobile
      document.getElementById("mobileToggle")?.addEventListener("click", toggleMobileMenu);

      // Fermer bandeau d'inscription
      document.getElementById("closeBanner")?.addEventListener("click", closeBanner);

      // Fermer le menu mobile au clic sur un lien
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 900) {
            document.getElementById("navMenu")?.classList.remove("active");
            document.getElementById("mobileToggle")?.setAttribute("aria-expanded", "false");
          }
        });
      });

      // Animation au scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      });

      document.querySelectorAll(".feature-card, .section h2, .team-member").forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.7s cubic-bezier(0.23,1,0.32,1)";
        observer.observe(el);
      });

      // Smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });

      // Lightbox
      const lightbox = document.getElementById('imgLightbox');
      const lightboxImg = document.getElementById('imgLightboxImg');
      const lightboxClose = document.getElementById('imgLightboxClose');

      document.querySelectorAll('.program-img').forEach((img) => {
        img.addEventListener('click', function () {
          lightboxImg.src = this.src;
          lightbox.classList.add('visible');
          document.body.style.overflow = 'hidden';
        });
      });

      lightboxClose?.addEventListener('click', () => {
        lightbox.classList.remove('visible');
        lightboxImg.src = '';
        document.body.style.overflow = '';
      });

      lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('visible');
          lightboxImg.src = '';
          document.body.style.overflow = '';
        }
      });
    });

    // Section Modal
    document.querySelectorAll('.team-member').forEach(member => {
      member.addEventListener('click', () => {
        const id = member.getAttribute('data-id');
        const data = teamMembers[id];
        if (!data) return;

        document.getElementById('modalName').textContent = data.name;
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalBio').textContent = data.bio;
        document.getElementById('modalImg1').src = data.img1;
        //document.getElementById('modalImg2').src = data.img2;

        const modal = document.getElementById('memberModal');
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

      });
    });


    function closeModal() {
      const modal = document.getElementById('memberModal');
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    // Fermer en cliquant hors de la fenêtre
    window.onclick = function (event) {
      const modal = document.getElementById("memberModal");
      if (event.target === modal) {
        closeModal();
      }
    }
    // Fin Section Modal

    // Bouton "back to top"
    window.addEventListener("scroll", () => {
      const btn = document.getElementById("backToTop");
      if (window.scrollY > 320) {
        btn?.classList.add("visible");
      } else {
        btn?.classList.remove("visible");
      }
      updateBackToTopPosition();
    });


    updateBackToTopPosition();

