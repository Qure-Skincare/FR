/* 
* Common JS Start
*/
setTimeout(function () {
    var TwaSettingsSwiper = {
        init: function () {
            this.TwaSettingsCarousel();
        },
        TwaSettingsCarousel: function () {
            document.querySelectorAll(".twa__swiper").forEach((e => {
                this.TwaCarousel(e);
            }))
        },
        TwaCarousel: function (e) {
            var t = "true" === e?.dataset.autoplay,
                n = "true" === e.dataset.loop,
                w = e?.dataset.rows ? e?.dataset.row : 1,
                o = e?.dataset.slideshow ? e?.dataset.slideshow : 0,
                i = e?.dataset.desktop ? e?.dataset.desktop : 4,
                s = e?.dataset.tablet ? e?.dataset.tablet : 2,
                r = e?.dataset.mobile ? e?.dataset.mobile : 1,
                a = e?.dataset.autoplaySpeed ? e?.dataset.autoplaySpeed : 3e3,
                c = e?.dataset.speed ? e?.dataset.speed : 400,
                l = e?.dataset.effect ? e?.dataset.effect : "slide",
                d = e?.dataset.sectionId,
                u = e?.dataset.row ? e?.dataset.row : 1,
                ut = e?.dataset.rowtablet ? e?.dataset.rowtablet : 1,
                um = e?.dataset.rowmobile ? e?.dataset.rowmobile : 1,
                p = window.innerWidth,
                m = e?.dataset.spacing ? e?.dataset.spacing : 0;
            cs = "true" === e.dataset.centerslide,
                al = e?.dataset.arrowleft ? e?.dataset.arrowleft : "swiper-button-prev",
                ar = e?.dataset.arrowright ? e?.dataset.arrowright : "swiper-button-next",
                dir = e?.dataset.direction ? e.dataset.direction : 'horizontal',  // Default to 'horizontal'
                rtl = document.documentElement.dir === 'rtl',  // Check the document's direction
                initialSlide = e?.dataset.initialSlide ? Number(e.dataset.initialSlide) : 0,  // Default to 0
                  centeredSlidesMobile = "true" === e?.dataset.centeredMobile,
            centeredSlidesDesktop = "true" === e?.dataset.centeredDesktop;
                m = Number(m), a = Number(a), c = Number(c), p <= 767 ? m >= 15 && (m = 15) : p <= 1199 && m >= 30 && (m = 30), new Swiper("#twa__swiper-" + d, {
                    slidesPerView: r,
                    slidesPerColumn: w,
                    spaceBetween: m,
                    // centeredSlides: cs,
                    centeredSlides: p <= 767 ? centeredSlidesMobile : centeredSlidesDesktop,
                    autoplay: t,
                    delay: a,
                    loop: n,
                    effect: l,
                    speed: c,
                    direction: dir,
                    rtl: rtl,
                    initialSlide: initialSlide,
                    watchSlidesProgress: !0,
                    watchSlidesVisibility: !0,
                    lazy: true,
                    grid: {
                        rows: um,
                        fill: "row"
                    },
                    navigation: {
                        nextEl: `.${ar}`,
                        prevEl: `.${al}`,
                    },
                    pagination: {
                        clickable: !0,
                        el: e.querySelector(".swiper-pagination")
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: s,
                            // centeredSlides: cs,
                            centeredSlides: centeredSlidesDesktop,
                            grid: {
                                rows: ut,
                                fill: "row"
                            }
                        },
                        1199: {
                            slidesPerView: i,
                            grid: {
                                rows: u,
                                fill: "row"
                            }
                        }
                    }
                })
        }
    };
    TwaSettingsSwiper.init();
}, 500);



//Header
function hdrHeight() {
    setTimeout(function () {
        var hdrHeight = $(".header-wrapperBlock, .deks-header").outerHeight();
        let header_item = $('body');
        header_item.css('--headerheight', hdrHeight + 'px');
    }, 1000)
}
hdrHeight();

(function ($) {
    // Off Canvas JS
    var canvasWrapper = $(".off-canvas-wrapper");
    $(".btn-menu").on('click', function () {
        canvasWrapper.addClass('active');
    });
    $(".close-action > .btn-close, .off-canvas-overlay").on('click', function () {
        canvasWrapper.removeClass('active');
    });

    // Scroll Top Hide Show
    var varWindow = $(window);
    varWindow.on('scroll', function () {
        if ($(this).scrollTop() > 250) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }

        // Sticky Header
        if ($('.sticky-header').length) {
            var windowpos = $(this).scrollTop();
            if (windowpos >= 80) {
                $('.sticky-header').addClass('sticky');
            } else {
                $('.sticky-header').removeClass('sticky');
            }
        }
    });


    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 5) {
            $(".header-wrapperBlock").addClass("header-sticky");
        } else {
            $(".header-wrapperBlock").removeClass("header-sticky");
        }
    });

    // beauty_img 
    function bxHeight() {
        if ($(".beauty_img").length) {
            var hdrHeight = $(".beauty_img").outerHeight();
            let header_item = $('.bs_grid');
            header_item.css('--height-header', hdrHeight + 5 + 'px');
        }
    }
    bxHeight();
    $(window).resize(function () {
        bxHeight();
    });
    setInterval(bxHeight, 1000);

    //Skin Slider with Accordion
    function skinBoxheight() {
        var skinHeight = $(".skin_p_slider .sp_img").outerHeight();
        let skin_item = $('.skin_p_slider .sp_img').closest('.skin_p_slider');
        skin_item.css('--posTop', skinHeight + 'px');
    }
    setInterval(
        function () {
            skinBoxheight();
        }, 1000);

    // Black friday Tabs
    $(".bf-compare__button").click(function () {
        $(".bf-compare__button").removeClass("color-btn")
        $(this).addClass("color-btn")
        var getItem = $(this).attr("data-for")
        if (getItem == "mask") {
            $(".upsell-second__items-wrapper").removeClass("active")
            $(".upsell-second__items-wrapper.bf-upsell-mask").addClass("active")
        }
        else if (getItem == "micro") {
            bxHeight();
            $(".upsell-second__items-wrapper").removeClass("active");
            $(".upsell-second__items-wrapper.bf-upsell-microinfusion").addClass("active")
        }
    })
    $(".bf-bundles__item-included").click(function () {
        $(this).parent().toggleClass("active")
        $(this).next().slideToggle()
    });


})(window.jQuery);

