document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        document.querySelectorAll('.bf-bundles__item-before').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '18px';
            }
        });

        document.querySelectorAll('.bf-bundles__item-after').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '21px';
            }
        });

        document.querySelectorAll('.subscribePrice p').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });

        document.querySelectorAll('.subscribePrice p span').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });

    }
    else {
        document.querySelectorAll('.bf-bundles__item-before').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '16px';
            }
        });

        document.querySelectorAll('.bf-bundles__item-after').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '18px';
            }
        }); 

        document.querySelectorAll('.subscribePrice p span').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '16px';
            }
        });

        document.querySelectorAll('.planBlock .price').forEach(item => {
            const currency = '€';
            if (item.textContent.includes(currency)) {
                item.style.fontSize = '14px';
            }
        });
    }

    if(Shopify.currency.active != 'USD')
    {
        const classesToReplace = 
        [
            'announcement_bar',
            'fp_icon_text',
            's_bx',
            'compare_list_Block', 
            'tmtFtr_des', 
            'cycle-save',
            'sale_p', 
            'fav_pdt_price', 
            'regular_price'
        ];

        classesToReplace.forEach(className => {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach(element => {
                element.innerHTML = element.innerHTML.replace(/\$\d+/g, function(match) {
                    return currency + match.slice(1);
                });

            });
        });
    }

    //set "no-subscription variant" for all pdp pages as default
    setTimeout(() => {
        var selector = '.subscriptionType[data-subscription="no-subscription"]';
        if (document.querySelector(selector)) {
            triggerClick(selector);
        }
    }, 750);

    //https://www.qureskincare.com/products/micro-infusion-targeted-patches
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
});

function triggerClick(selector) {
    var event = new Event('click', {
        'bubbles': true,
        'cancelable': true
    });
    var element = document.querySelector(selector);
    if (element) {
        element.dispatchEvent(event);
    } else {
        console.warn('Element with selector ' + selector + ' not found.');
    }
}

function setCookie(name, value, hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function openChat() {
    var iframe = document.getElementById('launcher');
  
    if (iframe) {
      setTimeout(function() {
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
        var button = iframeDocument.querySelector('[data-testid="launcher"]');
  
        if (button) {
          button.click();
        } else {
          console.error('Button not found in iframe');
        }
      }, 2000);
    } else {
      console.error('Iframe not found');
    }
}