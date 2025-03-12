const getUserName = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const userName = urlParams.get('name');

  if(!userName)return;
  const elements = document.querySelectorAll('.user-name');
  if(elements.length < 1)return;
  elements.forEach((elem) => {
    const name = elem.querySelector('.name');
    if(name){
      name.innerText = userName 
      elem.classList.remove('hidden')
    }
  })
}
function getShopifyCart () {
  return fetch('/cart.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

const removeProductBundle = async () => {
  try {
    const cart = await getShopifyCart();
    const getBundleInCart = cart.items.find(item => item.id === +(46199907123439));

    if (!getBundleInCart) {
      return { success: true, message: 'No bundle to remove' };
    }

    await window.cartRequestChange({
      id: getBundleInCart.key,
      quantity: 0
    }, {} );

    setTimeout(() => {
      return { success: true,message: 'Bundle remove' };
    }, 2000);

  } catch (error) {
    console.error('Error removing bundle:', error);
    throw error;
  }
}

const lifestyleInit = ()=>{
  if (!window.customElements.get('cards-tips')) {
    class CardsTips extends HTMLElement {

      static get observedAttributes() {
        return ['active-card'];
      }

      constructor() {
        super();
        this.cards = [];
      }

      connectedCallback() {
        this.updateCards();
        this.paginationClick();
        this.arrowsClick();
        this.popupClick();
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-card') {
          this.changeCard(oldValue, newValue);
        }
      }

      updateCards() {
        this.cards = Array.from(this.querySelectorAll('.card'));
      }

      paginationClick() {
        const btnsCards = this.querySelectorAll('.pagination .num');
        if(btnsCards.length < 1) return ;
        btnsCards.forEach((btn) => {
          btn.addEventListener('click',() => {
            this.setAttribute('active-card', btn.dataset.card);
          })
        })
      }

      arrowsClick() {
        const btnsNext = this.querySelectorAll('.next')
        const btnsPrevieus = this.querySelectorAll('.previous')

        if( btnsNext.length < 1 && btnsPrevieus < 1) return ;

        btnsNext.forEach((btn) => {
          btn.addEventListener('click',() => {
            const nextCard = parseInt(this.getAttribute('active-card')) + 1;
            if( nextCard > this.cards.length ) return ;
            this.setAttribute('active-card', nextCard)
          })
        });

        btnsPrevieus.forEach((btn) => {
          btn.addEventListener('click',() => {
            const previousCard = parseInt(this.getAttribute('active-card')) - 1;
            if( previousCard < 1 ) return ;
            this.setAttribute('active-card', previousCard)
          })
        });
      }
      popupClick(){
        const btns = this.querySelectorAll('.btn-popup');
        if(btns.length < 1) return;
        btns.forEach((btn) => {
          const popup = this.querySelector(`.popup-source[data-index="${ btn.dataset.index }"]`)
          if(!popup) return;
          btn.addEventListener('click',() => {
            popup.classList.remove('hidden');
          })
          const close = popup.querySelector('.close');
          if(!close) return;
          close.addEventListener('click',() => {
            popup.classList.add('hidden');
          })
        })
      }

      changeCard(oldValue, newValue) {

        if (!newValue || !oldValue || newValue === oldValue) return ;

        if (!this.cards.length) this.updateCards();

        const activatedCard = this.querySelector(`.card[index="${newValue}"]`);
        const desactivatedCard = this.querySelector(`.card[index="${oldValue}"]`);

        if (activatedCard === desactivatedCard) return;
        if (!activatedCard) return;

        if (!desactivatedCard) {
          this.cards.forEach((card) => {
            card.classList.remove('active');
          });
        } else {
          desactivatedCard.classList.remove('active');
        }

        if (activatedCard) {
          activatedCard.classList.add('active');
        }
      }
    }
    window.customElements.define('cards-tips', CardsTips);
  }
}

const regimenInit = () => {
    if (!window.customElements.get('regimen-steps')) {
      class RegimenSteps extends HTMLElement {
        static get observedAttributes() {
          return ['active-step'];
        }

        constructor() {
          super();
          this.steps = [];
          this.tabs = [];
        }

        connectedCallback() {
          this.updateSteps();
          this.paginationClick();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'active-step') {
            this.changeStep(oldValue, newValue);
          }
        }

        updateSteps() {
          this.steps = Array.from(this.querySelectorAll('.step'));
          this.tabs = Array.from(this.querySelectorAll('.tab'));
        }

        paginationClick() {
          if(this.tabs.length < 1) return ;
          this.tabs.forEach((tab) => {
            tab.addEventListener('click',() => {
              this.setAttribute('active-step', tab.getAttribute('index') );
            })
          })
        }

        changeStep(oldValue, newValue) {
          if (!newValue || !oldValue || newValue === oldValue) return ;

          if (!this.steps.length && !this.tabs.length ) this.updateSteps();

          const activatedStep = this.querySelector(`.step[index="${newValue}"]`);
          const desactivatedStep = this.querySelector(`.step[index="${oldValue}"]`);

          const activatedTab = this.querySelector(`.tab[index="${newValue}"]`);
          const desactivatedTab = this.querySelector(`.tab[index="${oldValue}"]`);


          if (activatedStep === desactivatedStep) return;
          if (!activatedStep) return;

          if (activatedTab === desactivatedTab) return;
          if (!activatedTab) return;

          if (!desactivatedStep) {
            this.steps.forEach((step) => {
              step.classList.remove('active');
            });
          } else {
            desactivatedStep.classList.remove('active');
          }

          if (!desactivatedTab) {
            this.tabs.forEach((tab) => {
              tab.classList.remove('active');
            });
          } else {
            desactivatedTab.classList.remove('active');
          }

          if (activatedStep) {
            activatedStep.classList.add('active');
          }

          if (activatedTab) {
            activatedTab.classList.add('active');
          }
        }
      }
      window.customElements.define('regimen-steps', RegimenSteps);
    }
}