// =================================== js for same height of comparision section===============================
window.addEventListener('load', function () {
    window.addEventListener("resize", adjustListItemHeights);
    adjustListItemHeights(); // Call the function initially to set heights on page load

    function adjustListItemHeights() {
        const leftLiItems = document.querySelectorAll('.rightCircle li');
        const rightLiItems = document.querySelectorAll('.wrongCircle li');

        // Reset heights to auto to ensure accurate measurement
        leftLiItems.forEach(li => li.style.height = 'auto');
        rightLiItems.forEach(li => li.style.height = 'auto');

        // Loop through each pair of corresponding li items and set their heights to match
        leftLiItems.forEach((leftLi, index) => {
            const rightLi = rightLiItems[index];
            const maxHeight = Math.max(leftLi.offsetHeight, rightLi.offsetHeight);
            leftLi.style.height = maxHeight + 'px';
            rightLi.style.height = maxHeight + 'px';
        });
    }
});
// =================================== js for same height ===============================
$(function () {
    //setTimeout(function () {
    $('.q_uses_header, .dfrc__hdr, .s_name, .result_item, .serum_bx, .bs_content, .skin_item, .safety_content, .mc_desc, .blog_wrap, .see_item img, .menu li a, .return_step1, .result_tabs .rt_wrap_header .nav-link').matchHeight({
        property: 'height',
        target: null,
        remove: false
    });

    //}, 1000);
});

// =================================== js for accordions ===============================
function toggleContent(expandable) {
    var hiddenDiv = expandable.querySelector('.u_item__hidden-div');
    var accordionIcon = expandable.querySelector('.u_item__accordion');

    // Toggle the visibility of the hiddenDiv
    if (hiddenDiv.style.display === 'none' || hiddenDiv.style.display === '') {
        hiddenDiv.style.display = 'block';
        accordionIcon.innerHTML = '<img src="assets/images/common/minus.png" alt="">';

        // Close other open u_item_expandables
        var allExpandables = document.querySelectorAll('.u_item_expandable');
        for (var i = 0; i < allExpandables.length; i++) {
            var otherExpandable = allExpandables[i];
            if (otherExpandable !== expandable) {
                var otherHiddenDiv = otherExpandable.querySelector('.u_item__hidden-div');
                var otherAccordionIcon = otherExpandable.querySelector('.u_item__accordion');
                otherHiddenDiv.style.display = 'none';
                otherAccordionIcon.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
            }
        }
    } else {
        hiddenDiv.style.display = 'none';
        accordionIcon.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
    }
}


// =============== show more / show less ======================
const risk = document.querySelectorAll(".risk_expandable");
risk.forEach((story) => {
    const button = story.querySelector(".risk__accordion");
    button.addEventListener("click", () => {
        const paragraph = story.querySelector(".risk__hidden-div");
        const more_text = button.getAttribute("data-more") || "Read More..";
        const less_text = button.getAttribute("data-less") || "Read Less..";
        paragraph.classList.toggle("hidden");
        const text = paragraph.classList.contains("hidden")
            ? more_text
            : less_text;
        button.textContent = text;
    });
});


//choose serum accordion
$('.cs_item__accordion').click(function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
})


// faq show more accordion
const faq = document.querySelectorAll(".faq_expandable");
faq.forEach((story) => {
    const button = story.querySelector(".faq__accordion");
    button.addEventListener("click", () => {
        const paragraph = story.querySelector(".faq__hidden-div");
        paragraph.classList.toggle("hidden");
        const text = paragraph.classList.contains("hidden")
            ? story.querySelector(".faq_ques").getAttribute("data-show")
            : story.querySelector(".faq_ques").getAttribute("data-hide");
        button.textContent = text;
    });
});

// Get all accordion headers	
const accordionHeaders = document.querySelectorAll('.q_uses_header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.parentNode.nextElementSibling;
        content.classList.toggle('active');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";

        }
    });
});

// scroll to id
$('a[href*="#"]:not([href="#"])').not('.faq-menu__url, .skincare_right a.popup-modal.ss_c_link, .popup-youtube, .ss_c_link, .collection-form .button_primary, .menu li a, #menu li a').click(function () {
    var target = $(this.hash);
    $('html,body').stop().animate({
        scrollTop: target.offset().top - 100
    }, 'linear');
});
if (location.hash) {
    var id = $(location.hash);
}
$(window).on('load', function () {
    if (location.hash) {
        $('html,body').animate({ scrollTop: id.offset().top - 100 }, 'linear')
    };
});

