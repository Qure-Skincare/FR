document.addEventListener('DOMContentLoaded', function() {
        const decreaseButton = document.querySelector('.bundle_quantity a:first-child');
        const increaseButton = document.querySelector('.bundle_quantity a:last-child');
        const quantityElement = document.querySelector('.bundle_quantity p');
        const addToCartLinks = document.querySelectorAll('.buy_btn');

        decreaseButton.addEventListener('click', function(e) {
                e.preventDefault();
                let quantity = parseInt(quantityElement.innerText);
                if (quantity > 1) {
                        quantityElement.innerText = quantity - 1;
                        updateCartLinksQuantity(quantity - 1);
                }
        });

        increaseButton.addEventListener('click', function(e) {
                e.preventDefault();
                let quantity = parseInt(quantityElement.innerText);
                quantityElement.innerText = quantity + 1;
                updateCartLinksQuantity(quantity + 1);
        });

        document.querySelectorAll('.gift_variant').forEach(button => {
            button.addEventListener('click', function() {
                var variantId = this.getAttribute('data-variant-id');

                updateCartLinksId(variantId);
            });
        });

        function updateCartLinksId(id) {
                addToCartLinks.forEach(link => {
                        link.href = link.href.replace(/id=\d+/, 'id=' + id);
                });
        }

        function updateCartLinksQuantity(quantity) {
                addToCartLinks.forEach(link => {
                        link.href = link.href.replace(/quantity=\d+/, 'quantity=' + quantity);
                });
        }
});