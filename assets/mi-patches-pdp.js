var swiper = new Swiper(".combat_slider", {
    slidesPerView: 3.6,
    grid: {
        rows: 1,
        fill: "row",
    },
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        556: {
            slidesPerView: 5.3,
        },
        768: {
            slidesPerView: 3,
            grid: {
                rows: 3,
                fill: "row",
            }
        },

    },
});