const resultsSliderInit = () => {
    let swiper = new Swiper(".pwd-result_slider", {
      spaceBetween: 38,
      centeredSlides:true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: {
        forceToAxis: true,
      },
      breakpoints: {
        556: {
          slidesPerView: 1,
          centeredSlidesBounds:true,
        },
        768: {
          slidesPerView: 2,
          centeredSlides:false,
        },
        1024: {
          slidesPerView: 3,
          centeredSlides:false,
        },
      },
    });
}

const dermFeatureInit = () => {
    if (!window.customElements.get('slider-df')) {
      class SliderDermFeature extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          const swiper = new Swiper(this.querySelector(".sdf"), {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: false,
            mousewheel: {
              forceToAxis: true,
            },
            breakpoints: {
              600:{
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 40,
                centeredSlides: false,
              }
            },
            pagination: {
              el: ".sdf-pagination",
              clickable: true,
            }
          });
          this.clickVideo()
        }
        clickVideo(){
          const slides = this.querySelectorAll('.video-cont') ;
          if(slides.length > 0){
            slides.forEach((slide) => {
              slide.addEventListener('click', () => {
                const overlay = this.querySelector('.overlay-popup-sdf')
                const videoCont = this.querySelector(`.pwd-video[data-index="${ slide.dataset.index }"]`)
                const video = videoCont.querySelector('video');
                videoCont.dataset.active = 'true';
                overlay.classList.remove('hidden')
                videoCont.classList.remove('hidden');
                video.play();
                const floatingBundle = document.querySelector('flating-bundle');
                if (floatingBundle) floatingBundle.classList.add('hidden');
              })
            })
          }
          

          const videos = this.querySelectorAll('.pwd-video video')
          if(videos.length > 0){
            videos.forEach((video) => {
              video.addEventListener('click', (event) => {
                event.stopPropagation();
              })
            })
          }
          

          const overlay = this.querySelector('.overlay-popup-sdf')
          overlay.addEventListener('click', () => {
            const videoCont = this.querySelector('.pwd-video[data-active="true"]')
            const video = this.querySelector('.pwd-video[data-active="true"] video')
            const iframe = this.querySelector('.pwd-video[data-active="true"] iframe')

            if(video) video.pause();
            
            if(iframe){
              const iframeCopy = iframe.cloneNode(true)
              videoCont.innerHTML = ''
              videoCont.appendChild(iframeCopy)
            }
            overlay.classList.add('hidden')
            videoCont.classList.add('hidden')
            videoCont.dataset.active = 'false';

            const floatingBundle = document.querySelector('flating-bundle');
            if (floatingBundle) floatingBundle.classList.remove('hidden');
          })

        }
      }
      window.customElements.define('slider-df', SliderDermFeature);
    }
}