if ($(".plan_bundle_hdr")[0]) {
    $('.plan_bundle_detail .plan_bundle_hdr').click(function () {
        $(this).next().slideToggle();
    })
}

// =================================== js for slider ===============================

//result slider
var swiper = new Swiper(".result_slider", {
    spaceBetween: 15,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".qureSlider-swiper-next",
        prevEl: ".qureSlider-swiper-prev",
    },
    breakpoints: {
        556: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


//micro infusion-lp result slider
var swiper = new Swiper(".result_slides_2", {
    spaceBetween: 62,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        556: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
    },
});

//testimonial result slider
var swiper = new Swiper(".result_slider_2", {
    spaceBetween: 15,
    slidesPerView: 1,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".result_slider_3", {
    spaceBetween: 15,
    // centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            centeredSlides: false,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2.6,
        },
    },
});



// =================
//YOUTUBE VIDEO
$(document).ready(function () {

    $('.play_btn').on('click', function () {
        $('.video-popup').fadeIn('slow');
        return false;
    });

    $('.popup-bg').on('click', function () {
        $('.video-popup').slideUp('slow');
        return false;
    });

    $('.close-btn').on('click', function () {
        $('.video-popup').fadeOut('slow');
        return false;
    });
});


// Video Popup
$(document).ready(function () {
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
    });
});

// Image PopUp Refill Banner
// document.addEventListener('DOMContentLoaded', function () {
//     const sourceImage = document.querySelectorAll('source.tab_img');
//     const images = document.querySelectorAll('img.tab_img');
//     let popupLink = Array.from(images);
//     popupLink.map((popupUrl) => {
//         popupUrl.addEventListener('click', function (event) {
//             event.preventDefault();
//             var dynamicImageUrl = popupUrl.src;
//             console.log(dynamicImageUrl);
//             $.magnificPopup.open({
//                 type: 'image',
//                 items: {
//                     src: dynamicImageUrl
//                 }
//             });
//         });
//     });
// });

// $(document).ready(function () {
//     var imageElement = document.getElementById('image-id');
//     if (imageElement) {
//         imageElement.addEventListener('click', function () {
//             var imageUrl = '';
//             var sources = this.getElementsByTagName('source');
//             for (var i = 0; i < sources.length; i++) {
//                 if (window.matchMedia(sources[i].getAttribute('media')).matches) {
//                     imageUrl = sources[i].getAttribute('srcset');
//                     break;
//                 }
//             }
//             if (!imageUrl) {
//                 imageUrl = this.getElementsByTagName('img')[0].src;
//             }

//             $.magnificPopup.open({
//                 items: {
//                     src: imageUrl
//                 },
//                 type: 'image'
//             });
//         });
//     }
// });

