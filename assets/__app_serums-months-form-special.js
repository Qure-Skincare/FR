let s__product_type = 2; //default type
let s__product_period = 2; //default period
let s__product_variant = 45889990754543; //default product variant

let s__product_variants = [];

//Rejuvenating + Hydra-Soothing
s__product_variants[1] = [];  
s__product_variants[1][1] = 43216489513199; //1 month
s__product_variants[1][2] = 45889978302703; //2 months
s__product_variants[1][3] = 45889975353583; //3 months

//Rejuvenating
s__product_variants[2] = []; 
s__product_variants[2][1] = 43216457203951; //1 month
s__product_variants[2][2] = 45889990754543; //2 months
s__product_variants[2][3] = 45889972437231; //3 months

//Hydra-Soothing
s__product_variants[3] = [];
s__product_variants[3][1] = 43216483942639; //1 month
s__product_variants[3][2] = 45889987641583; //2 months
s__product_variants[3][3] = 45889963065583; //3 months

function s__selectProduct(destination)
{
    if(window.item === undefined || window.item.length == 0)
    {
        updateItemObject(s__product_variant);
    }

    document.querySelectorAll('.' + destination + 'productTypeObject').forEach(block => {
        block.addEventListener('click', function() {
            let productTypeElement = this.querySelector('.product_type');
            s__product_type = productTypeElement.getAttribute('data-product-type');
            let s__product_variant_id = s__product_variants[s__product_type][s__product_period];
            s__updateProductButtonHref(destination, s__product_variant_id);
            s__applySpecialPromo(destination, s__product_period, s__product_variant_id);
        });
    });

    document.querySelectorAll('.' + destination + 'productPeriodObject').forEach(block => {
        block.addEventListener('click', function() {
            let inputElement = this.querySelector('input');
            s__product_period = inputElement.getAttribute('data-product-period');
            let s__product_variant_id = s__product_variants[s__product_type][s__product_period];

            var regular_price = $(this).find(".regular_price").text();
            var sale_price = $(this).find(".sale_price").text();

            $("#regular_price").text(regular_price);
            $("#sale-price").text(sale_price);

            s__updateProductButtonHref(destination, s__product_variant_id);
            s__applySpecialPromo(destination, s__product_period, s__product_variant_id);
        });
    });
}

function s__updateProductButtonHref(destination, s__product_variant_id) {
    let buttons = document.querySelectorAll('.' + destination + 'productButtonObject');
    buttons.forEach(button => {
        if (button) {
            let href = button.getAttribute('href');
            let url = new URL(href, window.location.origin);
            updateItemObject(s__product_variant_id);
            url.searchParams.set('id', s__product_variant_id);
            button.setAttribute('href', url.toString());
        }
    });
}


function s__applySpecialPromo(destination, s__product_period, s__product_variant_id) {
   
    let discountCode = '';

    var element = document.querySelector('#special-detail-container');
    if (element) {
        if(s__product_period == '2')
        {
            switch (s__product_variant_id) {
                //Rejuvenating + Hydra-Soothing
                case 45889978302703:
                    discountCode = 'BUY1GET1_H/R';
                break;
                //Rejuvenating
                case 45889990754543:
                    discountCode = 'BUY1GET1_R';
                break;
                //Hydra-Soothing
                case 45889987641583:
                    discountCode = 'BUY1GET1_H';
                break;
            }

            fetch('/discount/' + discountCode).then(async () => {
                let buttons = document.querySelectorAll('.' + destination + 'productButtonObject');
                buttons.forEach(button => {
                    if (button) {
                        let href = button.getAttribute('href');
                        let url = new URL(href, window.location.origin);
                        updateItemObject(s__product_variant_id);
                        url.searchParams.set('quantity', 2);
                        button.setAttribute('href', url.toString());
                    }
                });

                element.classList.add('offer_active');
            });
        }
        else 
        {
            let buttons = document.querySelectorAll('.' + destination + 'productButtonObject');
            buttons.forEach(button => {
                if (button) {
                    let href = button.getAttribute('href');
                    let url = new URL(href, window.location.origin);
                    updateItemObject(s__product_variant_id);
                    url.searchParams.set('quantity', 1);
                    button.setAttribute('href', url.toString());
                }
            });

            element.classList.remove('offer_active');
        }
    }
}