const dualTextImgInit = () => {
    const btns = document.querySelectorAll('.cont-btn')
    if(btns.length < 1 ) return ;
    btns.forEach((btn) => {
      btn.addEventListener('click', () =>{
        const textBody = document.querySelector(`.text-body[data-id="${ btn.dataset.id }"]`)
        if(!textBody)return;
        if(textBody.dataset.open === "false"){
          textBody.dataset.open = "true"
          btn.textContent = "Read Less";
        }else{
          textBody.dataset.open = "false"
          btn.textContent = "Read More";
        }
      })
    })
}

const productsBundleInit = ()=>{
    if (!window.customElements.get('products-bundle')) {
      class productsBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array','data-bundle-used'];
        }

        constructor() {
          super();
          window.addEventListener('resize', () => {
            this.updateViewportHeight();
          });
        }

        connectedCallback() {
          this.mediaTab();
          this.addProductToBundle();
          this.bundleToCart();
          this.displayPopup();
          this.updateViewportHeight();
          this.setBundleArray();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
          }
          if(name == 'data-bundle-used'){
            this.isUsedBundle(newValue);
          }
        }
        mediaTab(){
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => { 
            const btns = card.querySelectorAll('.media-btns div')
            btns.forEach((btn) => {
              btn.addEventListener('click',() => {
                const medias = card.querySelectorAll('.media .src')
                medias.forEach((media) => {
                  media.classList.add('hidden')
                })
                btns.forEach((btn) => {
                  btn.classList.remove('active')
                })
                const showMedia = card.querySelector(`.media .${ btn.dataset.ref }`)
                showMedia.classList.remove('hidden')
                btn.classList.add('active')
              })
            })
          })
        }
        addProductToBundle(){
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => {
            const btn = card.querySelector('.bundle-btn')
            btn.addEventListener('click',() => {
              const idProduct = btn.dataset.productId;
              if(card.classList.contains('active')){
                //card.classList.remove('active')
                const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
                const newArrayBundle = arrayBundle.filter((id) => id != idProduct )

                localStorage.setItem(`${window.templateName}-bundleArray`, JSON.stringify(newArrayBundle));
                this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))

              }else{
                //card.classList.add('active')
                let arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));

                if(arrayBundle.includes(idProduct))return;

                arrayBundle.push(idProduct)

                localStorage.setItem(`${window.templateName}-bundleArray`, JSON.stringify(arrayBundle));
                this.setAttribute('data-bundle-array', JSON.stringify(arrayBundle) )
              }
            })
          })
        }
        displayPopup(){
          const btnsLearnMore = this.querySelectorAll('.learn-more')
          const btnsClosePopup = this.querySelectorAll('.close-popup')
          const container = this.querySelector('.container-pb')
          btnsLearnMore.forEach((btn) => {
            btn.addEventListener('click',() => {
              const cardPopup = container.querySelector(`.card-bundle[data-product-id="${ btn.dataset.productId }"]`) 
              container.classList.remove('popup-hidden')
              container.classList.add('popup-show')
              cardPopup.classList.remove('hidden-mobile')
              cardPopup.classList.add('show-mobile')
              document.body.style.overflow = 'hidden';
              document.body.style.height = '100dvh';

            })
          })

          btnsClosePopup.forEach((btn) => {
            btn.addEventListener('click',() => {
              const cardPopup = container.querySelector(`.card-bundle[data-product-id="${ btn.dataset.productId }"]`) 
              container.classList.remove('popup-show')
              container.classList.add('popup-hidden')
              cardPopup.classList.remove('show-mobile')
              cardPopup.classList.add('hidden-mobile')
              document.body.style.removeProperty('overflow');
              document.body.style.removeProperty('height');
            })
          })
        }
        bundleToCart(){
          const btnSubmit = this.querySelector('.btn-section')
          if(!btnSubmit) return;
          btnSubmit.addEventListener('click',async () => {
            const cartBundleMessage = document.querySelector('.cart-bundle-message');
            if(cartBundleMessage) cartBundleMessage.classList.remove('hidden');

            if(this.getAttribute('data-bundle-used') === 'true') {
              const usedMessage = document.querySelector('.cart-bundle-message__used-bundle');
              if(usedMessage) usedMessage.classList.remove('hidden')
              await removeProductBundle();
            }else {
              const unusedMessage = document.querySelector('.cart-bundle-message__unused-bundle')
              if(unusedMessage) unusedMessage.classList.remove('hidden')
            }

            const cards = this.querySelectorAll('.container-pb .card-bundle')
            cards.forEach((card) => {
              if(!card.classList.contains('active')){
                const btn = card.querySelector('.bundle-btn')
                btn.click()
              }
            })

            const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
            const bundleId = this.getAttribute('data-bundle-id')
            const bundleInfoLiquid = JSON.parse(this.getAttribute('bundle-info'));
            const bundleInfo = `{"id":"${ bundleId }" ,"name":"${ bundleInfoLiquid.name }", "discounts":${JSON.stringify(bundleInfoLiquid.discounts)}, "parentId": "${ bundleInfoLiquid.parentId }", "image":"https://cdn.shopify.com/s/files/1/0441/1431/3365/files/Icon_ca2ca798-4d5f-48c4-9d07-ac219c7dc598.svg?v=1738177012" }`

            const items = []
            arrayBundle.forEach((item) => {
              items.push({
                id: item,
                quantity: 1,
                properties:{
                  _pack_id: bundleId,
                  _bundleInfo: bundleInfo
                }
              })
            })

            if(items.length < 1) return;

            window.cartRequestAdd({
              items
            }, {} )

            setTimeout(() => {
              if(cartBundleMessage) cartBundleMessage.classList.add('hidden');
              const usedMessage = document.querySelector('.cart-bundle-message__used-bundle');
              if(usedMessage) usedMessage.classList.add('hidden')
              const unusedMessage = document.querySelector('.cart-bundle-message__unused-bundle')
              if(unusedMessage) unusedMessage.classList.add('hidden')
            }, 4000);

            this.setAttribute('data-bundle-used', 'true') 
          })
        }

        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue)
          const cards = this.querySelectorAll('.card-bundle')
          cards.forEach((card) => {
            if(arrayBundle.includes(card.dataset.productId)){
              card.classList.add('active')
            }else{
              card.classList.remove('active')
            }
          })
          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
        }
        isUsedBundle(newValue){
          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-used');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-used', newValue)
            }
          })
        }

        updateViewportHeight() {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setBundleArray(){
          const arrayBundleStorage = localStorage.getItem(`${window.templateName}-bundleArray`);
          if(!arrayBundleStorage) return;
          this.setAttribute('data-bundle-array', arrayBundleStorage);
        }
      }
      window.customElements.define('products-bundle', productsBundle );
    }
}