//Skin Slider Pop Up
$(function () {
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    $(document).on('click', '.mfp-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});


// navbar
setTimeout(function () {
    $('.hamburger-container').click(function () {
        $('body').toggleClass("openmenu");
    });
    $("#menu li > a").click(function () {
        $('body').removeClass("openmenu");
        bottomBar.removeClass("hidden");
    })
}, 500);



$(".expand-content").click(function () {
    $(".content-show").slideToggle("slow");
    $(this).toggleClass("minusClass");
});

$(window).resize(function () {
    if (window.innerWidth > 1199) {
        $("#menu").removeAttr("style");
    }
});

var topBar = $(".hamburger li:nth-child(1)"),
    middleBar = $(".hamburger li:nth-child(2)"),
    bottomBar = $(".hamburger li:nth-child(3)");

$(".hamburger-container").on("click", function () {
    if (middleBar.hasClass("rot-45deg")) {
        topBar.removeClass("rot45deg");
        middleBar.removeClass("rot-45deg");
        bottomBar.removeClass("hidden");
    } else {
        bottomBar.addClass("hidden");
        topBar.addClass("rot45deg");
        middleBar.addClass("rot-45deg");
    }
});

// $("#menu li > a").click(function () {
//     $('body').removeClass("openmenu");
//     bottomBar.removeClass("hidden");
// })


// // Tab Slider 
$(".tabing-new .tab .tablinks").each(function (e) {
    if (e != 0) $(this).hide();
});

$(".tab_button .next-btn").click(function () {
    var count = $(".tabing-new .tab .tablinks:visible").next().addClass('active');

    if ($(".tabing-new .tab .tablinks:visible").next().length != 0)
        $(".tabing-new .tab .tablinks:visible").next().show().prev().hide().removeClass('active');
    else {
        $(".tabing-new .tab .tablinks:visible").hide();
        $(".tabing-new .tab .tablinks:first").show();
    }
    $(window).scrollTop($(".tabing-new").offset().top - 100); // Scroll to the top of the section
    return false;
});
$(".let_start").click(function () {
    $(window).scrollTop($(".tabing-new").offset().top - 100); // Scroll to the top of the section
    return false;
});
$(".tab_button .preview-btn").click(function () {
    var count = $(".tabing-new .tab .tablinks:visible").next().addClass('active');

    if ($(".tabing-new .tab .tablinks:visible").prev().length != 0)
        $(".tabing-new .tab .tablinks:visible").prev().show().next().hide();
    else {
        $(".tabing-new .tab .tablinks:visible").hide();
        $(".tabing-new .tab .tablinks:last").show();
    }
    $(window).scrollTop($(".tabing-new").offset().top - 100); // Scroll to the top of the section
    return false;
});


$(".tab_slider .tabcontent").each(function (e) {
    if (e != 0) $(this).hide();
});

$(".tab_button .next-btn").click(function () {
    if ($(".tab_slider .tabcontent:visible").next().length != 0)
        $(".tab_slider .tabcontent:visible").next().show().prev().hide();
    else {
        $(".tab_slider .tabcontent:visible").hide();
        $(".tab_slider .tabcontent:first").show();

    }
    return false;
});

$(".tab_button .preview-btn").click(function () {
    if ($(".tab_slider .tabcontent:visible").prev().length != 0)
        $(".tab_slider .tabcontent:visible").prev().show().next().hide();
    else {
        $(".tab_slider .tabcontent:visible").hide();
        $(".tab_slider .tabcontent:last").show();
    }
    return false;
});

var NumberCount = $('.contents-info .tablinks.active').attr('data-count');
$('.tab_button').attr('page-count', NumberCount);

$('.contents-info .tablinks').on('click', function () {
    var NumberCount = $(this).attr('data-count');
    $('.tab_button').attr('page-count', NumberCount);
});

$('.next-btn').on('click', function () {
    $('video#myVideo4').get(0).pause();
});

$('.preview-btn').on('click', function () {
    $('video#myVideo4').get(0).pause();
});


//Accordion title
$('.accordion__title').click(function () {
    $(this).closest('.serum_accordian').find('.accordion__title').removeClass('accordion__title_active');
    $(this).toggleClass('accordion__title_active');
    $(this).closest('.serum_accordian').find('.accordion__title').next().slideUp();
    $(this).next().slideToggle();
});


// Read more/less
$('.read_button').click(function () {
    $(this).closest('.guide_do').find('.moretext').slideToggle();
    if ($(this).text() == "Read More") {
        $(this).text("Read Less")
    } else {
        $(this).text("Read More")
    }
});

// Read more/less
$('.read_button').click(function () {
    $(this).closest('.ss_list').find('.moretext').slideToggle();
    if ($(this).text() == "Read More") {
        $(this).text("Read Less")
    } else {
        $(this).text("Read More")
    }
});



$(".set-innner a").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
            .siblings(".set-innner .content")
            .slideUp(200);
        $(".set-innner a i")
            .removeClass("fa-minus")
            .addClass("fa-plus");
    } else {
        $(".set-innner a i")
            .removeClass("fa-minus")
            .addClass("fa-plus");
        $(this)
            .find("i")
            .removeClass("fa-plus")
            .addClass("fa-minus");
        $(".set-innner a").removeClass("active");
        $(this).addClass("active");
        $(".set-innner .content").slideUp(200);
        $(this)
            .siblings(".set-innner .content")
            .slideDown(200);
    }
});


$(document).ready(function () {
    $('.accordion-button').click(function () {
        var accordionItem = $(this).closest('.mc_item');
        accordionItem.find('.mc_img img').toggleClass('width-increased');
    });
});

// ======= fix banner size
function bannerSize() {
    var refillImg = document.querySelector(".refill_bl .refill_img");
    if (refillImg) {
        var bannerHeight = refillImg.clientHeight;
        let banner_item = document.querySelector('.refill_bl');
        banner_item.style.setProperty('--banner-height', `${bannerHeight + 10}px`);
    }
}
bannerSize();
addEventListener("resize", (event) => {
    bannerSize();
});




