
$(document).ready(function () {
    const tqForms = document.querySelectorAll('.tq_form');
    tqForms.forEach(form => {
        form.addEventListener('click', () => {
            tqForms.forEach(form => {
                form.classList.remove('active');
            });
            form.classList.add('active');
        });
    });
})
$('.thumbs img').click(function () {
    $('.largeImage').attr('src', $(this).attr('src').replace('thumb', 'large'));
    $(this).addClass('current').siblings().removeClass('current');
});