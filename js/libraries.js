// Swiper library code

var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 5,
      },
    },
});

/*------------------------------------------------------------------------------------------------------------------*/  
  
var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
        slidesPerView: 1,
        },
        450: {
        slidesPerView: 2,
        },
        768: {
        slidesPerView: 3,
        },
        1020: {
        slidesPerView: 4,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});

/*------------------------------------------------------------------------------------------------------------------*/  

var swiper = new Swiper(".products-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1020: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

/*------------------------------------------------------------------------------------------------------------------*/

var swiper = new Swiper(".cart-scroll", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
  });