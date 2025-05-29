// ===============================
// 1. CONFIGURACIÓN INICIAL Y ELEMENTOS DEL DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM usados en el script
  const themeToggle = document.getElementById("theme-toggle");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const contactForm = document.getElementById("contact-form");
  const currentYearSpan = document.getElementById("current-year");
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
  const customModal = document.getElementById("custom-modal");
  const modalAccept = document.getElementById("modal-accept");
  const modalCancel = document.getElementById("modal-cancel");
  const toggleAbout = document.getElementById("toggle-about");
  const aboutText = document.getElementById("about-text");
  const liveClock = document.getElementById("live-clock");
  const visitCount = document.getElementById("visit-count");
  const errorModal = document.getElementById("error-modal");
  const errorClose = document.getElementById("error-close");

  // ===============================
  // 2. AÑO ACTUAL AUTOMÁTICO EN EL FOOTER
  // ===============================
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ===============================
  // 3. TOGGLE DE TEMA CLARO/OSCURO Y GUARDADO EN LOCALSTORAGE
  // ===============================
  document.addEventListener("DOMContentLoaded", () => {
  // --- Forzar el modo oscuro desde el inicio ---
  document.body.classList.add("dark-theme");

  // --- Variables ---
  const themeToggle = document.getElementById("theme-toggle");

  // --- Cambio de tema con el botón ---
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });
  }
});


  // ===============================
  // 4. MENÚ MÓVIL DESPLEGABLE
  // ===============================
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });
  }

  // Cierre automático del menú al hacer clic en un enlace
  if (mobileMenuLinks && mobileMenu) {
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
      });
    });
  }

  // Cierre del menú si se cambia el tamaño de la ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu) {
      mobileMenu.style.display = "none";
    }
  });

  // ===============================
  // 5. TOGGLE DE TEXTO DE "SOBRE MÍ"
  // ===============================
  if (toggleAbout && aboutText) {
    toggleAbout.addEventListener("click", () => {
      const isHidden = aboutText.style.display === "none" || aboutText.style.display === "";
      aboutText.style.display = isHidden ? "block" : "none";
    });
  }

  // ===============================
  // 6. VALIDACIÓN DE FORMULARIO DE CONTACTO + MODALES DE CONFIRMACIÓN Y ERROR
  // ===============================
  if (contactForm && customModal && modalAccept && modalCancel && errorModal && errorClose) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = contactForm.querySelector("input[type='email']");
      const emailValue = emailInput?.value.trim();
      const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/i;

      if (!emailRegex.test(emailValue)) {
        errorModal.style.display = "flex";
        return;
      }

      customModal.style.display = "flex";
    });

    modalAccept.addEventListener("click", () => {
      customModal.style.display = "none";
      contactForm.reset();
      alert("¡Gracias por tu mensaje! Te responderemos pronto.");
    });

    modalCancel.addEventListener("click", () => {
      customModal.style.display = "none";
    });

    errorClose.addEventListener("click", () => {
      errorModal.style.display = "none";
    });
  }

  // ===============================
  // 7. ANIMACIÓN AL HACER SCROLL EN SECCIONES
  // ===============================
  const sections = document.querySelectorAll(".section");

  window.addEventListener("scroll", () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        sec.style.opacity = 1;
        sec.style.transform = "translateY(0)";
        sec.style.transition = "opacity 0.7s, transform 0.7s";
      }
    });
  });

  sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(40px)";
  });

  // ===============================
  // 8. RELOJ EN VIVO
  // ===============================
  if (liveClock) {
    setInterval(() => {
      const now = new Date();
      liveClock.textContent = now.toLocaleTimeString();
    }, 1000);
  }

  // ===============================
  // 9. CONTADOR DE VISITAS
  // ===============================
  if (visitCount) {
    let count = parseInt(localStorage.getItem("visitCount") || "0", 10);
    count++;
    localStorage.setItem("visitCount", count);
    visitCount.innerHTML = `<span class="subrayado-rojo">Visitas a la página: ${count}</span>`;
  }
});

// ===============================
// 10. DESCARGA DEL CV (EVENTO INDEPENDIENTE)
// ===============================
document.getElementById("download-cv").addEventListener("click", () => {
  const url = "docs/cv-prueba.pdf";
  const a = document.createElement("a");
  a.href = url;
  a.download = "CV-Prueba.pdf";
  a.click();
});

// ===============================
// 11. TEMPORIZADOR DE CUENTA REGRESIVA (Countdown)
// ===============================
const targetDate = new Date('2025-12-31T00:00:00');

function updateCountdown() {
  const now = new Date();
  const timeRemaining = targetDate - now;

  if (timeRemaining > 0) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = `Días: ${days}`;
    document.getElementById('hours').textContent = `Horas: ${hours}`;
    document.getElementById('minutes').textContent = `Minutos: ${minutes}`;
    document.getElementById('seconds').textContent = `Segundos: ${seconds}`;
  } else {
    document.getElementById('days').textContent = '¡El tiempo ha expirado!';
    document.getElementById('hours').textContent = '';
    document.getElementById('minutes').textContent = '';
    document.getElementById('seconds').textContent = '';
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===============================
// 12. BOTÓN FLOTANTE PARA MOSTRAR/OCULTAR EL CONTADOR
// ===============================
const menuToggle = document.getElementById("menuToggle");
const countdown = document.getElementById("countdownContainer");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");

  if (countdown.style.right === "0px") {
    countdown.style.right = "-220px";
  } else {
    countdown.style.right = "0px";
  }
});