const flatingBundleInit = ()=>{
    if (!window.customElements.get('flating-bundle')) {
      class flatingBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array','data-bundle-used'];
        }

        constructor() {
          super();
          this.discount = 0;
          this.totalPrice = 0;
          document.addEventListener('cartRemoveBundle', () => {
            this.resetProductBundle();
          });
        }

        connectedCallback() {
          this.deleteProduct();
          this.showBarresponsive();
          this.bundleToCart();
          this.updateButtonBundleSavePrice();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
            this.updatePrice()
            this.updateProgressBars()
          }
          if(name == 'data-bundle-used'){
            this.isUsedBundle(newValue);
          }
        }
        deleteProduct(){
          const btnsClose = this.querySelectorAll('.close')
          btnsClose.forEach((btn) => {
            btn.addEventListener('click', () => {
              const idProduct = btn.dataset.productId
              const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
              const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
              localStorage.setItem(`${window.templateName}-bundleArray`, JSON.stringify(newArrayBundle));
              this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))
            })
          })
        }
        showBarresponsive(){
          const btnShow = this.querySelector('.btn-mobile')
          const lockDiscount = this.querySelector('.lock-discount')
          const hideBundleSelector = this.querySelector('.bundleprice');

          const hBar = this.querySelector('.hbar')
          btnShow.addEventListener('click', () => {
            btnShow.classList.add('show-responsive')
            lockDiscount.classList.remove('show-responsive')
            hBar.classList.remove('show-responsive')
          })
            
          lockDiscount.addEventListener('click', () => {
            btnShow.classList.remove('show-responsive')
            lockDiscount.classList.add('show-responsive')
            hBar.classList.add('show-responsive')
          })

          if(window.innerWidth < 768){
            hideBundleSelector.addEventListener('click', () => {
              btnShow.classList.remove('show-responsive')
              lockDiscount.classList.add('show-responsive')
              hBar.classList.add('show-responsive')
            })
          }

        }
        bundleToCart(){
          const btnSubmit = this.querySelector('.btn-discount')
          if(!btnSubmit) return;
          btnSubmit.addEventListener('click',async () => {
            const cartBundleMessage = document.querySelector('.cart-bundle-message');
            if(cartBundleMessage) cartBundleMessage.classList.remove('hidden');

            if(this.getAttribute('data-bundle-used') === 'true') {
              const usedMessage = document.querySelector('.cart-bundle-message__used-bundle');
              if(usedMessage) usedMessage.classList.remove('hidden')
              await removeProductBundle();
            }else {
              const unusedMessage = document.querySelector('.cart-bundle-message__unused-bundle')
              if(unusedMessage) unusedMessage.classList.remove('hidden')
            }

            btnSubmit.parentElement.classList.add('loading');
            const bundleId = this.getAttribute('data-bundle-id')
            const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
            const bundleInfoLiquid = JSON.parse(this.getAttribute('bundle-info'));
            const bundleInfo = `{"id":"${ bundleId }" ,"name":"${ bundleInfoLiquid.name }", "discounts":${JSON.stringify(bundleInfoLiquid.discounts)}, "parentId": "${ bundleInfoLiquid.parentId }", "image":"https://cdn.shopify.com/s/files/1/0441/1431/3365/files/Icon_ca2ca798-4d5f-48c4-9d07-ac219c7dc598.svg?v=1738177012" }`

            const items = []
            arrayBundle.forEach((item) => {
              items.push({
                id: item,
                quantity: 1,
                properties:{
                  _pack_id: bundleId,
                  _bundleInfo: bundleInfo
                }
              })
            })

            if(items.length < 1) return;

            window.cartRequestAdd({
              items
            }, {} )
            setTimeout(() => {
              if(cartBundleMessage) cartBundleMessage.classList.add('hidden');

              btnSubmit.parentElement.classList.remove('loading');

              const usedMessage = document.querySelector('.cart-bundle-message__used-bundle');
              if(usedMessage) usedMessage.classList.add('hidden')
              const unusedMessage = document.querySelector('.cart-bundle-message__unused-bundle')
              if(unusedMessage) unusedMessage.classList.add('hidden')

            }, 4000);
            this.setAttribute('data-bundle-used', 'true')
            
          })
        }
        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue);
          const arrayCubesDiscount = this.querySelectorAll('.cube-discount')
          arrayCubesDiscount.forEach((cubeDiscount) => {
            cubeDiscount.querySelector('.cont-text').classList.remove('hidden')
            const cubeProducts = cubeDiscount.querySelectorAll('.cube-discount-product');
            cubeProducts.forEach((product) => {
              if(!product.classList.contains('hidden')){
                product.classList.add('hidden')
              }
            })
          })
          arrayBundle.forEach((idProduct, index ) => {
            const cubeDiscount = arrayCubesDiscount[index]
            cubeDiscount.querySelector('.cont-text').classList.add('hidden')
            cubeDiscount.querySelector(`.cube-discount-product[data-product-id="${ idProduct }"]`).classList.remove('hidden')

          })

          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
          let price = 0
          if(arrayBundle.length > 0 ){
            const lastCube = arrayCubesDiscount[ arrayBundle.length - 1 ]
            this.discount = lastCube.getAttribute('data-discount-percentage')

            arrayBundle.forEach((idProduct) => {
              const product = lastCube.querySelector(`.cube-discount-product[data-product-id="${ idProduct }"]`)
              const productPrice = product.getAttribute('data-product-price')
              price += parseInt(productPrice)
            })
            this.totalPrice = price;

          }else{
            this.discount = 0;
            this.totalPrice = 0;
          }
        }
        isUsedBundle(newValue){
          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-used');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-used', newValue)
            }
          })
        }

        updatePrice(){
          const price = (this.totalPrice / 100).toFixed(2);
          const discount = (this.totalPrice * this.discount ) / 100;
          const bundlePrice = (price - discount / 100).toFixed(2) ;
          const saveAmountCalc = Math.abs(bundlePrice - price).toFixed(2);

          const currencySymbol = document.querySelector('[data-card-bundle-product-price-money]').dataset.cardBundleProductPriceMoney;

          const store_currency = window['__cvg_shopify_info']['currency'];

          const totalPrice = new Intl.NumberFormat(window.Shopify.locale, {
            style: 'currency',
            currency: store_currency,
          }).format(price);

          const totalBudle = new Intl.NumberFormat(window.Shopify.locale, {
            style: 'currency',
            currency: store_currency,
          }).format(bundlePrice);

          const saveBundlePrice = new Intl.NumberFormat(window.Shopify.locale, {
            style: 'currency',
            currency: store_currency,
          }).format(saveAmountCalc);

          const cleanTotalPrice = totalPrice.replace('$', '');
          const totalPriceWithCurrency = currencySymbol.replace(/\d*\.?\d+/, cleanTotalPrice);

          const cleanTotalBudle = totalBudle.replace('$', '');
          const totalBundleWithCurrency = currencySymbol.replace(/\d*\.?\d+/, cleanTotalBudle);

          const cleanSaveBundlePrice = saveBundlePrice.replace('$', '');
          const totalSaveBundlePriceWithCurrency = currencySymbol.replace(/\d*\.?\d+/, cleanSaveBundlePrice);

          this.querySelector('.price-discount').classList.toggle('hidden-price', price == 0);
          this.querySelector('.lock-discount').classList.toggle('hidden', price != 0);
          if(price != 0) this.openFloatingBundle();
          this.querySelector('.full-price').innerHTML = price != 0 ? totalPriceWithCurrency :  '-';
          this.querySelector('.discount-price').innerHTML = bundlePrice != 0 ? totalBundleWithCurrency : '';
          this.querySelector('.bundle-discount__save-price').innerHTML = saveAmountCalc != 0 ? totalSaveBundlePriceWithCurrency : '';
        }

        updateButtonBundleSavePrice () {
          let price = 0;
          let discount = 0;
          document.querySelectorAll('[data-card-bundle-product-price]').forEach((card) => {
              const productPrice = card.getAttribute('data-card-bundle-product-price')
              price += parseInt(productPrice);
          });

          const discountCards = this.querySelectorAll('[data-discount-percentage]');
          const lastDiscountCard = discountCards[discountCards.length - 1];
          discount = lastDiscountCard.getAttribute('data-discount-percentage');

          const priceCalc = (price / 100).toFixed(2);
          const discountCalc = (price * discount ) / 100;
          const bundlePriceCalc = (priceCalc - discountCalc / 100).toFixed(2) ;
          const saveAmountCalc = Math.abs(bundlePriceCalc - priceCalc).toFixed(2);

          const currencySymbol = document.querySelector('[data-card-bundle-product-price-money]').dataset.cardBundleProductPriceMoney;
          const store_currency = window['__cvg_shopify_info']['currency'];

          const totalDiscount = new Intl.NumberFormat(window.Shopify.locale, {
            style: 'currency',
            currency: store_currency,
          }).format(saveAmountCalc);

          const cleanTotalDiscount = totalDiscount.replace('$', '');
          const totalDiscountWithCurrency = currencySymbol.replace(/\d*\.?\d+/, cleanTotalDiscount);

          const buttonSectionPrice = document.querySelector('.btn-section .price');
          if(buttonSectionPrice) buttonSectionPrice.innerHTML = totalDiscountWithCurrency;
        }

        updateProgressBars() {

          const progressBars = document.querySelectorAll('.grid-discount__progress-bar');
          const cards = document.querySelectorAll('.cube-discount');
          
          progressBars.forEach((progressBar, index) => {
            const currentCard = cards[index];
            const nextCard = cards[index + 1];
            
            if (currentCard && nextCard) {
              const currentHasProduct = Array.from(currentCard.querySelectorAll('.cube-discount-product'))
                .some(product => !product.classList.contains('hidden'));
                
              const nextHasProduct = Array.from(nextCard.querySelectorAll('.cube-discount-product'))
                .some(product => !product.classList.contains('hidden'));
              
              const progressFill = progressBar.querySelector('.grid-discount__progress-fill');
              
              if (currentHasProduct && nextHasProduct) {
                progressFill.style.width = '100%';
              } else if (currentHasProduct) {
                progressFill.style.width = '50%';
              } else {
                progressFill.style.width = '0%';
              }
            }
          });

        }

        resetProductBundle(){

          this.dataset.bundleUsed = 'false';
          const productBundleGrid = document.querySelector('products-bundle');
          if (productBundleGrid) {
            productBundleGrid.setAttribute('data-bundle-used', 'false');
            productBundleGrid.querySelector('.btn-section').classList.remove('disabled');
          }
          const btnSubmit = this.querySelector('.btn-discount');
          btnSubmit.classList.remove('disabled');
          localStorage.setItem(`${window.templateName}-bundleArray`, JSON.stringify([]));
          this.setAttribute('data-bundle-array', JSON.stringify([]));
        }

        openFloatingBundle(){
          const btnShow = this.querySelector('.btn-mobile')
          const hBar = this.querySelector('.hbar')
          if (btnShow) btnShow.classList.add('show-responsive')
          if(hBar) hBar.classList.remove('show-responsive')
          this.querySelector('.lock-discount').classList.remove('show-responsive')
        }
      }
      window.customElements.define('flating-bundle', flatingBundle );
    }
}

