new Swiper(".swiper", {
    //Стрелки
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    //Буллеты
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
    //Свайп
    simulateTouch: true,
    grabCursor: true,
  
    loop: true,
  
  });