// === sticky button ===
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.button_sticky_wrapper').addClass("sticky");
    }
    else {
        $('.button_sticky_wrapper').removeClass("sticky");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // ============ qure video js ======
    const parent = document.querySelector('body');
    const specificChild = parent.querySelector('.player__video');
    if (specificChild) {
        const videoPlayers = document.querySelectorAll('.player');

        videoPlayers.forEach(initVideoPlayer);

        function initVideoPlayer(player) {
            const myVid = player.querySelector('video.player__video');
            const controlPlay = player.querySelector('.player__button');
            const controlVol = player.querySelector('.player__slider[name="volume"]');
            const controlRate = player.querySelector('.player__slider[name="playbackRate"]');
            const controlSkip = player.querySelectorAll('.player__button[data-skip]');
            const controlFullScreen = player.querySelector('.player__fullscreen');
            const controlProgress = player.querySelector('.progress');
            const progressBar = controlProgress.querySelector('.progress__filled');

            let drag;
            let grap;
            let progression;

            myVid.addEventListener('click', toggleVideo);
            controlPlay.addEventListener('click', toggleVideo);
            controlVol.addEventListener('change', updateVol);
            controlRate.addEventListener('change', updateRate);
            controlFullScreen.addEventListener('click', goFullScreen);
            controlSkip.forEach(control => control.addEventListener('click', forward));
            controlProgress.addEventListener('mouseover', () => { drag = true });
            controlProgress.addEventListener('mouseout', () => { drag = false; grap = false });
            controlProgress.addEventListener('mousedown', () => { grap = drag });
            controlProgress.addEventListener('mouseup', () => { grap = false });
            controlProgress.addEventListener('click', updateCurrentPos);
            controlProgress.addEventListener('mousemove', e => { if (drag && grap) { updateCurrentPos(e) } });

            function toggleVideo() {
                if (myVid.paused) {
                    myVid.play();
                    controlPlay.innerHTML = "❚ ❚";
                    updateProgress();
                    progression = window.setInterval(updateProgress, 200);
                    myVid.closest(".player").classList.add("video_playing");
                } else {
                    myVid.pause();
                    controlPlay.innerHTML = "ttt";
                    //controlPlay.innerHTML = '<img src="assets/images/common/plus.png" alt="">';
                    clearInterval(progression);
                    myVid.closest(".player").classList.remove("video_playing");
                }
            }

            function updateVol() {
                const volume = controlVol.value;
                myVid.volume = volume;
            }

            function updateRate() {
                const rate = controlRate.value;
                myVid.playbackRate = rate;
            }

            function goFullScreen() {
                if (myVid.webkitSupportsFullscreen) {
                    myVid.webkitEnterFullScreen();
                }
            }

            function forward() {
                const value = Number(this.dataset.skip);
                myVid.currentTime = myVid.currentTime + value;
            }

            function updateProgress() {
                const progress = myVid.currentTime / myVid.duration;
                progressBar.style.flexBasis = `${Math.floor(progress * 1000) / 10}%`;
            }

            function updateCurrentPos(e) {
                const newProgress = (e.clientX - controlProgress.offsetLeft) / controlProgress.clientWidth;
                progressBar.style.flexBasis = `${Math.floor(newProgress * 1000) / 10}%`;
                myVid.currentTime = newProgress * myVid.duration;
            }
        }

    }
});
setInterval(function () {
    var bnrImage = $('.banner-popup-link img');
    $.each(bnrImage, function (index, bnrImageHeight) {
        var parentElement = bnrImageHeight.parentNode;
        var bnnerHeight = bnrImageHeight.clientHeight;
        this.parentElement.style.setProperty('--aspect-ratio', `${bnnerHeight}px`);
    });

}, 10)
/* 
* Common JS End
*/

/*
* Subscription Box Start 
*/
$('.subscriptionType').click(function () {
    if ($(this).attr("data-subscription") == 'subscription') {
        $(this).closest('.subscribe_save_wrapper').addClass('with_subscription').removeClass('without_subscription');
    }
    else if ($(this).attr("data-subscription") == 'no-subscription') {
        $(this).closest('.subscribe_save_wrapper').addClass('without_subscription').removeClass('with_subscription')
    }
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
})
/*
* Subscription Box End 
*/

/*
* See Slider with 3 slides Start 
*/
// var swiper = new Swiper(".see_slider3", {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     autoplay: false,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<span class="' + className + '"><span class="pg_counter counter_title">STEP</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
//         },
//     },
//     breakpoints: {
//         556: {
//             slidesPerView: 1,

//         },
//         768: {
//             slidesPerView: 2,
//         },
//         1024: {
//             slidesPerView: 3,
//         },
//     },
// });
var swiper = new Swiper(".see_slider3", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            var title = $('.step_slider').data('counter-title') || 'STEP'; // Get title from data attribute of .step_slider or default to 'STEP'
            return '<span class="' + className + '"><span class="pg_counter counter_title">' + title + '</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
        },
    },
    breakpoints: {
        556: {
            slidesPerView: 1,

        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


/*
* See Slider with 3 slides Start 
*/
/* See Slider with 4 slides Start 
*/
var swiper = new Swiper(".see_slider4", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"><span class="pg_counter counter_title">STEP</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
        },
    },
    breakpoints: {
        556: {
            slidesPerView: 1,

        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});
/*
* See Slider with 4 slides Start 
*/
//how to use
var swiper = new Swiper(".howUSe_slider", {
    slidesPerView: "1",
    autoplay: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"><span class="pg_counter counter_title">STEP</span><span class="pg_counter counter_dot"></span>' + '<span class="pg_counter  counter_block">0' + (index + 1) + "</span></span>";
        },
    },
    breakpoints: {
        556: {
            slidesPerView: 1,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 66,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 66,
        },
    },
});

/*
*js only for micro-infusion pdp start
*/
$('.monthly_plans').click(function () {
    var savedTxt = $(this).find('.saved_price').html();
    if (savedTxt !== undefined) {
        $('.savedAmount').html('& ' + savedTxt);
    } else {
        $('.savedAmount').html('');
    }

    var paymentPrice = $(this).attr("payment-price");
    if (paymentPrice !== undefined) {
        $('.payment_price').html(paymentPrice);
    } else {
        $('.payment_price').html('');
    }
})
// //element height
// var maxHeight = 0;
// $(".bs_feature ul li").each(function () {
//     if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
//     $(this).wrapInner("");
// });
// $(".bs_feature ul li").height(maxHeight);
/*
*js only for micro-infusion pdp end
*/

$(".serumBlock").click(function () {
    var imageLinkss = $(this).find(".serum_img").attr('data-month3-image');
    $("#choosen_image").attr("src", imageLinkss);
    // Remove the "active" class from all serum_img elements
    $(".serum_img").removeClass("active");
    // Remove the "checked" attribute from all radio buttons
    $("input[name='serum']").prop("checked", false);
    $("input[name='serum']").removeClass("active");
    // Add the "active" class to the clicked serum_img
    $(this).find(".serum_img").addClass("active");
    // Set the "checked" attribute on the radio button within the clicked serumBlock
    $(this).find("input[name='serum']").prop("checked", true);
    $(this).find("input[name='serum']").addClass("active");

});

