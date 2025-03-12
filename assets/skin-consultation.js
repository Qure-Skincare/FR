$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        // Check if any field in the current fieldset is empty
        if (!validateFields(current_fs)) {
            return;
        }

        // Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        // Show the next fieldset
        next_fs.show();

        // Hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // For making fieldset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    $(".previous").click(function () {
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        // Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        // Show the previous fieldset
        previous_fs.show();

        // Hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // For making fieldset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%");
    }

    function validateFields(current_fs) {
        // Check if any input field in the current fieldset is empty
        var isEmpty = false;
        current_fs.find('input').each(function () {
            if ($(this).val() === '') {
                isEmpty = true;
                return false; // exit the loop if any field is empty
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields before proceeding.');
            return false;
        }

        return true;
    }

    $(".submit").click(function () {
        return false;
    });
});
