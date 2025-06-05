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
    const teamMembers = {
      christian: {
        name: "Christian L’Italien",
        role: "Responsable du volet éducatif, improvisateur",
        bio: "Plongé dans l’impro depuis 1995, Christian L’Italien débute à l’école secondaire à Chicoutimi, avant de co-fonder la LIS dès son entrée au cégep. Il participe ensuite à la création des Trafikants, une équipe collégiale encore active 20 ans plus tard.\n\nIl s’installe ensuite à Montréal où, pendant 15 ans, il joue, arbitre et entraîne dans une multitude de ligues amateures et professionnelles.Avec plus de cent tournois, une vingtaine de ligues et des dizaines de spectacles à son actif, il bâtit une solide réputation dans le milieu québécois.\n\nDe retour au Saguenay, il enseigne l’impro au Bas- Saguenay, arbitre dans les circuits collégiaux, joue à la LiSE et s’implique activement dans L’Imprévu Improvisation. En 2022, il remporte la première place au Mini Mondial d’impro en Belgique avec ses collègues de L’Imprévu.",
        img1: "images/christian.jpg",
        img2: "images/christian-scene.jpg"
      },
      marc: {
        name: "Marc Guiol",
        role: "Professeur, Improvisateur",
        bio: `Arrivé au Québec en 1991, il plonge immédiatement dans les arts vivants avec le ballet classique et la danse contemporaine.\n\nC’est à l’UQAM, en se réorientant vers un bac en animation et recherches culturelles, que son aventure en improvisation débute. Il rejoint la LACI, puis joue dans plusieurs ligues montréalaises pendant plus de 20 ans.\n\nImprovisateur, entraîneur, arbitre, metteur en scène et formateur, il développe un parcours riche, ponctué de tournées internationales, dont un solo en France : *Le monstre à quatre têtes*.\n\nArbitre en chef du Bol d’or à Dolbeau et de l’événement culturel de Jonquière, il s’implique depuis plus de 10 ans à la LISE, entraîne les Trafikants (Cégep de Chicoutimi) et agit comme pilier de l’impro au Saguenay.\n\nMembre fondateur de L’Imprévu, il remporte avec la troupe le Mini Mondial d’impro en Belgique en 2022.`,
        img1: "images/marc.jpg",
        img2: "images/marc-scene.jpg"
      },
      "marie-eve-l": {
        name: "Marie-Eve Lemire",
        role: "Administratrice, Chargée de projet, Improvisatrice",
        bio: `Diplômée en théâtre de l’UQAC en 2005, Marie-Eve anime pendant plusieurs années des ateliers pour La Rubrique et y signe plusieurs mises en scène et productions.\n\nSur scène, elle joue notamment dans *Le Capitaine Fracasse* présenté par les Têtes Heureuses, avec une participation remarquée au festival Zones Théâtrales à Ottawa. Elle apparaît aussi dans plusieurs courts et un long métrage (*Hunting Grounds* d’Éric Bilodeau).\n\nFormée à l’impro avec les Trafikants du Cégep de Chicoutimi, elle évolue depuis 19 ans dans différentes ligues régionales, dont la LIF et la LISE. En 2022, elle remporte le Mini Mondial d’impro en Belgique avec ses collègues de L’Imprévu.\n\nSi le théâtre fut son premier amour, c’est en improvisation qu’elle s’épanouit : art vivant, spontané, engagé, capable de divertir, dénoncer, éveiller. Pour elle, improviser n’est pas un passe-temps, c’est un véritable art.\n\nBachelière en administration (marketing et RH), elle est aussi une administratrice passionnée et membre fondatrice de L’Imprévu depuis sa première année.`,
        img1: "images/marie-eve-l.jpg",
        img2: "images/marie-eve-l-scene.jpg"
      },
      "marie-eve-b": {
        name: "Marie-Eve Bouchard",
        role: "Administratrice, Chargée de projet, Improvisatrice",
        bio: `Évoluant dans le monde de l’improvisation depuis maintenant 4 ans, Marie-Eve a d’abord embrassé les arts par le théâtre, puis par la musique. Elle complète un DEC en chant jazz au Collège d’Alma, où elle développe sa sensibilité artistique et sa présence scénique.\n\nDiplômée en travail social, elle comprend mieux que quiconque la portée humaine et sociale de l’improvisation. C’est à 22 ans qu’elle s’y initie, et elle multiplie depuis les expériences dans diverses ligues du Nord du Lac-Saint-Jean et du Saguenay.\n\nRapidement reconnue pour son écoute, son humour vif et son aisance à incarner des personnages sincères et éclatés, elle s’impose comme une voix montante dans le milieu régional.\n\nToujours partante pour de nouveaux défis, elle rejoint l’équipe fondatrice de L’Imprévu Improvisation en tant qu’administratrice, comédienne et formatrice. Elle y combine avec passion son engagement social, sa fibre artistique et son amour du jeu collectif.`,
        img1: "images/marie-eve-b.jpg",
        img2: "images/marie-eve-b-scene.jpg"
      },
      deejay: {
        name: "Deejay McLellan",
        role: "Administrateur, Improvisateur",
        bio: `Depuis 25 ans, Deejay McLellan explore le monde imprévisible et stimulant de l’improvisation théâtrale. Il a évolué dans de nombreuses ligues, dont la LIEJ, la LUI, la LIQ, la CIA, la LIMO et la LISE, chacune étant un terrain fertile pour faire croître son art.\n\nMembre fondateur du Red Champagne, il crée des moments inoubliables sur scène, alliant humour et émotions avec brio. Il participe aussi à plusieurs concepts originaux du Club d’impro de Québec et aux Punch Club, repoussant sans cesse les limites de la créativité.\n\nAvec les Formes Longues à Québec, il explore la narration profonde et les personnages complexes. Parmi ses expériences marquantes : une tournée d’un mois en France avec Les Filles du Roi et sa participation au Festival Spontaneous à Lyon, où il partage sa passion avec des publics variés.\n\nSon parcours est une aventure marquée par la générosité, la découverte et l’amour sincère de l’impro. Pour lui, cet art vivant est un moteur de lien, d’imagination et de surprise à renouveler encore et encore.`,
        img1: "images/deejay.jpg",
        img2: "images/deejay-scene.jpg"
      }
    };