/*
* choose serum js start 
*/
$(document).ready(function () {
    $('.tab_content').hide(); // Hide all tab contents initially
    $('.tab_content').eq(0).show(); // Show the second tab content by default
    $('.step_conten_blocks .planBlock').click(function () {
        var regular_price = $(this).find(".regular_price").text();
        var sale_price = $(this).find(".sale_price:visible").text().trim();
        console.log(regular_price);
        var imageLink = $(this).attr("data-image");
        var data_per = $(this).attr("data-per");
        var data_pay = $(this).attr("data-pay");
        $(".total_price").find(".regular_price").text(regular_price);
        $(".total_price").find(".sale_price").text(sale_price);
        $(".btn_value").text(data_per);
        $(".pay_today").text(data_pay);
        $("#choosen_image").attr("src", imageLink);
        $('.tab_content').hide();
        $('.step_conten_blocks .planBlock').removeClass('active');
        $(this).addClass('active');

        var tab = $(this).data('tab');

        if (tab == "month_2") {
            $(".supply-detail").addClass("offer_active");
        } else {
            $(".supply-detail").removeClass("offer_active");
        }
        $('#' + tab).show();
    });

    //product subscription


    var data_month1_image = $(".serum_img.active").attr('data-month1-image');
    var data_month2_image = $(".serum_img.active").attr('data-month2-image');
    var data_month3_image = $(".serum_img.active").attr('data-month3-image');

    $(".planBlock").each(function () {
        var data_tab = $(this).attr("data-tab");
        if (data_tab == "month_3") {
            $(this).attr("data-image", data_month3_image);
        } else if (data_tab == "month_2") {
            $(this).attr("data-image", data_month2_image);
        } else if (data_tab == "month_1") {
            $(this).attr("data-image", data_month1_image);
        }
    });

    $(".serumBlock").click(function () {
        
        var imageLinkss = $(".step_conten_blocks a.planBlock.active").attr('data-image');
        $("#choosen_image").attr("src", imageLinkss);
        $(".serum_img").removeClass("active");
        $("input[name='serum']").prop("checked", false);
        $("input[name='serum']").removeClass("active");
        $(this).find(".serum_img").addClass("active");
        $(this).find("input[name='serum']").prop("checked", true);
        $(this).find("input[name='serum']").addClass("active");
        var data_month1_image = $(".serum_img.active").attr('data-month1-image');
        var data_month2_image = $(".serum_img.active").attr('data-month2-image');
        var data_month3_image = $(".serum_img.active").attr('data-month3-image');
        $(".planBlock").each(function () {
            var data_tab = $(this).attr("data-tab");
            if (data_tab == "month_3") {
                $(this).attr("data-image", data_month3_image);
            } else if (data_tab == "month_2") {
                $(this).attr("data-image", data_month2_image);
            } else if (data_tab == "month_1") {
                $(this).attr("data-image", data_month1_image);
            }
        });
    });

});

