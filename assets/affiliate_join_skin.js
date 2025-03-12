// var swiper = new Swiper(".instagram_slider1", {
//     slidesPerView: 2.2,
//     grid: {
//         rows: 1,
//         fill: "row",
//     },
//     spaceBetween: 20,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     breakpoints: {
//         556: {
//             slidesPerView: 2.2,
//         },
//         768: {
//             slidesPerView: 2,
//             grid: {
//                 rows: 2,
//                 fill: "row",
//             }
//         },

//     },
// });


var swiper = new Swiper(".instagram_slider1", {
    slidesPerView: 1.7,
    grid: {
      rows: 1,
      fill: "row",
    },
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerColumnFill: 'row',
    breakpoints: {
      768: {
          slidesPerView: 2,
          grid: {
              rows: 2,
              fill: "row",
          },
          spaceBetween: 0,
      },
  },
  });