let v2__product_type = 1; //default type
let v2__product_period = 3; //default period
let v2__product_variant = 45951935217903; //default product variant

let v2__product_variants = [];

//Rejuvenating + Hydra-Soothing
v2__product_variants[1] = [];  
v2__product_variants[1][1] = 43216489513199; //1 month
v2__product_variants[1][2] = 45951933022447; //2 months
v2__product_variants[1][3] = 45951935217903; //3 months

//Rejuvenating
v2__product_variants[2] = []; 
v2__product_variants[2][1] = 43216457203951; //1 month
v2__product_variants[2][2] = 45951954419951; //2 months
v2__product_variants[2][3] = 45951948947695; //3 months

//Hydra-Soothing
v2__product_variants[3] = [];
v2__product_variants[3][1] = 43216483942639; //1 month
v2__product_variants[3][2] = 45951928860911; //2 months
v2__product_variants[3][3] = 45951945474287; //3 months

function v2__selectProduct(destination)
{
    if(window.item === undefined || window.item.length == 0)
    {
        updateItemObject(v2__product_variant);
    }

    document.querySelectorAll('.' + destination + 'productTypeObject').forEach(block => {
        block.addEventListener('click', function() {
            let productTypeElement = this.querySelector('.product_type');
            v2__product_type = productTypeElement.getAttribute('data-product-type');

            let product_variant_id = v2__product_variants[v2__product_type][v2__product_period];
            v2__updateProductButtonHref(destination, product_variant_id);
        });
    });

    document.querySelectorAll('.' + destination + 'productPeriodObject').forEach(block => {
        block.addEventListener('click', function() {
            let inputElement = this.querySelector('input');
            v2__product_period = inputElement.getAttribute('data-product-period');

            let product_variant_id = v2__product_variants[v2__product_type][v2__product_period];

            var regular_price = $(this).find(".regular_price").text();
            var sale_price = $(this).find(".sale_price").text();

            $("#regular_price").text(regular_price);
            $("#sale-price").text(sale_price);

            v2__updateProductButtonHref(destination, product_variant_id);
        });
    });
}

function v2__updateProductButtonHref(destination, product_variant_id) {
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