/*
* choose serum js end 
*/
/*
* autofilter subscription js start 
*/
$('.subscriptionType').click(function () {
    if ($(this).attr("data-subscription") == 'subscription') {
        $(this).closest('.subscribe_save_wrapper').addClass('with_subscription').removeClass('without_subscription');
    }
    else if ($(this).attr("data-subscription") == 'no-subscription') {
        $(this).closest('.subscribe_save_wrapper').addClass('without_subscription').removeClass('with_subscription')
    }
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
})
/*
* autofilter subscription js end 
*/
/*
* Ingredients Slider Start
*/
var swiper = new Swiper(".ingredients_slider1", {
    slidesPerView: 4.5,
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

$(function () {
    $('.ingredients_item').matchHeight({
        property: 'height',
        target: null,
        remove: false
    });
});
/*
* Ingredients Slider End
*/

/*
* qure safety start 
*/
function Safety(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

let clickfunc = (e, link_num) => {
    e.preventDefault();
    let data_count = 0;
    if (link_num == 1) {
        data_count = 6;
    }
    if (link_num == 2) {
        data_count = 4;
    }
    if (link_num == 3) {
        data_count = 10;
    }
    var button = document.querySelector('button[data-count="' + data_count + '"]');
    console.log(button);
    if (button && data_count > 0) {
        button.click();

        $(".hamburger").trigger('click');
        // if(view_mode == 'mobile'){ }
        $('html, body').animate({
            scrollTop: $(".tab_slider").offset().top
        }, 3000);
    }
}

$(function ($) {
    var num_cols = 3,
        container = $('.split-list'),
        listItem = 'li',
        listClass = 'sub-list';
    container.each(function () {
        var items_per_col = new Array(),
            items = $(this).find(listItem),
            min_items_per_col = Math.floor(items.length / num_cols),
            difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
            if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
            } else {
                items_per_col[i] = min_items_per_col;
            }
        }
        for (var i = 0; i < num_cols; i++) {
            $(this).append($('<ul ></ul>').addClass(listClass));
            for (var j = 0; j < items_per_col[i]; j++) {
                var pointer = 0;
                for (var k = 0; k < i; k++) {
                    pointer += items_per_col[k];
                }
                $(this).find('.' + listClass).last().append(items[j + pointer]);
            }
        }
    });
});
function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

/*
* qure safety end 
*/
/*
* countdown js start
*/
// ============== countdown JS ============
function createCountdownTimer(targetDate, targetElement) {
    // Update the countdown every 1 second
    const countdownInterval = setInterval(function () {
        const currentDate = new Date().getTime();
        const timeRemaining = targetDate - currentDate;

        if (timeRemaining <= 0) {
            // Countdown has ended
            clearInterval(countdownInterval);
            targetElement.querySelector(".theTimer").innerHTML = "Countdown Expired!";
        } else {
            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Update the countdown display for the target element
            targetElement.querySelector(".theTimer").innerHTML =
                `<span data-name="days">${padZeroes(days)}</span> <span class="dots">:</span> <span data-name="hours">${padZeroes(hours)}</span> <span class="dots">:</span> <span data-name="minutes">${padZeroes(minutes)}</span> <span class="dots">:</span> <span data-name="seconds">${padZeroes(seconds)}</span>`;
        }
    }, 1000);
}

// Function to pad zeroes to a number if it's less than 10
function padZeroes(num) {
    return num < 10 ? "0" + num : num;
}

// Set target dates and elements for each countdown section
const countdownSections = document.querySelectorAll(".countdown_timer");

countdownSections.forEach((section) => {
    const targetDate = new Date(section.getAttribute("data-target-date")).getTime();
    const targetElement = section.querySelector(".countdown_block");
    createCountdownTimer(targetDate, targetElement);
});
/*
* countdown js end
*/
/*
* skin promise js start
*/
(function () {
    'use strict';
    const breakpoint = window.matchMedia('(max-width:767px)');

    // keep track of swiper instances to destroy later
    let mySwiper;
    const breakpointChecker = function () {
        if (breakpoint.matches === true) {
            if (mySwiper !== undefined) mySwiper.destroy(true, true);
            return;
        } else if (breakpoint.matches === false) {
            return enableSwiper();

        }
    };


    const enableSwiper = function () {

        mySwiper = new Swiper('.skin_promises_slider', {
            slidesPerView: '3',
            spaceBetween: 10,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
            }
        });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
})();
/*
* skin promise js end
*/
/*
* BF Bundle Banner slider js start
*/
var swiper = new Swiper(".bundleCycleSlider", {
    initialSlide: 3,
    effect: "cards",
    // loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        delay: 4000,
    },
    cardsEffect: {
        perSlideOffset: 8, // Space between cards in px
        perSlideRotate: 0, // Rotation of cards in degrees
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});
/*
* BF Bundle Banner slider js end
*/
/*
* faq page js start
*/
$('.faq-menu__item a[href*="#"]').click(function (e) {
    $(".faq-menu__item").removeClass("active");
    $(this).parents("li").addClass("active");
    e.preventDefault()
    console.log("click11")
    var el = $(this),
        target = el.attr('href').substring(el.attr('href').indexOf("#")),
        indiTarget = $('[data-id="' + target + '"]');
    $(target).add(indiTarget).addClass('active').siblings().removeClass('active');
});
$("body").on("click", ".mobile-dropdown", function () {
    $(".faq-menu").slideToggle();
});

$(".faq-menu__url").click(function () {
    if ($(window).width() <= 767) {
        var activestr = $(this).text();
        var activesvg = $('.faq-menu__item.active .faq-menu__item-img-wrapper').html();
        //var activeImg = $(".faq-menu__item.active img").attr("src");
        console.log(activestr);
        console.log(activesvg);
        //$(".mobile-dropdown__content-img").attr("src",activeImg);
        $(".mobile-dropdown-svg").html(activesvg);
        $(".mobile-dropdown span").text(activestr);
        $(".faq-menu").hide();
    }
});
$(".custom-warranty-link, .custom-warranty-link span").click(function (e) {
    e.preventDefault()
    $(".faq-menu__item").removeClass("active");
    $(".faq-menu__item:nth-child(1)").addClass("active");
    var el = $(".faq-menu__item:nth-child(1) a"),
        target = el.attr('href'),
        indiTarget = $('[data-id="' + target + '"]');
    $(target).add(indiTarget).addClass('active').siblings().removeClass('active');
    $("html, body").animate({
        scrollTop: 400
    }, 200);
});

$('a.faq-menu__url[href*="#"]:not([href="#"])').click(function () {
    var target = $(this.hash);
    $('html,body').stop().animate({
        scrollTop: target.offset().top - 220
    }, 'linear');
});

$("a.faq").click(function () {
    $('html, body').animate({
        scrollTop: $("#shopify-section-landing-faq").offset().top
    }, 3000);
});
/*
* faq page js end
*/
/*
* offer page form js start
*/
$('input').each(function () {
    $(this).on('change', function () {
        var val = $(this).val();
        $(this).toggleClass("error", val.length >= 1)
    });
});
/*
* offer page form js end
*/


/*
* gift card js start
*/
var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    cardsEffect: {
        perSlideOffset: 2.5,
        perSlideRotate: 5,
    },
});

function goToSlide(slideIndex) {
    swiper.slideTo(slideIndex, 1000, false);
}
const variantList = document.querySelectorAll(".gift_variant");
function handleClick() {
    variantList.forEach(item => {
        item.classList.remove('gift_variant_active');
    });
    this.classList.add('gift_variant_active');
}

