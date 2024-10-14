jQuery(document).ready(function () {
    jQuery('#submit').on('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Reset previous errors
        $('#nameError').text('');
        $('#emailError').text('');
        $('#messageError').text('');

        let isValid = true;

        // Get form values
        const name = $('#fname').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#comment').val();

        // Validate required fields
        if (name === '') {
            $('#nameError').text('Name is required');
            isValid = false;
        }

        if (email === '') {
            $('#emailError').text('Email is required');
            isValid = false;
        }

        if (message === '') {
            $('#messageError').text('Message is required');
            isValid = false;
        }

        // Send form data to Web3Forms if valid
        if (isValid) {
            const formData = new FormData();
            formData.append('access_key', '8a00277a-d5f2-4f73-b618-e385955af564'); // Replace with your actual access key
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('message', message);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showSuccessMessage();
                } else {
                    showErrorMessage();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage();
            });
        }
    });

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