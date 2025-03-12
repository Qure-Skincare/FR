function selectProductRefill(destination, product_variant)
{
    if(window.item === undefined || window.item.length == 0)
    {
        updateItemObject(product_variant);
    }

    // Event listener for all options
    document.querySelectorAll('input[type="radio"][name="serum-' + destination + '"]').forEach(option => {
        option.addEventListener('click', (event) => {

            const productId = event.target.getAttribute('data-product-id');
            const sellingPlan = event.target.getAttribute('data-selling-plan');
            const optionId = event.target.value;

            updateFormValues(productId, sellingPlan, optionId, '.buy-form-' + destination);
            updateButtonsHref(optionId, '.buy-button-' + destination);
        });
    });
}

function updateButtonsHref(id, classname) {
    document.querySelectorAll(classname).forEach(button => {
            const href = new URL(button.href);

            updateItemObject(id);
            
            href.searchParams.set('id', id);
            button.href = href.toString();
    });
}

function updateFormValues(productId, sellingPlan, optionId, classname) {
    const form = document.querySelector(classname);
    if (form) {
        form.setAttribute('data-form-id', productId);

        const sellingPlanInput = form.querySelector('input[name="selling_plan"]');
        if (sellingPlanInput) {
            sellingPlanInput.value = sellingPlan;
        }

        const productIdInput = form.querySelector('input[name="id"]');
        if (productIdInput) {
            productIdInput.value = optionId;
        }
    }           
}

function formSubmit(classname)
{
    document.querySelector('.' + classname + ' button[type="submit"]').click();
}