variantList.forEach(function (slide) {
    slide.addEventListener('click', handleClick);
    slide.addEventListener('click', function () {
        const dataValue = this.getAttribute('data-slideTo');
        const dataPrice = this.getAttribute('data-price');
        const resultPrice = dataPrice / 4;
        const resultPriceDiv = document.querySelector('.resultPrice');
        resultPriceDiv.innerHTML = resultPrice;
        console.log(dataValue);
        goToSlide(dataValue);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const variantActive = document.querySelector(".gift_variant_active");
    if (variantActive) {
        const dataValue = variantActive.getAttribute('data-slideTo');
        const dataPrice = variantActive.getAttribute('data-price');
        const resultPrice = dataPrice / 4;
        const resultPriceDiv = document.querySelector('.resultPrice');
        resultPriceDiv.innerHTML = resultPrice;
        console.log(dataValue);
        goToSlide(dataValue);
    }
});
/*
* gift card js end
*/

var initMicro = false;
var swiperMicro;
function swiperMicro() {
    if (window.innerWidth <= 767) {
        if (!initMicro) {
            initMicro = true;
            swiperMicro = new Swiper(".mobile_micro-slider", {
                slidesPerView: "1",
                // autoplay: {
                //   delay: 2000,
                //   disableOnInteraction: false,
                // },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }
    } else if (initMicro) {
        swiperMicro.destroy();
        initMicro = false;
    }
}
swiperMicro();
window.addEventListener("resize", swiperMicro);

//rpelacing &nbsp with blank space
var listItems = document.querySelectorAll('.ss_list li');
listItems.forEach(function (item) {
    if (item.innerHTML.includes('&nbsp;')) {
        item.innerHTML = item.innerHTML.replace(/&nbsp;/g, ' ');
    }
});



//  why should qurify your water start -- show more accordion
function handleExpandableCards() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        const qwCard = document.querySelectorAll(".qwCard_expandable");
        qwCard.forEach((story) => {
            const button = story.querySelector(".qwCard__accordion");
            button.addEventListener("click", () => {
                const paragraph = story.querySelector(".qwCard__hidden-div");
                const more_text = button.getAttribute("data-more") || "Show More..";
                const less_text = button.getAttribute("data-less") || "Show Less..";
                paragraph.classList.toggle("hidden");
                const text = paragraph.classList.contains("hidden")
                    ? more_text
                    : less_text;
                button.textContent = text;
            });
        });
    }
}
handleExpandableCards();
window.addEventListener('resize', handleExpandableCards);

// affect your skin start
const swiperAffect = new Swiper(".swiper-containerAffect", {
    // loop: true,
    slidesPerView: "2.5",
    spaceBetween: 20,
    breakpoints: {
        300: {
            slidesPerView: 1.1
        },
        600: {
            slidesPerView: 2.5,
            spaceBetween: 40,
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// affect your skin start
const swiperAffect2 = new Swiper(".swiper-containerAffect2", {
    // loop: true,
    slidesPerView: "1.05",
    spaceBetween: 20,
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
    }
});


var initQWater = false;
var swiperQWater;
function swiperQWater() {
    if (window.innerWidth >= 767) {
        if (!initQWater) {
            initQWater = true;
            swiperQWater = new Swiper(".q_w_slider", {
                slidesPerView: "3",
                spaceBetween: 45
            });
        }
    } else if (initQWater) {
        swiperQWater.destroy();
        initQWater = false;
    }
}
swiperQWater();
window.addEventListener("resize", swiperQWater);


//animation progress js
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation_active');
                observer.unobserve(entry.target); // Stop observing after the animation has been triggered once
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    document.querySelectorAll('.user_report_wrap').forEach(section => {
        observer.observe(section);
    });
});

//How to use section js start
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('#pills-tab-skin .nav-link');

    tabs.forEach(tab => {
        tab.addEventListener('show.bs.tab', function (event) {
            const targetId = event.target.getAttribute('data-bs-target');
            const targetPane1 = document.querySelector(`#pills-tabContent1 ${targetId}`);
            const targetPane2 = document.querySelector(`#pills-tabContent2 ${targetId.replace('1', '2')}`);

            document.querySelectorAll('#pills-tabContent1 .tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            document.querySelectorAll('#pills-tabContent2 .tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });

            if (targetPane1) {
                targetPane1.classList.add('show', 'active');
            }
            if (targetPane2) {
                targetPane2.classList.add('show', 'active');
            }
        });
    });
    $('.thumbs img').click(function () {
        $('.largeImage').attr('src', $(this).attr('src').replace('thumb', 'large'));
        $(this).addClass('current').siblings().removeClass('current');
    });
});


// Thumb Slider Start
var swiper = new Swiper(".bfs_mb_sl", {
    spaceBetween: 8,
    slidesPerView: 4.4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        768: {
            spaceBetween: 12,
            slidesPerView: 6.5,
        },

    },
});
var swiper2 = new Swiper(".bfs_mb_sl2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".thumb-next",
        prevEl: ".thumb-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});

$(document).ready(function () {
    // When a planBlock is clicked
    $('.planBlock').click(function () {
        // Get the image path from the selected plan
        var selectedImage = $(this).data('image');  // Retrieve the data-image attribute

        // Update the image source of the first column's image
        $('#bundleImage').attr('src', selectedImage);  // Update image src
    });
});

// Thumb Slider End

