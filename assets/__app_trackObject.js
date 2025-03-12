var item = item || [];
var _learnq = _learnq || [];

var updateItemObject = function(product_variant_id)
{
    let variants_to_handles = [];

    //kits from https://www.qureskincare.com/pages/micro-infusion-refill

        variants_to_handles[43821031031023] = 'micro-infusion-3-month-refill-3x-b-g-serum-3x-e-g-f-serum';
        variants_to_handles[43821069435119] = 'micro-infusion-3-month-refill-6x-rejuvenating-serum';
        variants_to_handles[43821035290863] = 'micro-infusion-3-month-refill-6x-hydra-soothing-serum';


    //products from https://www.qureskincare.com/pages/microinfusion
    
        //Rejuvenating + Hydra-Soothing
        variants_to_handles[43216489513199] = 'micro-infusion-1-month-bundle-1x-b-g-serum-1x-e-g-f-serum';   //1 month
        variants_to_handles[43216449208559] = 'micro-infusion-2-month-bundle-2x-b-g-serum-2x-e-g-f-serum';   //2 months
        variants_to_handles[43216377217263] = 'micro-infusion-3-month-bundle-3x-b-g-serum-3x-e-g-f-serum';   //3 months

        //Rejuvenating
        variants_to_handles[43216457203951] = 'micro-infusion-1-month-bundle-2x-e-g-f-serum';           //1 month
        variants_to_handles[43216398450927] = 'micro-infusion-2-month-bundle-4x-e-g-f-serum';           //2 months
        variants_to_handles[43216299819247] = 'micro-infusion-3-month-bundle';                          //3 months

        //Hydra-Soothing
        variants_to_handles[43216483942639] = 'micro-infusion-1-month-bundle-2x-beta-glucan-serum';   //1 month
        variants_to_handles[43216434069743] = 'micro-infusion-2-month-bundle-4x-beta-glucan-serum';   //2 months
        variants_to_handles[43216359555311] = 'micro-infusion-3-month-bundle-6x-beta-glucan-serum';   //3 months
        

    //products from  https://www.qureskincare.com/pages/micro-infusion-special-offer

        //Rejuvenating + Hydra-Soothing
        variants_to_handles[43216489513199] = 'micro-infusion-1-month-bundle-1x-b-g-serum-1x-e-g-f-serum';   //1 month
        variants_to_handles[45889978302703] = 'micro-infusion-2-month-bundle-rejuvenating-hydra-soothing-lp';   //2 months
        variants_to_handles[45889975353583] = 'micro-infusion-3-month-bundle-hydra-soothing-rejuvenating-lp';   //3 months

        //Rejuvenating
        variants_to_handles[43216457203951] = 'micro-infusion-1-month-bundle-2x-e-g-f-serum';   //1 month
        variants_to_handles[45889990754543] = 'micro-infusion-2-month-bundle-rejuvenating-lp';   //2 months
        variants_to_handles[45889972437231] = 'micro-infusion-3-month-bundle-rejuvenating-lp';   //3 months

        //Hydra-Soothing
        variants_to_handles[43216483942639] = 'micro-infusion-1-month-bundle-2x-beta-glucan-serum';   //1 month
        variants_to_handles[45889987641583] = 'micro-infusion-2-month-bundle-hydra-soothing-lp';   //2 months
        variants_to_handles[45889963065583] = 'micro-infusion-3-month-bundle-hydra-soothing-lp';   //3 months   


    if(variants_to_handles[product_variant_id])
    {
        window.event_product_handle = variants_to_handles[product_variant_id];
    }
}

var setEventProductHandler = function(product_handle)
{
    window.event_product_handle = product_handle;
}

var fetchProductData = function(product_handle)
{
    if(product_handle)
    {
        return new Promise((resolve, reject) => {
            let baseUrl = '/products/' + product_handle + '.js';
    
            fetch(baseUrl, {
                method: 'GET',
                cache: 'default'
            })
            .then(response => response.json())
            .then(data => {
                window.item = {
                    Name: data.title,
                    ProductID: data.id,
                    Categories: data.tags,
                    ImageURL: data.featured_image,
                    URL: window.location.origin + data.url,
                    Brand: data.vendor,
                    Price: data.price,
                    CompareAtPrice: data.price
                }
                resolve();
            })
            .catch(error => {
                console.log('Error fetching the content:', error);
                reject(error);
            });
        });
    }
}