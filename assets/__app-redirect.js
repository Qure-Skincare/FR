async function getClientIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

async function getCountryCode(ip) {
    try {
        const randomNum = Math.floor(Math.random() * 100000) + 1;
        const response = await fetch(`http://ipwhois.pro/${ip}?key=SUX3btwlpP5R3Gs8&random=${randomNum}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'UNKNOWN';
    }
}

async function main() {
    const clientIp = await getClientIp();
    if (clientIp === null) {
        console.error('Could not retrieve client IP address');
        return;
    }

    const countryCode = await getCountryCode(clientIp);

    console.log('countryCode [' + countryCode + ']');

    if (['US'].includes(countryCode)) {
        if(window.location.href.includes('exclusive-holiday-bundle-deal'))
        {
            document.querySelectorAll('.hide_us').forEach(element => {
                element.style.display = 'none';
            });

            setTimeout(() => {
                const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
    
                if(swiperInstanceMain != undefined)
                {
                    swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                }
    
                if(swiperInstanceThumbs != undefined)
                {
                    swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                }
            }, 1500)
        }
        if(window.location.href.includes('exclusive-holiday-bundle-deal-new'))
        {
            document.querySelectorAll('.hide_us').forEach(element => {
                element.style.display = 'none';
            });

            setTimeout(() => {
                const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
    
                if(swiperInstanceMain != undefined)
                {
                    swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                }
    
                if(swiperInstanceThumbs != undefined)
                {
                    swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                }
            }, 1500)
        }
        else if(window.location.href.includes('exclusive-black-friday'))
        {
            document.querySelectorAll('.hide_us').forEach(element => {
                element.style.display = 'none';
            });

            setTimeout(() => {
                const swiperInstanceMain = document.querySelector('.bfs_mb_sl2').swiper;
                const swiperInstanceThumbs = document.querySelector('.bfs_mb_sl').swiper;
    
                if(swiperInstanceMain != undefined)
                {
                    swiperInstanceMain.removeSlide([1, 7, 8, 10]);
                }
    
                if(swiperInstanceThumbs != undefined)
                {
                    swiperInstanceThumbs.removeSlide([1, 7, 8, 10]);
                }
            }, 1500)
        }
        else if(window.location.href.includes('best-sellers'))
        {
            document.getElementById('q-urify-water-filter').style.display = 'none';
        }
        else if(window.location.href.includes('acne-breakouts'))
        {
            document.getElementById('q-urify-water-filter').style.display = 'none';
        }
        else if(window.location.href.includes('fine-line-wrinkles'))
        {
            document.getElementById('q-urify-water-filter').style.display = 'none';
        }
        /* */
        else if(window.location.href.includes('breakout-control-pro-1'))
        {
            window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
        }
        else if(window.location.href.includes('breakout-control-starter'))
        {
            window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
        }
        else if(window.location.href.includes('filter-family-bundle'))
        {
            window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
        }
        else if(window.location.href.includes('line-refine-bundle-advanced-1'))
        {
            window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal';
        }
        else if(window.location.href.includes('shower-filter'))
        {
            window.location = 'https://www.qureskincare.com/pages/shower-filter-trynow';
        }
        else
        {
            window.location = 'https://www.qureskincare.com/collections/best-sellers';
        }
    }
}

main();