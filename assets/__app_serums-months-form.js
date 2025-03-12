let product_type = 1; //default type
let product_period = 3; //default period
let product_variant = 43216377217263; //default product variant

let product_variants = [];

//Rejuvenating + Hydra-Soothing
product_variants[1] = [];  
product_variants[1][1] = 43216489513199; //1 month
product_variants[1][2] = 43216449208559; //2 months
product_variants[1][3] = 43216377217263; //3 months

//Rejuvenating
product_variants[2] = []; 
product_variants[2][1] = 43216457203951; //1 month
product_variants[2][2] = 43216398450927; //2 months
product_variants[2][3] = 43216299819247; //3 months

//Hydra-Soothing
product_variants[3] = [];
product_variants[3][1] = 43216483942639; //1 month
product_variants[3][2] = 43216434069743; //2 months
product_variants[3][3] = 43216359555311; //3 months

function selectProduct(destination)
{
    if(window.item === undefined || window.item.length == 0)
    {
        updateItemObject(product_variant);
    }

    document.querySelectorAll('.' + destination + 'productTypeObject').forEach(block => {
        block.addEventListener('click', function() {
            let productTypeElement = this.querySelector('.product_type');
            product_type = productTypeElement.getAttribute('data-product-type');
            let product_variant_id = product_variants[product_type][product_period];
            updateProductButtonHref(destination, product_variant_id);
            applySpecialPromo(destination, product_period, product_variant_id);
        });
    });

    document.querySelectorAll('.' + destination + 'productPeriodObject').forEach(block => {
        block.addEventListener('click', function() {
            let inputElement = this.querySelector('input');
            product_period = inputElement.getAttribute('data-product-period');
            let product_variant_id = product_variants[product_type][product_period];

            var regular_price = $(this).find(".regular_price").text();
            var sale_price = $(this).find(".sale_price").text();

            $("#regular_price").text(regular_price);
            $("#sale-price").text(sale_price);

            updateProductButtonHref(destination, product_variant_id);
            applySpecialPromo(destination, product_period, product_variant_id);
        });
    });
}

function updateProductButtonHref(destination, product_variant_id) {
    let buttons = document.querySelectorAll('.' + destination + 'productButtonObject');
    buttons.forEach(button => {
        if (button) {
            let href = button.getAttribute('href');
            let url = new URL(href, window.location.origin);
            updateItemObject(product_variant_id);
            url.searchParams.set('id', product_variant_id);
            button.setAttribute('href', url.toString());
        }
    });
}


function applySpecialPromo(destination, product_period, product_variant_id) {
   
    if(window.location.href.includes("micro-infusion-special-offer"))
    {
        let discountCode = '';

        var element = document.querySelector('#special-detail-container');
        if (element) {
            if(product_period == '2')
            {
                switch (product_variant_id) {
                    //Rejuvenating + Hydra-Soothing
                    case 43216449208559:
                        discountCode = 'BUY1GET1_H/R';
                    break;
                    //Rejuvenating
                    case 43216398450927:
                        discountCode = 'BUY1GET1_R';
                    break;
                    //Hydra-Soothing
                    case 43216434069743:
                        discountCode = 'BUY1GET1_H';
                    break;
                }

                fetch('/discount/' + discountCode).then(async () => {
                    let buttons = document.querySelectorAll('.' + destination + 'productButtonObject');
                    buttons.forEach(button => {
                        if (button) {
                            let href = button.getAttribute('href');
                            let url = new URL(href, window.location.origin);
                            updateItemObject(product_variant_id);
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
                        updateItemObject(product_variant_id);
                        url.searchParams.set('quantity', 1);
                        button.setAttribute('href', url.toString());
                    }
                });

                element.classList.remove('offer_active');
            }
        }
    }
}