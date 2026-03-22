/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".card__content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,
  slidesPerView: 1.2, // 🔥 כרטיס אחד + הצצה

  centeredSlides: false, // 🔥 ממקם באמצע
  autoplay: {
    delay: 3000, // כל כמה זמן מתחלף (במילישניות)
    disableOnInteraction: false, // לא עוצר אחרי לחיצה
    pauseOnMouseEnter: true, // עוצר כשעוברים עם העכבר
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1,
    },
    968: {
      slidesPerView: 3,
    },
  },
});
