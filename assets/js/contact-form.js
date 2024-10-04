jQuery(document).ready(function () {
    jQuery('#submit').on('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        if (jQuery('#captcha_val').val() != jQuery('#captcha_text').val()) {
            $('#captcha_text').parent('div').append('<span class="error">Captcha does not match</span>');
        } else {
            jQuery("#contactpage").validate({
                submitHandler: function (form) {
                    submitSignupFormNow(form);
                },
                rules: {
                    fname: {
                        required: true
                    },
                    phone: {
                        required: true,
                        number: true
                    },
                    email: {
                        required: true,
                        email: true
                    }
                },
                errorElement: "span",
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent());
                }
            });
        }
    });

    function submitSignupFormNow(form) {
        var formData = jQuery(form).serialize();

        jQuery.ajax({
            url: 'contact-form.php', // Ensure this is the correct URL
            type: 'POST',
            data: formData,
            success: function (response) {
                var result = jQuery.parseJSON(response);
                if (result.status === "Success") {
                    showSuccessMessage();
                } else {
                    showErrorMessage();
                }
            },
            error: function () {
                showErrorMessage();
            }
        });
    }

    function showSuccessMessage() {
        // Hide the form
        $('#contactpage').hide();
        // Display success message
        $('#form-message').html('<h2>Thank you! We will contact you soon.</h2>').css('color', 'green').show();
    }

    function showErrorMessage() {
        // Clear the form fields
        $('#contactpage')[0].reset();
        // Display error message
        $('#form-message').text('Form submission failed. Please try again.').css('color', 'red').show();
    }
});