const  closureBundleInit = ()=>{
    if (!window.customElements.get('closure-bundle')) {
      class closureBundle extends HTMLElement {

        static get observedAttributes() {
          return ['data-bundle-array'];
        }

        constructor() {
          super();
        }

        connectedCallback() {
          this.addProductToBundle();
        }
        attributeChangedCallback(name, oldValue, newValue) {
          if(name == 'data-bundle-array'){
            this.changeArrayBundle(oldValue,newValue);
          }
        }
        addProductToBundle(){
          const cards = this.querySelectorAll('.card-product')
          cards.forEach((card) => {
            const btn = card.querySelector('.btn-bundle')
            btn.addEventListener('click',() => {
              const idProduct = btn.dataset.productId;
              if(card.classList.contains('active')){
                //card.classList.remove('active')
                const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
                const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
                this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))

              }else{
                //card.classList.add('active')
                let arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));

                if(arrayBundle.includes(idProduct))return;

                arrayBundle.push(idProduct)
                this.setAttribute('data-bundle-array', JSON.stringify(arrayBundle) )
              }
            })
          })
          const tags = this.querySelectorAll('.mobile .info-closure')
          tags.forEach((tag) => {
            const btn = tag.querySelector('.btn-quit')
            btn.addEventListener('click', () => {
              const idProduct = tag.dataset.productId ;
              const arrayBundle = JSON.parse(this.getAttribute('data-bundle-array'));
              const newArrayBundle = arrayBundle.filter((id) => id != idProduct )
              this.setAttribute('data-bundle-array', JSON.stringify(newArrayBundle))
            })
          })
        }
        changeArrayBundle(oldValue, newValue){
          const arrayBundle = JSON.parse(newValue)
          const cards = this.querySelectorAll('.card-product')
          const checks = this.querySelectorAll('.info-closure')
          cards.forEach((card) => {
            if(arrayBundle.includes(card.dataset.productId)){
              card.classList.add('active')
            }else{
              card.classList.remove('active')
            }
          })
          checks.forEach((check) => {
            if(arrayBundle.includes(check.dataset.productId)){
              check.classList.add('active')
            }else{
              check.classList.remove('active')
            }
          })

          const idBundle = this.getAttribute('data-bundle-id')
          const allSection = document.querySelectorAll(`[data-bundle-id="${ idBundle }"]`)
          allSection.forEach((section) => {
            const sectionBundle = section.getAttribute('data-bundle-array');
            if( newValue != sectionBundle){
              section.setAttribute('data-bundle-array', newValue)
            }
          })
          
        }
      }
      window.customElements.define('closure-bundle', closureBundle );
    }
}

document.addEventListener('DOMContentLoaded', () => {
  getUserName();
  closureBundleInit();
  flatingBundleInit();
  productsBundleInit();
  dualTextImgInit();
  dermFeatureInit();
  resultsSliderInit();
  regimenInit();
  lifestyleInit();
});
