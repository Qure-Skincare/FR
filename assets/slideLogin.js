//  $(document).ready(function () {
//         function switchForm(formType) {
//             // Hide all forms and headings
//             var forms = document.querySelectorAll('.slideAccountForm');
//             var headings = document.querySelectorAll('[form-type]');
//             for (var i = 0; i < forms.length; i++) {
//                 forms[i].classList.add('hidden');
//                 headings[i].classList.add('hidden');
//             }

//             // Show the selected form and heading
//             var selectedForm = document.querySelector('.slideAccountForm[form-type="' + formType + '"]');
//             var selectedHeading = document.querySelector('[form-type="' + formType + '"]');
//             selectedForm.classList.remove('hidden');
//             selectedHeading.classList.remove('hidden');

//             // Toggle visibility of switch_form_btn
//             var switchBtns = document.querySelectorAll('.switch_form_btn');
//             for (var i = 0; i < switchBtns.length; i++) {
//                 if (switchBtns[i].getAttribute('form-type') === formType) {
//                     switchBtns[i].classList.add('hidden');
//                 } else {
//                     switchBtns[i].classList.remove('hidden');
//                 }
//             }
//         }
//         // Initially show the "form_create"
//         switchForm('form_create');
//     })

function switchForm(formType) {
    // Hide all forms and headings
    var forms = document.querySelectorAll('.slideAccountForm');
    var headings = document.querySelectorAll('[form-type]');
    for (var i = 0; i < forms.length; i++) {
        forms[i].classList.add('hidden');
        headings[i].classList.add('hidden');
    }

    // Show the selected form and heading
    var selectedForm = document.querySelector('.slideAccountForm[form-type="' + formType + '"]');
    var selectedHeading = document.querySelector('[form-type="' + formType + '"]');
    selectedForm.classList.remove('hidden');
    selectedHeading.classList.remove('hidden');

    // Toggle visibility of switch_form_btn
    var switchBtns = document.querySelectorAll('.switch_form_btn');
    for (var i = 0; i < switchBtns.length; i++) {
        if (switchBtns[i].getAttribute('form-type') === formType) {
            switchBtns[i].classList.add('hidden');
        } else {
            switchBtns[i].classList.remove('hidden');
        }
    }
}
// Initially show the "form_create"
switchForm('form_create');